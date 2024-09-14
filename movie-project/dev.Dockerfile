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

CMD ["npm", "run", "dev"]
