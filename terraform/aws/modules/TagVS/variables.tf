variable "component_id" {
  type = string
  description = "ID for the application component"
}

variable "instance_type" {
  type = string
  description = "EC2 instance type to use"
}

variable "ami" {
  type = string
  description = "AMI ID for the ec2 instance"
}

variable "app_id" {
  type = string
  description = "The UUID of the deployed application"
}

variable "component_name" {
  type = string
  description = "User-readable name of the component"
}