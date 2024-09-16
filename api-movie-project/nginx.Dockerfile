FROM nginx:stable-alpine3.20-perl

COPY ./nginx/conf.d /etc/nginx/conf.d
COPY ./public /var/www

RUN chown -R nginx:nginx /var/www

WORKDIR /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]