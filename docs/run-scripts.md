# 🚀 Команды запуска проекта Tele•Ga

## 📦 Установка зависимостей

```bash
# Установка всех зависимостей монорепы
pnpm install

# Очистка и переустановка (если проблемы)
pnpm run clean && pnpm install

# Обновление зависимостей
pnpm update

# Очистка кэша
pnpm store prune
```

## 🔧 Основные команды монорепы

```bash
# Запуск всех пакетов в режиме разработки
pnpm run dev

# Сборка всех пакетов
pnpm run build

# Линтинг всех пакетов
pnpm run lint

# Тестирование всех пакетов
pnpm run test

# Форматирование кода
pnpm run prettier

# Очистка мусора
pnpm run clean
```

## 🎯 Запуск отдельных компонентов

### Frontend приложения

```bash
# Tele•Ga Interface (Vite + React)
pnpm --filter telega-interface run dev
# Запускается на http://localhost:5173

# Tele•Ga Studio (Next.js)
pnpm --filter telega-studio run dev
# Запускается на http://localhost:3000

# Отдельный Frontend
cd frontend && pnpm run dev
# Запускается на http://localhost:5173
```

### Backend сервисы

```bash
# API Gateway (NestJS)
pnpm --filter @telega/gateway run start:dev
# Запускается на http://localhost:3030

# Auth Service
pnpm --filter @telega/auth-service run start:dev
# Запускается на http://localhost:3001

# Payment Service
pnpm --filter @telega/payment-service run start:dev
# Запускается на http://localhost:3002

# Telegram Service
pnpm --filter @telega/telegram-service run start:dev
# Запускается на http://localhost:3003
```

### Дополнительные сервисы

```bash
# Mass Mailer
pnpm --filter mass-mailer run dev
# Запускается на http://localhost:3004

# Status Bot
cd apps/bots/status-bot && pnpm run dev
# Запускается на http://localhost:3333
```

## 🐳 Docker команды

```bash
# Сборка всех образов
docker compose build

# Запуск в режиме разработки
docker compose up -d

# Запуск продакшена
docker compose -f docker-compose.prod.yml up -d

# Просмотр логов
docker compose logs -f

# Остановка всех сервисов
docker compose down
```

## 🔍 Отладка и мониторинг

```bash
# Проверка статуса процессов
ps aux | grep node

# Проверка занятых портов
lsof -i :3000
lsof -i :5173
lsof -i :3030

# Просмотр логов конкретного сервиса
docker compose logs gateway
docker compose logs studio
```

## 🧪 Тестирование API

```bash
# Тест промо API
curl -X POST http://localhost:3030/api/v1/promo \
  -H "Content-Type: application/json" \
  -d '{"code":"SUMMER25","discount":25,"type":"percentage","currency":"KGS"}'

# Тест аналитики
curl http://localhost:3030/api/v1/grok/analytics?storeId=test-store-id

# Тест статистики Telegram
curl http://localhost:3030/api/v1/tgstat/channel?channelId=test-channel-id
```

## 🔧 Утилиты

```bash
# Генерация .env файлов
node scripts/create-env-files.js

# Очистка кэша
pnpm store prune

# Обновление зависимостей
pnpm update

# Проверка устаревших пакетов
pnpm outdated
```

## 🚨 Решение проблем

### Проблемы с портами

```bash
# Убить процесс на порту
lsof -ti:3000 | xargs kill -9

# Изменить порт в .env
PORT=3001
```

### Проблемы с зависимостями

```bash
# Очистка node_modules
pnpm run clean:node_modules

# Переустановка зависимостей
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Проблемы с Docker

```bash
# Пересборка образов
docker compose build --no-cache

# Очистка Docker
docker system prune -a
```

### Проблемы с NestJS версиями

```bash
# Обновление NestJS до совместимых версий
pnpm add -w @nestjs/core@11.1.5 @nestjs/common@11.1.5 @nestjs/platform-express@11.1.5

# Обновление TypeORM
pnpm add @nestjs/typeorm@11.0.0 --filter @telega/gateway
pnpm add @nestjs/typeorm@11.0.0 --filter @telega/database

# Очистка и переустановка
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📋 Чеклист запуска

- [ ] Установлены все зависимости (`pnpm install`)
- [ ] Созданы .env файлы для всех сервисов
- [ ] Запущен Gateway (`pnpm --filter @telega/gateway run start:dev`)
- [ ] Запущен Interface (`pnpm --filter telega-interface run dev`)
- [ ] Запущен Studio (`pnpm --filter telega-studio run dev`)
- [ ] Проверены API endpoints
- [ ] Проверена работа Telegram ботов

## 🎯 Быстрый старт

```bash
# 1. Установка
pnpm install

# 2. Генерация .env файлов
node scripts/create-env-files.js

# 3. Запуск основных сервисов
pnpm run dev

# 4. Проверка
curl http://localhost:3030/api/v1/promo
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи: `docker compose logs`
2. Проверьте порты: `lsof -i -P | grep LISTEN`
3. Проверьте зависимости: `pnpm outdated`
4. Очистите кэш: `pnpm store prune`

## 🔧 Совместимые версии

### NestJS экосистема
- `@nestjs/core`: 11.1.5
- `@nestjs/common`: 11.1.5
- `@nestjs/platform-express`: 11.1.5
- `@nestjs/typeorm`: 11.0.0
- `@nestjs/swagger`: 7.4.2
- `@nestjs/config`: 3.3.0

### Frontend
- `react`: 18.x
- `vite`: 5.x
- `next`: 14.x

### Backend
- `typeorm`: 0.3.25
- `pg`: 8.11.3
- `telegraf`: 4.16.3 