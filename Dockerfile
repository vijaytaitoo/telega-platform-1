# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем файлы package.json и pnpm-lock.yaml
COPY package*.json pnpm-*.yaml ./
COPY backend/libs/*/package*.json ./backend/libs/
COPY backend/services/*/package*.json ./backend/services/
COPY backend/gateway/package*.json ./backend/gateway/
COPY frontend/*/package*.json ./frontend/
COPY shared/*/package*.json ./shared/

# Устанавливаем зависимости
RUN pnpm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN pnpm run build

# Этап продакшена
FROM node:20-alpine AS production

WORKDIR /app

# Копируем собранные файлы и зависимости
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Запускаем приложение
CMD ["pnpm", "run", "start:prod"]