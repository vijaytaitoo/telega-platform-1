# Tele•Ga Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/your-username/telega-platform-1/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/telega-platform-1/actions/workflows/ci.yml)
[![Telegram](https://img.shields.io/badge/Telegram-@TeleGaSupportBot-blue.svg)](https://t.me/TeleGaSupportBot)
[![Community](https://img.shields.io/badge/Community-@Tele_GaCommunity-green.svg)](https://t.me/Tele_GaCommunity)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/telega-platform-1)

🚀 Мощная Telegram e-commerce платформа с мультиботами, маркетплейсом и кастомным UI.

---

## 🔧 Стек технологий

- **Backend**: NestJS 11 (monorepo, microapps)
- **Telegram**: Telegraf.js + Webhook/LongPolling
- **ORM**: TypeORM 3 / PostgreSQL
- **Frontend**: Vite + React + TailwindCSS
- **DevOps**: Docker, PM2, nginx
- **Монета**: Teleton (внутренняя единица расчёта)
- **Хранилище**: MinIO (совместим с S3)

---

## 📁 Структура

```
/backend - NestJS монорепа (auth, bot, api, ai)
/frontend - UI магазина (React)
/docs - документация и диаграммы
/scripts - генераторы и вспомогательные скрипты
```

---

## 🚀 Быстрый старт

```bash
pnpm i
pnpm run apply
pnpm run dev
```

📄 Подробнее: `docs/run-scripts.md`

---

## 📦 Команды

| Команда | Назначение |
|---------|------------|
| `pnpm run dev` | Запуск всей платформы |
| `pnpm run build` | Сборка всех пакетов |
| `pnpm run lint` | Проверка кода |
| `pnpm run test` | Запуск тестов |
| `pnpm run apply` | Генерация .env файлов |
| `pnpm run db:mig` | Миграции TypeORM |

---

## 🔍 Анализ в Cursor

Открой любой файл → `Cmd+K` → Ask AI → Вставь из `docs/project-analysis-prompt.md`

---

## 📄 Документация

- 📘 **Архитектура**: `docs/architecture.md`
- 🧠 **AI-промпты**: `docs/project-analysis-prompt.md`
- 🚢 **Чеклист деплоя**: `docs/deployment-checklist.md`

---

## 📡 Каналы и боты

- 🇺🇿 **@Tele_ga_Uznews** — Новости
- 💬 **@Tele_GaCommunity** — Чат
- 📦 **@MarketbaseUZbot** — Маркетбейс
- 📚 **@TeleGaAcademy** — Академия
- 👨‍💻 **@TeleGaSellersClub** — Для продавцов

---

## ❤️ Поддержка

Если у тебя есть вопросы — просто напиши **@TeleGaSupportBot**

---

## 🪙 Teleton

Собственная единица внутри платформы. Начисляется при регистрации. Покупается через Telegram Stars.

---

## 🛡️ Лицензия

MIT — используй, форкай, продавай 😎
