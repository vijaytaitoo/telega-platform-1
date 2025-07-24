# Mass Mailer Backend

Массовые рассылки по Telegram для магазинов (NestJS, Prisma, BullMQ, Telegraf)

## Стек
- NestJS
- Prisma + PostgreSQL
- BullMQ + Redis
- Telegraf (Telegram Bot)
- Swagger (API docs)
- Next.js + Tailwind (frontend, не входит в этот репозиторий)

## Быстрый старт

1. Установите зависимости:
   ```bash
   pnpm install
   ```
2. Настройте .env (PostgreSQL, Redis, Telegram Bot Token)
3. Проведите миграцию Prisma:
   ```bash
   pnpm run prisma:migrate
   ```
4. Запустите backend:
   ```bash
   pnpm start:dev
   ```
5. Откройте Swagger-документацию на http://localhost:3000/api

---

## TODO
- [ ] API для создания рассылок
- [ ] Очередь и воркер для отправки сообщений
- [ ] Интеграция с Telegraf
- [ ] UI (отдельно) 