FROM node:22-alpine as base
LABEL group=movie-image

WORKDIR /app
COPY package*.json ./
RUN npm ci

# COPY FILE
COPY . .

# SETUP ENV
ARG KEY_CRYPTO
ENV KEY_CRYPTO=${KEY_CRYPTO}

ARG PORT=5050
ENV PORT=${PORT}

RUN npm run build

EXPOSE 5050

CMD ["npm", "run", "start"]
