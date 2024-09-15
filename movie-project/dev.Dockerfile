FROM node:22-alpine as base

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

# SETUP ENV
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}

ARG API_BACKEND_CONTAINER
ENV API_BACKEND_CONTAINER=${API_BACKEND_CONTAINER}

ARG NEXT_PUBLIC_API_BACKEND
ENV NEXT_PUBLIC_API_BACKEND=${NEXT_PUBLIC_API_BACKEND}

CMD ["npm", "run", "dev"]
