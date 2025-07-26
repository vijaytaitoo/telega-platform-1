# Backend build (NestJS)
FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm -r run build

# Runtime image
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=build /app .

ENV NODE_ENV=production

CMD ["pnpm", "-r", "run", "start"]