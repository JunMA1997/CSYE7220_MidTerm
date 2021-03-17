resource "aws_vpc" "vpc" {
    cidr_block = var.cidr_block
    enable_dns_hostnames = true
    enable_dns_support = true
    enable_classiclink_dns_support = true
    assign_generated_ipv6_cidr_block = false
    tags = {
        Name = "csye7220-vpc"
    }
}
resource "aws_security_group" "huskey" {
    name = "huskey"
    vpc_id = aws_vpc.vpc.id 
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
resource "aws_subnet" "pub_sub" {
    cidr_block = var.cidr_block_pubsubnet
    vpc_id = aws_vpc.vpc.id
    availability_zone = var.availability_zone
    tags = {
        Name = "public subnet"
    }
}
resource "aws_subnet" "pri_sub" {
    cidr_block = var.cidr_block_prisubnet
    vpc_id = aws_vpc.vpc.id
    availability_zone = var.availability_zone
    tags = {
        Name = "private subnet"
    }
}
resource "aws_internet_gateway" "ig" {
    vpc_id = aws_vpc.vpc.id
    tags={
        Name = "CSYE-7220-IG"
    }
}
resource "aws_route_table" "routetable" {
    vpc_id = aws_vpc.vpc.id
    route{
        cidr_block = var.dcidr_block
        gateway_id = aws_internet_gateway.ig.id
    }
}
resource "aws_route" "route" {
    route_table_id = aws_route_table.routetable.id
    gateway_id = aws_internet_gateway.ig.id
    destination_cidr_block = var.dcidr_block
}
resource "aws_route_table_association" "pub_sub_ass" {
    subnet_id = aws_subnet.pub_sub.id
    route_table_id = aws_route_table.routetable.id
}
resource "aws_network_interface" "networkinterface" {
    depends_on = [
        aws_security_group.huskey
    ]
    subnet_id = aws_subnet.pub_sub.id
    security_groups = [ aws_security_group.huskey.id ]
    # associate_public_ip_address=true
}