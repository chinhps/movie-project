# MOVIE PROJECT

### Technical Stack
- **Backend:** Laravel, Redis, Mysql, NestJS
- **Frontend:** Next.js (Typescript), Tanstack Query, ChakraUI
- **Server:** Nginx (API Gateway), Docker
- **CI/CD:** Github Actions
- **Crawl Data:** Python
***

**Live demo**: [Link](https://movie-demo.chinh.dev/)

## How to use
Create `.env.docker`
```bash
cp .env.docker.example .env.docker
```

Generate auth secrec(AUTH_SECRET)
```bash
openssl rand -base64 32
```

### In developer 🛠
```bash
docker-compose --env-file .env.docker -f docker-compose.dev.yml up --build
```

### In production 🚀
```bash
docker-compose --env-file .env.docker -f docker-compose.prod.yml up --build
```

***

### If you want to have data 🛢

Use `db:seed` to make example data
```bash
docker exec -it [container_id_laravel] /bin/sh

php artisan db:seed
```


Import your data
```bash
mysqldump -u [username] -p 
--no-create-info 
--order-by-primary 
--ignore-table=[table].migrations 
--ignore-table=[table].failed_jobs 
[table] > [sql-file].sql

docker cp [sql-file].sql [container_id]:/[sql-file].sql

docker exec -it [container_id_mysql] /bin/bash

mysql -u [username] -p [database_name] < /[sql-file].sql
```