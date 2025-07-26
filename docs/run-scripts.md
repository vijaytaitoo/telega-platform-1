# 🚀 Инструкции по запуску Tele•Ga

## 📋 Предварительные требования

### Системные требования
- **Node.js** 18+ 
- **pnpm** 8+
- **PostgreSQL** 14+
- **Redis** 6+
- **Git** 2.30+

### Установка зависимостей
```bash
# Установка pnpm (если не установлен)
npm install -g pnpm

# Клонирование репозитория
git clone https://github.com/your-username/telega-platform-1.git
cd telega-platform-1

# Установка всех зависимостей
pnpm install
```

---

## 🔧 Настройка окружения

### 1. Генерация .env файлов
```bash
# Автоматическая генерация всех .env файлов
pnpm run apply

# Или вручную:
node scripts/create-env-files.js
```

### 2. Настройка базы данных
```bash
# Создание базы данных PostgreSQL
createdb telega

# Запуск миграций
pnpm run db:mig

# Проверка подключения
psql -h localhost -U telega_user -d telega -c "SELECT version();"
```

### 3. Настройка Redis
```bash
# Запуск Redis (macOS)
brew services start redis

# Или через Docker
docker run -d --name redis -p 6379:6379 redis:alpine
```

---

## 🚀 Команды запуска

### Полный запуск (все сервисы)
```bash
# Запуск всей платформы
pnpm run dev

# Или по отдельности:
pnpm run start:dev    # Backend Gateway
pnpm run start:prod   # Продакшен режим
```

### Отдельные сервисы

#### Backend Gateway (порт 3030)
```bash
# Разработка
pnpm --filter @telega/gateway run start:dev

# Продакшен
pnpm --filter @telega/gateway run start:prod

# Отладка
pnpm --filter @telega/gateway run start:debug
```

#### Frontend Interface (порт 5173)
```bash
# Разработка
pnpm --filter telega-interface run dev

# Сборка
pnpm --filter telega-interface run build

# Предпросмотр сборки
pnpm --filter telega-interface run preview
```

#### Frontend Studio (порт 3000)
```bash
# Разработка
pnpm --filter telega-studio run dev

# Сборка
pnpm --filter telega-studio run build

# Продакшен
pnpm --filter telega-studio run start
```

#### Telegram Service (порт 3032)
```bash
# Разработка
pnpm --filter @telega/telegram-service run start:dev

# Продакшен
pnpm --filter @telega/telegram-service run start:prod
```

#### Auth Service (порт 3031)
```bash
# Разработка
pnpm --filter @telega/auth-service run start:dev

# Продакшен
pnpm --filter @telega/auth-service run start:prod
```

#### Payment Service (порт 3033)
```bash
# Разработка
pnpm --filter @telega/payment-service run start:dev

# Продакшен
pnpm --filter @telega/payment-service run start:prod
```

#### Mass Mailer
```bash
# Разработка
pnpm --filter mass-mailer run dev

# Продакшен
pnpm --filter mass-mailer run start
```

---

## 🐳 Docker запуск

### Локальная разработка
```bash
# Сборка образов
docker compose build

# Запуск всех сервисов
docker compose up -d

# Просмотр логов
docker compose logs -f

# Остановка
docker compose down
```

### Продакшен
```bash
# Сборка и запуск в продакшен режиме
docker compose -f docker-compose.prod.yml up -d --build

# Просмотр статуса
docker compose -f docker-compose.prod.yml ps

# Обновление сервисов
docker compose -f docker-compose.prod.yml up -d --build gateway
```

---

## 🔍 Проверка работоспособности

### Health Checks
```bash
# Backend Gateway
curl http://localhost:3030/health

# Frontend Interface
curl http://localhost:5173

# Frontend Studio
curl http://localhost:3000

# Telegram Service
curl http://localhost:3032/health
```

### Проверка API
```bash
# Swagger документация
open http://localhost:3030/api

# Тестовый запрос
curl -X GET http://localhost:3030/api/shops
```

### Проверка базы данных
```bash
# Подключение к PostgreSQL
psql -h localhost -U telega_user -d telega

# Проверка таблиц
\dt

# Проверка данных
SELECT * FROM users LIMIT 5;
```

---

## 🛠️ Утилиты

### Очистка проекта
```bash
# Очистка node_modules
pnpm run clean:node_modules

# Очистка кеша
pnpm run clean:cache

# Полная очистка
pnpm run clean
```

