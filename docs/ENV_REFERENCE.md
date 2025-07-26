# 🔧 Справочник переменных окружения

## 📋 Обзор

Этот документ содержит полный список переменных окружения для всех сервисов Tele•Ga Platform.

## 🏗️ Структура

```
telega-platform-1/
├── .env.example              # Пример переменных для разработки
├── .env                      # Локальные переменные (не в git)
├── k8s/secrets.yaml         # Kubernetes секреты
└── helm/values.production.yaml # Production конфигурация
```

## 🔐 Основные секреты

### TELEGRAM_BOT_TOKEN

- **Описание**: Токен Telegram бота от @BotFather
- **Формат**: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
- **Где используется**: Все сервисы, работающие с Telegram API
- **Пример**: `TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### JWT_SECRET

- **Описание**: Секретный ключ для подписи JWT токенов
- **Формат**: Случайная строка (минимум 32 символа)
- **Где используется**: Gateway, Auth Service
- **Пример**: `JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random`

### JWT_REFRESH_SECRET

- **Описание**: Секретный ключ для refresh токенов
- **Формат**: Случайная строка (минимум 32 символа)
- **Где используется**: Gateway, Auth Service
- **Пример**: `JWT_REFRESH_SECRET=your_refresh_token_secret_here`

## 🗄️ База данных

### DATABASE_URL

- **Описание**: Полный URL подключения к PostgreSQL
- **Формат**: `postgresql://user:password@host:port/database`
- **Где используется**: Все сервисы с базой данных
- **Пример**: `DATABASE_URL=postgresql://telega_user:password@localhost:5432/telega_db`

### POSTGRES\_\*

- **POSTGRES_HOST**: Хост PostgreSQL сервера
- **POSTGRES_PORT**: Порт PostgreSQL (по умолчанию 5432)
- **POSTGRES_USER**: Имя пользователя
- **POSTGRES_PASSWORD**: Пароль пользователя
- **POSTGRES_DB**: Имя базы данных

## 🔄 Redis

### REDIS_URL

- **Описание**: URL подключения к Redis
- **Формат**: `redis://host:port/db`
- **Где используется**: Кэширование, сессии, очереди
- **Пример**: `REDIS_URL=redis://localhost:6379/0`

### REDIS\_\*

- **REDIS_HOST**: Хост Redis сервера
- **REDIS_PORT**: Порт Redis (по умолчанию 6379)
- **REDIS_PASSWORD**: Пароль Redis (опционально)
- **REDIS_DB**: Номер базы данных Redis

## 📦 MinIO Object Storage

### MINIO\_\*

- **MINIO_ENDPOINT**: Endpoint MinIO сервера
- **MINIO_ACCESS_KEY**: Access Key для MinIO
- **MINIO_SECRET_KEY**: Secret Key для MinIO
- **MINIO_BUCKET**: Имя bucket для файлов
- **MINIO_REGION**: Регион MinIO
- **MINIO_USE_SSL**: Использовать SSL (true/false)

## 💳 Платежные системы

### STRIPE\_\*

- **STRIPE_SECRET_KEY**: Секретный ключ Stripe
- **STRIPE_PUBLISHABLE_KEY**: Публичный ключ Stripe
- **STRIPE_WEBHOOK_SECRET**: Секрет для webhook'ов Stripe

### PAYPAL\_\*

- **PAYPAL_CLIENT_ID**: Client ID PayPal
- **PAYPAL_CLIENT_SECRET**: Client Secret PayPal
- **PAYPAL_MODE**: Режим работы (sandbox/live)

## 🌐 Серверная конфигурация

### NODE_ENV

- **Описание**: Окружение приложения
- **Значения**: `development`, `production`, `test`
- **Где используется**: Все сервисы

### PORT

- **Описание**: Порт для запуска сервиса
- **По умолчанию**: 3000
- **Где используется**: Все сервисы

### CORS_ORIGIN

- **Описание**: Разрешенные домены для CORS
- **Формат**: Список доменов через запятую
- **Пример**: `CORS_ORIGIN=https://shop.telega.uz,https://studio.telega.uz`

## 📊 Мониторинг и логирование

### LOG_LEVEL

- **Описание**: Уровень логирования
- **Значения**: `error`, `warn`, `info`, `debug`
- **По умолчанию**: `info`

