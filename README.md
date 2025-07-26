# Tele•Ga Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/your-username/telega-platform-1/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/telega-platform-1/actions/workflows/ci.yml)
[![Deploy to Kubernetes](https://github.com/your-username/telega-platform-1/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/telega-platform-1/actions/workflows/deploy.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://hub.docker.com/r/your-username/telega)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-orange.svg)](https://kubernetes.io/)
[![Helm](https://img.shields.io/badge/Helm-Chart-red.svg)](https://helm.sh/)
[![Telegram](https://img.shields.io/badge/Telegram-@TeleGaSupportBot-blue.svg)](https://t.me/TeleGaSupportBot)
[![Community](https://img.shields.io/badge/Community-@Tele_GaCommunity-green.svg)](https://t.me/Tele_GaCommunity)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/telega-platform-1)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-red.svg)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)

🚀 **Мощная Telegram e-commerce платформа** с мультиботами, маркетплейсом и кастомным UI.

**Live Demo**: [shop.telega.uz](https://shop.telega.uz) | [studio.telega.uz](https://studio.telega.uz) | [api.telega.uz](https://api.telega.uz)

---

## 🔧 Стек технологий

- **Backend**: NestJS 11 (monorepo, microapps)
- **Telegram**: Telegraf.js + Webhook/LongPolling
- **ORM**: TypeORM 3 / PostgreSQL
- **Frontend**: Vite + React + TailwindCSS
- **DevOps**: Docker, Kubernetes, Helm
- **Монета**: Teleton (внутренняя единица расчёта)
- **Хранилище**: MinIO (совместим с S3)
- **Мониторинг**: Prometheus + Grafana
- **Логирование**: ELK Stack

## 🏗️ Архитектура

Проект использует **микросервисную архитектуру** с **монорепозиторием**:

```mermaid
graph TB
    subgraph "Frontend Applications"
        A[Telegram Bot] --> B[Gateway API]
        C[Web Interface] --> B
        D[Admin Studio] --> B
    end

    subgraph "Backend Services"
        B --> E[Auth Service]
        B --> F[Telegram Service]
        B --> G[Payment Service]
        B --> H[Mass Mailer]
    end

    subgraph "Infrastructure"
        I[PostgreSQL] --> B
        J[Redis] --> B
        K[MinIO] --> B
        L[Prometheus] --> B
        M[Grafana] --> B
    end

    subgraph "External Services"
        N[Telegram API] --> F
        O[Stripe] --> G
        P[PayPal] --> G
    end
```

### Основные компоненты:

- **Gateway**: API Gateway на NestJS
- **Telegram Service**: Обработка Telegram ботов
- **Auth Service**: Аутентификация и авторизация
- **Payment Service**: Интеграция с платежными системами
- **Frontend Interface**: Пользовательский интерфейс магазина
- **Frontend Studio**: Административная панель

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

| Команда           | Назначение            |
| ----------------- | --------------------- |
| `pnpm run dev`    | Запуск всей платформы |
| `pnpm run build`  | Сборка всех пакетов   |
| `pnpm run lint`   | Проверка кода         |
| `pnpm run test`   | Запуск тестов         |
| `pnpm run apply`  | Генерация .env файлов |
| `pnpm run db:mig` | Миграции TypeORM      |

---

## 🔍 Анализ в Cursor

Открой любой файл → `Cmd+K` → Ask AI → Вставь из `docs/project-analysis-prompt.md`

---

## 📄 Документация

- 📘 **Архитектура**: `docs/architecture.md`
- 🧠 **AI-промпты**: `docs/project-analysis-prompt.md`
- 🚢 **Чеклист деплоя**: `docs/deployment-checklist.md`
- 👨‍💻 **Руководство разработчика**: `docs/DEV_GUIDE.md`
- 🤝 **Для контрибьюторов**: `docs/CONTRIBUTING.md`
- 🗺️ **Roadmap**: `docs/ROADMAP.md`
- 🔧 **Переменные окружения**: `docs/ENV_REFERENCE.md`
- 🚀 **Инструкции по запуску**: `docs/run-scripts.md`
- 🐳 **Kubernetes деплой**: `docs/KUBERNETES_DEPLOYMENT.md`
- 🔍 **Troubleshooting**: `docs/TROUBLESHOOTING.md`

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
