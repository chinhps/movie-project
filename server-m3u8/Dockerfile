FROM php:8.1.29-fpm-alpine

RUN apk update && apk add --no-cache \
    libpng-dev \
    oniguruma-dev \
    zip \
    unzip \
    curl \
    libzip-dev

RUN docker-php-ext-install mbstring exif pcntl bcmath gd zip

WORKDIR /var/www

COPY . .

RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]