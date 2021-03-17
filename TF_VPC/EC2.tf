
resource "aws_eip" "eip_server" {
    # instance = aws_instance.server.id
    vpc=true
}
# data "template_file" "user_data" {
#     template = file("user_data.sh")
# }
resource "aws_instance" "server" {
    ami = var.AMI_ID
    instance_type = "t2.micro" 
    key_name = var.EC2_key_name 
    # security_groups = [ aws_security_group.huskey.name ]
    network_interface {
        network_interface_id = aws_network_interface.networkinterface.id
        device_index = 0
    }
    user_data = "#!/bin/bash\nsudo apt-get update\ncurl -sL https://deb.nodesource.com/setup_10.x | sudo bash\nsudo apt-get install nodejs git nginx python3-pip gunicorn -y\nexport mongoip=\"${var.mongoip}\"\ncd /home/ubuntu\ngit clone https://github.com/JunMA1997/CSYE7220_MidTerm.git\nsudo echo \"export var pythonip=\\\"${aws_eip.eip_server.public_dns}\\\"\">config.js\nsudo rm ./CSYE7220_MidTerm/client/src/config.js\nsudo mv ./config.js ./CSYE7220_MidTerm/client/src\ncd /home/ubuntu/CSYE7220_MidTerm/client\nnpm install\nnpm run build\nsudo rm /var/www/html -r\nsudo mv ./build /var/www/html\ncd /home/ubuntu/CSYE7220_MidTerm/server\nsudo pip3 install -r requirements.txt\ngunicorn --bind 0.0.0.0:5000 main:app -D"

}
resource "aws_eip_association" "eip_assoc" {
    instance_id   = aws_instance.server.id
    allocation_id = aws_eip.eip_server.id
}
output "user_data" {
    value = aws_instance.server.user_data
}