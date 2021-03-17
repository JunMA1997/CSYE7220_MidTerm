variable "access_key" {
    default = "AKIA6QQQ6KYRU2ELPI5W"
    description = "aws_IAM_ROLE_access_key"
}
variable "secret_key" {
    default = "oLcQteB3Tauw3HyV/OIRyNmA1grNPJk/va8rc20L"
    description = "aws_IAM_ROLE_secret_key"
}
variable "EC2_key_name" {
    default = "csye7220"
    description = "key name of the EC2"
}
variable "aws_region" {
    default = "us-west-2"
}
variable "availability_zone"{
    default = "us-west-2a"
}
variable "AMI_ID"{
    default = "ami-0ca5c3bd5a268e7db"
}
variable "mongoip"{
    default = "mongodb+srv://CSYE7220_MIDTERM:CSYE7220_MIDTERM@cluster0.lxsro.mongodb.net/Uber?retryWrites=true&w=majority"
}

variable "private_key_location"{
    default = "D:/7220/CSYE7220/Key/csye7220_oregon.pem"
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
