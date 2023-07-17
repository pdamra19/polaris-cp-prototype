provider "aws" {
  region = "us-east-1"
}
provider "random" {
  version = "~> 3.5"
}

resource "aws_ecs_cluster" "polaris_cluster" {
  name = "polaris-cluster"
}

resource "aws_ecs_task_definition" "polaris_task" {
  family                = "polaris-task"
  network_mode          = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = "256"
  memory = "512"

  container_definitions = <<DEFINITION
  [
    {
      "name": "polaris-cp-api",
      "image": "image_uri",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 4000,
          "hostPort": 4000
        }
      ]
    }
  ]
  DEFINITION
}

resource "aws_ecs_service" "polaris_service" {
  name            = "polaris-service"
  cluster         = aws_ecs_cluster.polaris_cluster.id
  task_definition = aws_ecs_task_definition.polaris_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = ["subnet-abcde012", "subnet-bcde012a"]
    security_groups = [aws_security_group.sg.id]
    assign_public_ip = true
  }
}

resource "aws_db_instance" "polaris_db" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13"
  instance_class       = "db.t2.micro"
  name                 = "polaris-cp-pg"
  username             = "polarisuser"
  password             = random_password.password.result
  parameter_group_name = "default.postgres13"
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name = "polaris_db_credentials"
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id     = aws_secretsmanager_secret.db_credentials.id
  secret_string = <<EOF
{
  "username": "polarisuser",
  "password": "${random_password.password.result}",
  "hostname": "${aws_db_instance.polaris_db.endpoint}"
}
EOF
}

resource "aws_api_gateway_rest_api" "polaris_api" {
  name        = "polaris-api"
  description = "API Gateway for Polaris Node.js application"
}

resource "aws_api_gateway_resource" "polaris_resource" {
  rest_api_id = aws_api_gateway_rest_api.polaris_api.id
  parent_id   = aws_api_gateway_rest_api.polaris_api.root_resource_id
  path_part   = "path_part"
}

resource "aws_api_gateway_method" "polaris_method" {
  rest_api_id   = aws_api_gateway_rest_api.polaris_api.id
  resource_id   = aws_api_gateway_resource.polaris_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "polaris_integration" {
  rest_api_id = aws_api_gateway_rest_api.polaris_api.id
  resource_id = aws_api_gateway_resource.polaris_resource.id
  http_method = aws_api_gateway_method.polaris_method.http_method

  type = "HTTP_PROXY"
  uri = "http://${aws_ecs_service.polaris_service.name}.${aws_ecs_cluster.polaris_cluster.name}"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public.id
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
}

resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}
