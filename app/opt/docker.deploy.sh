#!/bin/bash

docker pull christianfei/pomodoro:latest
docker pull christianfei/pomodoro-api:latest

docker rm -f $(docker ps -a | grep 'pomodoro-api\s*$' | awk '{print $1}')
docker rm -f $(docker ps -a | grep 'pomodoro-api-1\s*$' | awk '{print $1}')
docker rm -f $(docker ps -a | grep 'pomodoro-api-2\s*$' | awk '{print $1}')
docker rm -f $(docker ps -a | grep 'pomodoro\s*$' | awk '{print $1}')

docker run --name pomodoro-api-sessions \
  --restart=always \
  -d \
  redis:latest \
  redis-server

docker run --name pomodoro-api-db \
  --restart=always \
  -d \
  -v /home/pigeon/apps/pomodoro-api/db:/data/db \
  dockerfile/mongodb

docker run --name pomodoro-api-1 \
  --restart=always \
  -d \
  -v /home/pigeon/apps/pomodoro-api/credentials:/app/credentials \
  --link pomodoro-api-sessions:pomodoro-api-sessions \
  --link pomodoro-api-db:pomodoro-api-db \
  christianfei/pomodoro-api

docker run --name pomodoro-api-2 \
  --restart=always \
  -d \
  -v /home/pigeon/apps/pomodoro-api/credentials:/app/credentials \
  --link pomodoro-api-sessions:pomodoro-api-sessions \
  --link pomodoro-api-db:pomodoro-api-db \
  christianfei/pomodoro-api

docker run --name pomodoro \
  --restart=always \
  -d \
  -p 80:80 \
  -p 443:443 \
  --link pomodoro-api-1:pomodoro-api-1 \
  --link pomodoro-api-2:pomodoro-api-2 \
  -v /home/pigeon/ssl/pomodoro.cc:/etc/nginx/ssl/pomodoro.cc \
  christianfei/pomodoro
