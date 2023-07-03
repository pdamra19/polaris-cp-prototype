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
  }
  
  required_version = ">= 1.1.0"
}

provider "aws" {
  region = "us-east-1"
}

locals {
  extended_app_config = {for k, v in var.app_config : k => merge(v, {component_name = k})}
}

module "components" {
  for_each = local.extended_app_config

  source = "./modules/${each.key}"
  component_config = each.value
  app_id = var.app_id
}

resource "aws_secretsmanager_secret" "instance_dns" {
  name = "/polaris/instance-dns/${var.app_id}"
  recovery_window_in_days = 0

  tags = {
    ApplicationId = var.app_id
    ApplicationName = "Polaris CP"
    Description = "Instance Public DNS"
    Name = "Polaris CP DNS"
  }
}

resource "aws_secretsmanager_secret_version" "dns_values" {
  secret_id = aws_secretsmanager_secret.instance_dns.id
  secret_string = jsonencode({ for name, mod in module.components : name => mod.instance_dns })
}

output "instance_dns" {
  description = "The Public DNS for each component"
  value = {
    for name, mod in module.components: name => mod.instance_dns
  }
}