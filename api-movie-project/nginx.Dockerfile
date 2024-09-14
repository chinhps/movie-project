FROM nginx:stable-alpine3.20-perl

COPY ./nginx /etc/nginx/conf.d/
COPY ./public /var/www

WORKDIR /var/www
