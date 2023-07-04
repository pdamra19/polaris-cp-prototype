variable "app_id" {
  type = string
  description = "The UUID of the deployed application"
}

variable "component_config" {
  type = map(object({
    ami            = string
    component_id = string
    component_name = string
    instance_type  = string
  }))
  description = "Map of components to be deployed from this module"
}
