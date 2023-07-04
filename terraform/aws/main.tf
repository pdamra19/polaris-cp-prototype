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
  component_config = {for k, v in var.app_config : k => { for key, val in var.app_config[k] : key => merge(val, {component_name = key}) } }
}

module "Chyron" {
  source = "./modules/Chyron"
  count = contains(keys(var.app_config), "Chyron") ? 1 : 0

  component_config = local.component_config["Chyron"]
  app_id = var.app_id
}

module "TagVS" {
  source = "./modules/TagVS"
  count = contains(keys(var.app_config), "TagVS") ? 1 : 0

  component_config = local.component_config["TagVS"]
  app_id = var.app_id
}

module "Telos" {
  source = "./modules/Telos"
  count = contains(keys(var.app_config), "Telos") ? 1 : 0

  component_config = local.component_config["Telos"]
  app_id = var.app_id
}

module "Vectar" {
  source = "./modules/Vectar"
  count = contains(keys(var.app_config), "Vectar") ? 1 : 0

  component_config = local.component_config["Vectar"]
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
  secret_string = jsonencode({ 
    Chyron: module.Chyron.instance_dns,
    TagVS: module.TagVS.instance_dns,
    Telos: module.Telos.instance_dns,
    Vectar: module.instance_dns
  })
}

output "instance_dns" {
  description = "The Public DNS for each component"
  value = {
    Chyron: module.Chyron.instance_dns,
    TagVS: module.TagVS.instance_dns,
    Telos: module.Telos.instance_dns,
    Vectar: module.instance_dns
  }
}