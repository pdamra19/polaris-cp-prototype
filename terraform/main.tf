terraform {
  backend "s3" {
    key            = "state"
    encrypt        = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.52.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
  
  required_version = ">= 1.1.0"
}

provider "aws" {
  region = "us-east-1"
}

variable "app_config" {
  type = map(object({
    component_id = string
    instance_type  = string
    ami            = string
  }))
  description = "Map of applications to be deployed"
}

variable "app_id" {
  type = string
  description = "ID for this deployed application"
}

resource "aws_instance" "web" {
  for_each = var.apps

  ami           = each.value.ami
  instance_type = each.value.instance_type

  tags = {
    Name = each.key
    ComponentId = each.value.component_id
    ApplicationId = var.app_id
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y apache2
              sed -i -e 's/80/8080/' /etc/apache2/ports.conf
              echo "Hello from ${each.value.component_id} in App ${var.app_id}" > /var/www/html/index.html
              systemctl restart apache2
              EOF
}

resource "random_pet" "sg" {}

resource "aws_security_group" "web-sg" {
  name = "${random_pet.sg.id}-sg"
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  // connectivity to ubuntu mirrors is required to run `apt-get update` and `apt-get install apache2`
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "web-address" {
  value = "${aws_instance.web.public_dns}:8080"
}