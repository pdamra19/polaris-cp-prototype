#!/bin/bash

application_id=$1
aws_account_id=$(aws sts get-caller-identity --query Account --output text)
aws_region='us-east-1'

bucket_name="polaris-${application_id}-${aws_account_id}-tf-s3"
table_name="polaris-${application_id}-${aws_account_id}-tf-ddb"

# Check if bucket exists
bucket_exists=$(aws s3api head-bucket --bucket $bucket_name 2>&1 || true)

if [ -z "$bucket_exists" ]; then
  echo "Bucket $bucket_name already exists"
else
  echo "Bucket $bucket_name does not exist, creating..."
  aws s3api create-bucket \
    --bucket $bucket_name \
    --region $aws_region \
    --create-bucket-configuration LocationConstraint=$aws_region
fi

# Check if DynamoDB table exists
table_exists=$(aws dynamodb describe-table --table-name $table_name --region $aws_region 2>&1 || true)

if [[ $table_exists != *"ResourceNotFoundException"* ]]; then
  echo "DynamoDB Table $table_name already exists"
else
  echo "DynamoDB Table $table_name does not exist, creating..."
  aws dynamodb create-table \
    --table-name $table_name \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --region $aws_region
fi

echo "::set-output name=bucket_name::$bucket_name"
echo "::set-output name=table_name::$table_name"