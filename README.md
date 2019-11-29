# Distributed systems third midterm #

sudo docker build -t flask_img .
sudo docker run -v -d -p 5050:5050 --name flask_app flask_img
sudo docker ps -a
sudo docker rm flask_app
sudo docker rmi flask_img 