### Линтинг и форматирование
```bash
# Проверка кода
pnpm run lint

# Автоисправление
pnpm run lint:fix

# Форматирование
pnpm run prettier

# Проверка типов
pnpm run type-check
```

### Тестирование
```bash
# Unit тесты
pnpm run test

# Тесты с покрытием
pnpm run test:cov

# E2E тесты
pnpm run test:e2e

# Тесты в watch режиме
pnpm run test:watch
```

---

## 📊 Мониторинг

### Логи в реальном времени
```bash
# Backend Gateway
pnpm --filter @telega/gateway run start:dev | pino-pretty

# Telegram Service
pnpm --filter @telega/telegram-service run start:dev | pino-pretty

# Все сервисы
pnpm run dev | pino-pretty
```

### Метрики
```bash
# Prometheus метрики
curl http://localhost:3030/metrics

# Health check всех сервисов
curl http://localhost:3030/health
```

---

## 🚨 Troubleshooting

### Частые проблемы

#### Проблема: NestJS не может подключиться к БД
```bash
# Решение: проверить DATABASE_URL
echo $DATABASE_URL
# Должно быть: postgresql://user:password@localhost:5432/telega

# Проверить PostgreSQL
brew services list | grep postgresql
# Или
docker ps | grep postgres
```

#### Проблема: Redis не доступен
```bash
# Решение: запустить Redis
brew services start redis
# Или
docker run -d --name redis -p 6379:6379 redis:alpine

# Проверить подключение
redis-cli ping
```

#### Проблема: Порт занят
```bash
# Найти процесс на порту
lsof -i :3030
lsof -i :5173
lsof -i :3000

# Убить процесс
kill -9 <PID>
```

#### Проблема: Зависимости не установлены
```bash
# Очистить кеш pnpm
pnpm store prune

# Переустановить зависимости
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Проблема: TypeScript ошибки
```bash
# Очистить кеш TypeScript
rm -rf dist
rm -rf .turbo

# Пересобрать проект
pnpm run build
```

---

## 🔄 Обновление проекта

### Обновление зависимостей
```bash
# Проверить устаревшие пакеты
pnpm outdated

# Обновить все зависимости
pnpm up --latest

# Обновить конкретный пакет
pnpm up @nestjs/core --latest
```

### Обновление кода
```bash
# Получить последние изменения
git pull origin main

# Установить новые зависимости
pnpm install

# Перезапустить сервисы
pnpm run dev
```

---

## 📱 Telegram интеграция

### Настройка бота
```bash
# Создать бота через @BotFather
# Получить токен и добавить в .env

# Проверить webhook
curl -X POST https://api.telegram.org/bot<TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-domain.com/webhook"}'
```

### Тестирование бота
```bash
# Отправить тестовое сообщение
curl -X POST https://api.telegram.org/bot<TOKEN>/sendMessage \
  -H "Content-Type: application/json" \
  -d '{"chat_id": <CHAT_ID>, "text": "Test message"}'
```

---

## 🎯 Продакшен чеклист

Перед деплоем в продакшен убедитесь:

- [ ] Все .env файлы настроены
- [ ] База данных создана и миграции запущены
- [ ] Redis запущен и доступен
- [ ] Все сервисы собираются без ошибок
- [ ] Тесты проходят успешно
- [ ] Линтинг не показывает ошибок
- [ ] SSL сертификаты настроены
- [ ] Домены настроены и указывают на сервер
- [ ] Бэкапы настроены
- [ ] Мониторинг активен

---

## 📞 Поддержка

### Полезные команды
```bash
# Статус всех сервисов
pnpm run status

# Логи всех сервисов
pnpm run logs

# Перезапуск всех сервисов
pnpm run restart

# Остановка всех сервисов
pnpm run stop
```

### Контакты
- **Telegram Support**: @TeleGaSupportBot
- **Community Chat**: @Tele_GaCommunity
- **GitHub Issues**: https://github.com/your-username/telega-platform-1/issues

---

## 🎉 Готово!

После выполнения всех шагов у вас должна быть полностью рабочая платформа Tele•Ga:

- ✅ Backend Gateway на порту 3030
- ✅ Frontend Interface на порту 5173  
- ✅ Frontend Studio на порту 3000
- ✅ Telegram боты работают
- ✅ База данных подключена
- ✅ Redis кеширование активно

**Добро пожаловать в мир Telegram e-commerce! 🚀** 