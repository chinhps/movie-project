Project movie

Docker Backend:
Linux
MySQL
PHP 8
Nginx

Docker Frontend
Nodejs v22.0


docker-compose -f docker-compose.dev.yml up --build

docker-compose --env-file .env.docker -f docker-compose.prod.yml up --build