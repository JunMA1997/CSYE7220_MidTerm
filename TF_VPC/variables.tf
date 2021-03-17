variable "access_key" {
    description = "aws_IAM_ROLE_access_key"
}
variable "secret_key" {    
    description = "aws_IAM_ROLE_secret_key"
}
variable "EC2_key_name" {
    description = "key name of the EC2"
}
variable "aws_region" {
}
variable "availability_zone"{
}
variable "AMI_ID"{
}
variable "mongoip"{
}
variable "private_key_location"{
}

variable "cidr_block" {
    default = "172.31.0.0/16"
}
variable "cidr_block_pubsubnet" {
    default = "172.31.1.0/24"
}
variable "cidr_block_prisubnet" {
    default = "172.31.2.0/24"
}
variable "dcidr_block" {
  default = "0.0.0.0/0"
}
