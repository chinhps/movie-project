FROM node:22-alpine as base

FROM base as builder
WORKDIR /app

# SETUP ENV
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}

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

RUN npm run build

FROM base AS runner
WORKDIR /app

# CREATE NEW USER
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs . .

CMD ["npm", "start"]
