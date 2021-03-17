resource "aws_instance" "midterm-instance" { 
    ami = "${data.aws_ami.ubuntu.id}" 
    instance_type = "t2.micro"
    key_name = "terraform_midsem_key"
    security_groups = ["${aws_security_group.huskey.name}"]
tags= {
Name = "midTerm-instance"
} 
}

resource "aws_key_pair" "terraform_midsem_key" { 
    key_name = "terraform_midsem_key"
//public_key = "ssh-rsa bla-bla-bla you@your-machine" 
 public_key = "${file("terraform_ec2_key.pub")}"
}


resource "aws_security_group" "huskey" {
name = "huskey"
description = "Web Security Group"
ingress {
from_port = 22
to_port = 22
protocol = "tcp"
cidr_blocks = ["0.0.0.0/0"]
}
ingress {
from_port = 5000
to_port = 5000
protocol = "tcp"
cidr_blocks = ["0.0.0.0/0"]
}
ingress {
from_port = 3000
to_port = 3000
protocol = "tcp"
cidr_blocks = ["0.0.0.0/0"]
}
ingress {
from_port = 80
to_port = 80
protocol = "tcp"
cidr_blocks = ["0.0.0.0/0"]
}
egress {
from_port = 0
to_port = 0
protocol = "-1"
cidr_blocks = ["0.0.0.0/0"]
}
}