variable "app_id" {
  type = string
  description = "UUID for this deployed application"
}
variable "app_config" {
  type = map(map(object({
    ami            = string
    component_id   = string
    instance_type  = string
  })))
  description = "Map of application products to be deployed"
}
