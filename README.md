# Distributed systems third midterm #

sudo docker build -t flask_img .
sudo docker run -v -d -p 5050:5050 --name flask_app flask_img
sudo docker ps -a
sudo docker kill flask_app
sudo docker rm flask_app
sudo docker rmi flask_img

sudo docker compose-up -d
sudo docker exec -ti vue_app hostname -i


https://mherman.org/blog/dockerizing-a-vue-app/
