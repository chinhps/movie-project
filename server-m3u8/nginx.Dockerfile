FROM nginx:stable-alpine3.20-perl

COPY ./nginx /etc/nginx
COPY ./uploads /var/www/uploads
COPY ./uploads-images /var/www/uploads-images

# COPY ./upload-file.php /var/www
# COPY ./upload-image.php /var/www
COPY ./index.php /var/www

RUN chown -R nginx:nginx /var/www

WORKDIR /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]