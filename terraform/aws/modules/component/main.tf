resource "aws_instance" "web" {
  ami           = var.component_config.ami
  instance_type = var.component_config.instance_type

  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    ApplicationId = var.app_id
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
  description = "The Public DNS Address"
  value ="${aws_instance.web.public_dns}:8080"
}

# // TODO add NDI bridge infrastructure
# // Includes NDI credentials with script in userdata
# License server includes discovery server -> Needs to point to an existing NDI bridge (foundation) -> obtain bridge public IP

# Separate modules for each product, pass in the bridge IP addy
# Product modules in separate repos, can be versioned/deployed separately -> allow customer specific module per product
# Use separate branches for differing configurations *per product*

# // Grab IP from output and pass into later scripts - Multiple stage with dependency -> Need to dynamically build the userdata script
# Passing output from one module to dependent modules - May need to copy script file with dynamic info