resource "aws_instance" "web" {
  ami           = var.component_config.ami
  instance_type = var.component_config.instance_type

  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    ApplicationId = var.component_config.app_id
    ApplicationName = "Polaris CP"
    ComponentId = var.component_config.component_id
    Description = "EC2 Instance to run ${var.component_config.component_name}"
    Name = var.component_config.component_name
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y apache2
              sed -i -e 's/80/8080/' /etc/apache2/ports.conf
              echo "Hello from ${var.component_config.component_name}: ${var.component_config.component_id} in App: ${var.app_id}" > /var/www/html/index.html
              systemctl restart apache2
              EOF
}

resource "aws_security_group" "web_sg" {
  name = "${lower(var.component_config.component_name)}-${var.component_config.component_id}-sg"
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  // required for `apt-get update` and `apt-get install apache2`
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    ApplicationId = var.app_id
    ApplicationName = "Polaris CP"
    ComponentId = var.component_config.component_id
    Description = "EC2 Instance Security Group"
    Name = var.component_config.component_name
  }
}

output "instance_dns" {
  description = "The Public DNS for ${var.component_config.component_name} - ${var.component_config.component_id}"
  value ="${aws_instance.web.public_dns}:8080"
}