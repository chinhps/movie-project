#!/bin/sh

while ! nc -z nginx-movie-laravel-backend 80; do
    sleep 2
done

while ! nc -z nginx-media-server 80; do 
    sleep 2
done

npm run build

npm start