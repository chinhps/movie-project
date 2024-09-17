FROM node:22-alpine as base

FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# COPY FILE
COPY public ./public
COPY src ./src
COPY tsconfig.json .
COPY next.config.mjs .
#
COPY tailwind.config.ts .
COPY postcss.config.js .

# # SETUP ENV
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}

ARG API_BACKEND_CONTAINER
ENV API_BACKEND_CONTAINER=${API_BACKEND_CONTAINER}

ARG NEXT_PUBLIC_API_BACKEND
ENV NEXT_PUBLIC_API_BACKEND=${NEXT_PUBLIC_API_BACKEND}

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# BUILD && RUN
EXPOSE 3000
CMD ["entrypoint.sh"]