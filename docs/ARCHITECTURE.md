# 🧩 Архитектура платформы Tele•Ga

---

## 📐 Общая схема (FSD + microapps)

```mermaid
graph TD
  subgraph Backend (NestJS)
    A1(API Gateway)
    A2(Auth App)
    A3(Bot App)
    A4(AI App)
    A5(DB & Services)
  end

  subgraph Telegram
    B1(Bots)
    B2(Marketplace)
  end

  subgraph Frontend
    C1(React Storefront)
    C2(Admin Panel)
  end

  A1 --> A2
  A1 --> A3
  A1 --> A4
  A5 --> A1
  B1 --> A3
  C1 --> A1
  C2 --> A2
```

---

## 🧱 Архитектурные слои (FSD)

- **features/** — бизнес-фичи (например, корзина, оплата)
- **entities/** — сущности (пользователь, товар, заказ)
- **shared/** — общие компоненты, хелперы, утилиты
- **widgets/** — блоки интерфейса (поиск, превью товара)
- **pages/** — страницы (магазин, заказ, профиль)

---

## 🛰️ Микросервисы

| Название | Назначение |
|----------|------------|
| api | Общий REST API + GraphQL |
| auth | JWT, OAuth, токены |
| bot | Взаимодействие с Telegraf ботами |
| ai | OpenAI + генерация описаний |

---

## 💾 Хранилище

- **PostgreSQL** + TypeORM
- **Redis** (сессии, очереди)
- **MinIO** (для фото/файлов)

---

## 🔐 Безопасность

- CORS + Helmet
- JWT + Refresh
- Rate limiting
- Telegram Login auth

---

## 🧠 AI-интеграции

- OpenAI SDK
- Генерация описаний, названий
- Анализ продаж

---

## 📦 Структура проекта

```
telega-platform-1/
├── apps/
│   ├── telega-interface/     # Vite + React
│   └── telega-studio/        # Next.js
├── backend/
│   ├── gateway/              # NestJS API
│   ├── services/             # Микросервисы
│   └── libs/                 # Общие библиотеки
├── frontend/                 # Отдельный Vite
├── mass-mailer/              # Рассылка
└── shared/                   # Общие типы
```

---

## 🔧 Технологический стек

### Backend
- **NestJS 11** - основной фреймворк
- **TypeORM 3** - ORM для PostgreSQL
- **Telegraf.js** - Telegram Bot API
- **JWT** - аутентификация
- **Redis** - кеширование и сессии

### Frontend
- **React 18** - UI библиотека
- **Vite** - сборщик
- **TailwindCSS** - стили
- **TypeScript** - типизация

### DevOps
- **Docker** - контейнеризация
- **PM2** - процесс-менеджер
- **nginx** - reverse proxy
- **GitHub Actions** - CI/CD

---

## 🚀 Деплой

### Локальная разработка
```bash
pnpm install
pnpm run apply
pnpm run dev
```

### Продакшен
```bash
docker compose -f docker-compose.prod.yml up -d
```

---

## 📊 Мониторинг

- **Логи**: Winston + ELK Stack
- **Метрики**: Prometheus + Grafana
- **Трейсинг**: Jaeger
- **Алерты**: Telegram Bot

---

## 🔄 CI/CD Pipeline

1. **GitHub Actions** - автоматическая сборка
2. **Docker Hub** - публикация образов
3. **VPS** - деплой через SSH
4. **nginx** - проксирование запросов
5. **SSL** - Let's Encrypt сертификаты
