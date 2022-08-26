## Global configuration
variable "application_name" {
  default = "crypto-exchange"
}

variable "region" {
  default = "eu-central-1"
}

provider "aws" {
  region = var.region
  profile = "blueplayground"
}

module "terraform_state_backend" {
  source        = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=master"
  namespace     = "crypto-workshop"
  stage         = "global"
  name          = "terraform"
  attributes    = ["state"]
  tags = {
    Environment = "global"
  }
}


## Terraform outputs
output "s3_bucket_id" {
  value       = module.terraform_state_backend.s3_bucket_id
  description = "S3 bucket ID"
}

output "dynamodb_table_name" {
  value       = module.terraform_state_backend.dynamodb_table_name
  description = "DynamoDB table name"
}

output "dynamodb_table_id" {
  value       = module.terraform_state_backend.dynamodb_table_id
  description = "DynamoDB table ID"
}
