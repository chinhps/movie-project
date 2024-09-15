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
COPY .env.production .
# ARG AUTH_SECRET
# ENV AUTH_SECRET=${AUTH_SECRET}

# ARG API_BACKEND_CONTAINER
# ENV API_BACKEND_CONTAINER=${API_BACKEND_CONTAINER}

# ARG NEXT_PUBLIC_API_BACKEND
# ENV NEXT_PUBLIC_API_BACKEND=${NEXT_PUBLIC_API_BACKEND}

# RUN npm run build

# FROM base AS runner
# WORKDIR /app

# # CREATE NEW USER
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# COPY --from=builder --chown=nextjs:nodejs . .

# CMD ["npm", "start"]