### SENTRY_DSN

- **Описание**: DSN для Sentry (мониторинг ошибок)
- **Формат**: `https://key@sentry.io/project`

### PROMETHEUS_PORT

- **Описание**: Порт для метрик Prometheus
- **По умолчанию**: 9090

## 📧 Email конфигурация

### SMTP\_\*

- **SMTP_HOST**: SMTP сервер
- **SMTP_PORT**: Порт SMTP
- **SMTP_USER**: Email пользователь
- **SMTP_PASS**: Email пароль

## 🤖 Внешние сервисы

### OPENAI_API_KEY

- **Описание**: API ключ OpenAI
- **Где используется**: AI функции

### GOOGLE_ANALYTICS_ID

- **Описание**: ID Google Analytics
- **Где используется**: Frontend приложения

## 🔧 Специфичные для сервисов

### Gateway Service

```env
PORT=3001
TELEGRAM_BOT_TOKEN=your_bot_token
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
CORS_ORIGIN=https://shop.telega.uz,https://studio.telega.uz
```

### Telegram Service

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_WEBHOOK_URL=https://api.telega.uz/webhook/telegram
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
```

### Auth Service

```env
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
DATABASE_URL=your_database_url
```

### Payment Service

```env
STRIPE_SECRET_KEY=your_stripe_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
DATABASE_URL=your_database_url
```

### Frontend Interface

```env
VITE_API_URL=https://api.telega.uz
VITE_TELEGRAM_BOT_USERNAME=@TeleGaBot
```

### Frontend Studio

```env
NEXT_PUBLIC_API_URL=https://api.telega.uz
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=@TeleGaBot
```

## 🚀 Production переменные

### Kubernetes Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: telega-secrets
type: Opaque
data:
  TELEGRAM_BOT_TOKEN: <base64_encoded>
  JWT_SECRET: <base64_encoded>
  DATABASE_URL: <base64_encoded>
  # ... другие секреты
```

### Helm Values

```yaml
secrets:
  telegramBotToken: '<base64_encoded>'
  jwtSecret: '<base64_encoded>'
  databaseUrl: '<base64_encoded>'
  # ... другие секреты
```

## 🔒 Безопасность

### Рекомендации по безопасности:

1. **Никогда не коммитьте реальные секреты в git**
2. **Используйте разные секреты для dev/prod**
3. **Регулярно ротируйте секреты**
4. **Используйте менеджеры секретов в production**
5. **Ограничивайте доступ к секретам**

### Генерация безопасных секретов:

```bash
# JWT Secret
openssl rand -base64 64

# Database Password
openssl rand -base64 32

# API Keys
openssl rand -hex 32
```

## 🛠️ Утилиты

### Генерация .env файла:

```bash
node scripts/generate-secrets.js
```

### Проверка переменных:

```bash
# Проверить все переменные
node -e "console.log(process.env)"

# Проверить конкретную переменную
echo $TELEGRAM_BOT_TOKEN
```

### Base64 кодирование:

```bash
# Закодировать
echo "your_secret" | base64

# Декодировать
echo "eW91cl9zZWNyZXQ=" | base64 -d
```

## 📝 Примеры

### Локальная разработка (.env):

```env
NODE_ENV=development
TELEGRAM_BOT_TOKEN=your_dev_bot_token
JWT_SECRET=dev_jwt_secret_123
DATABASE_URL=postgresql://user:pass@localhost:5432/telega_dev
REDIS_URL=redis://localhost:6379
```

### Production (Kubernetes):

```yaml
env:
  - name: NODE_ENV
    value: 'production'
  - name: TELEGRAM_BOT_TOKEN
    valueFrom:
      secretKeyRef:
        name: telega-secrets
        key: TELEGRAM_BOT_TOKEN
```

## 🔍 Отладка

### Проверка подключения к БД:

```bash
psql $DATABASE_URL -c "SELECT 1;"
```

### Проверка Redis:

```bash
redis-cli -u $REDIS_URL ping
```

### Проверка Telegram Bot:

```bash
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe"
```

## 📚 Дополнительные ресурсы

- [NestJS Environment Variables](https://docs.nestjs.com/techniques/configuration)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [Helm Values](https://helm.sh/docs/chart_template_guide/values_files/)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
