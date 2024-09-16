Project movie

Docker Backend:
Linux
MySQL
PHP 8
Nginx

Docker Frontend
Nodejs v22.0

CREATE .env.docker

Generate auth secret: openssl rand -base64 32

docker-compose --env-file .env.docker -f docker-compose.dev.yml up --build

docker-compose --env-file .env.docker -f docker-compose.prod.yml up --build


mysqldump -u [username] -p 
--no-create-info 
--order-by-primary 
--ignore-table=movie.migrations 
--ignore-table=movie.failed_jobs 
movie > databackup.sql

docker cp backup.sql [container_id]:/backup.sql
docker exec -it [container_id] /bin/bash
mysql -u [username] -p [database_name] < /backup.sql