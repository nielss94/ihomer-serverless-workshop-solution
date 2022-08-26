variable "subdomain" {
}
variable "parent_zone" {
}
variable "namespace" {
}

data "aws_route53_zone" "parent_zone" {
  name = "${var.parent_zone}."
  private_zone = false
}
provider "aws" {
  alias = "aws"
}

provider "aws" {
  alias = "aws-acm"
}

resource "aws_acm_certificate" "cert" {
  domain_name       = "${var.subdomain}.${var.parent_zone}"
  validation_method = "DNS"
  provider = aws.aws-acm
  tags = {
    Environment = terraform.workspace
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  provider = aws.aws-acm
  name = element(tolist(aws_acm_certificate.cert.domain_validation_options),0).resource_record_name
  records = [element(tolist(aws_acm_certificate.cert.domain_validation_options),0).resource_record_value]
  type = element(tolist(aws_acm_certificate.cert.domain_validation_options),0).resource_record_type
  ttl = 60
  zone_id = data.aws_route53_zone.parent_zone.zone_id
}

resource "aws_acm_certificate_validation" "cert" {
  provider = aws.aws-acm
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}

resource "aws_ssm_parameter" "api_domain_name" {
  name        = "/serverless/${var.namespace}/apiDomainName"
  description = "API domainname"
  type        = "SecureString"
  value       = "${var.subdomain}.${var.parent_zone}"
}
