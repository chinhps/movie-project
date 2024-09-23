FROM redis:7.4.0-alpine

# COPY redis.conf /usr/local/etc/redis/redis.conf

EXPOSE 6379

# , "/usr/local/etc/redis/redis.conf" 
CMD [ "redis-server"]
