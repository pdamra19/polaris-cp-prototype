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