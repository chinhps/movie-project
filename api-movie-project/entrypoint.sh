#!/bin/sh

while ! nc -z mysql-movie 3306; do
  sleep 2
done

php artisan key:generate

php php artisan migrate --force

php-fpm