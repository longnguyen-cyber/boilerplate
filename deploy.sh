#!/bin/bash

chmod +x start-containers.sh
./start-containers.sh
docker stop your_image
docker rm your_image
docker rmi your_image
docker build -t your_image:latest .
docker run -d --network=name-network --name your_image -p 5000:5000 your_image