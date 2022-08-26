variable "namespace" {
}

resource "aws_dynamodb_table" "coin_table" {
  billing_mode = "PAY_PER_REQUEST"
  name = "${var.namespace}_coin_table"
  hash_key = "id"
  range_key = "name"

  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "name"
    type = "S"
  }
}

resource "aws_ssm_parameter" "dynamodb_coin_table" {
  name = "/serverless/${var.namespace}/dynamodb-coin-table"
  description = "DynamoDB Coin Table"
  type = "SecureString"
  value = aws_dynamodb_table.coin_table.name
}

resource "aws_ssm_parameter" "dynamodb_coin_table_arn" {
  name = "/serverless/${var.namespace}/dynamodb-coin-table-arn"
  description = "DynamoDB Coin Table ARN"
  type = "SecureString"
  value = aws_dynamodb_table.coin_table.arn
}

resource "aws_dynamodb_table" "wallet_table" {
  billing_mode = "PAY_PER_REQUEST"
  name = "${var.namespace}_wallet_table"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_ssm_parameter" "dynamodb_wallet_table" {
  name = "/serverless/${var.namespace}/dynamodb-wallet-table"
  description = "DynamoDB Wallet Table"
  type = "SecureString"
  value = aws_dynamodb_table.wallet_table.name
}

resource "aws_ssm_parameter" "dynamodb_wallet_table_arn" {
  name = "/serverless/${var.namespace}/dynamodb-wallet-table-arn"
  description = "DynamoDB Wallet Table ARN"
  type = "SecureString"
  value = aws_dynamodb_table.wallet_table.arn
}
