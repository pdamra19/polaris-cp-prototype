#!/bin/bash

application_id=$1
aws_account_id=$(aws sts get-caller-identity --query Account --output text)
aws_region='us-east-1'

bucket_name="polaris-${application_id}-${aws_account_id}-tf-s3"
table_name="polaris-${application_id}-${aws_account_id}-tf-ddb"

# Empty the S3 bucket
aws s3 rm s3://$bucket_name --recursive

# Delete the S3 bucket
aws s3api delete-bucket --bucket $bucket_name --region $aws_region

# Delete the DynamoDB table
aws dynamodb delete-table --table-name $table_name --region $aws_region

echo "::set-output name=${bucket_name}::$bucket_name"