FROM php:8.1.29-fpm-alpine
LABEL group=movie-image

RUN apk update && apk add --no-cache \
    libpng-dev \
    oniguruma-dev \
    zip \
    unzip \
    curl \
    libzip-dev

RUN docker-php-ext-install mbstring exif pcntl bcmath gd zip

COPY ./nginx/conf.d /etc/nginx/conf.d

WORKDIR /var/www

COPY . .

RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]