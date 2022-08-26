
provider "aws" {
  region = var.region
  profile = "blueplayground"
}
provider "aws" {
  alias = "aws"
  region = var.region
  profile = "blueplayground"
}
provider "aws" {
  region = "us-east-1"
  alias = "aws-acm"
  profile = "blueplayground"
}
provider "aws" {
  region = "us-east-1"
  alias = "aws-ses"
  profile = "blueplayground"
}

terraform {
  backend "s3" {
    region = "eu-central-1"
    bucket = "crypto-workshop-global-terraform-state"
    key = "crypto-workshop.tfstate"
    dynamodb_table = "crypto-workshop-global-terraform-state-lock"
    encrypt = true
    profile = "blueplayground"
  }
}

locals {
  namespace = "${var.application_name}-${terraform.workspace}"
  parent_zone = "ihomer.nl"
}

module "datastore" {
  source = "../modules/dynamodb"
  namespace = local.namespace
}

//module "api-gateway-certificates" {
//  source = "../modules/api-gateway-certificates"
//  namespace = local.namespace
//  subdomain = "crypto-workshop${terraform.workspace == "prod" ? "" : format(".%s", terraform.workspace)}"
//  parent_zone = local.parent_zone
//
//  providers = {
//    aws.aws-acm = aws.aws-acm
//    aws.aws = aws.aws
//  }
//}
