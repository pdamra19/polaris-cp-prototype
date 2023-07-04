
# in reality we won't simply iterate over and create identical resources
module "components" {
  source = "../component"
  for_each = var.component_config

  component_config = each.value
  app_id = var.app_id
}

output "instance_dns" {
  description = "The public DNS for each component"
  value = {
    for name, mod in module.components: name => mod.instance_dns
  }
}
