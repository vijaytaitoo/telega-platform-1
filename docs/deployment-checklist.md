# 🚢 Чеклист деплоя Tele•Ga

## 📋 Предварительная подготовка

### ✅ Environment Variables
- [ ] Создать `.env.production` для всех сервисов
- [ ] Настроить `DATABASE_URL` (PostgreSQL)
- [ ] Добавить `JWT_SECRET` и `JWT_REFRESH_SECRET`
- [ ] Настроить `TELEGRAM_BOT_TOKEN`
- [ ] Добавить `STRIPE_SECRET_KEY` и `STRIPE_WEBHOOK_SECRET`
- [ ] Настроить `REDIS_URL`
- [ ] Добавить `MINIO_ACCESS_KEY` и `MINIO_SECRET_KEY`

### ✅ База данных
- [ ] Создать PostgreSQL базу данных
- [ ] Запустить миграции: `pnpm run db:mig`
- [ ] Проверить подключение к БД
- [ ] Настроить бэкапы

### ✅ SSL сертификаты
- [ ] Настроить домены:
  - `api.telega.uz`
  - `studio.telega.uz`
  - `shop.telega.uz`
  - `bot.telega.uz`
- [ ] Получить SSL сертификаты (Let's Encrypt)
- [ ] Настроить nginx конфигурацию

---

## 🐳 Docker подготовка

### ✅ Dockerfile проверка
- [ ] Проверить `Dockerfile.backend`
- [ ] Проверить `Dockerfile.frontend`
- [ ] Проверить `Dockerfile.bots`
- [ ] Убедиться в многоэтапной сборке

### ✅ docker-compose.prod.yml
- [ ] Настроить volumes для PostgreSQL
- [ ] Настроить volumes для nginx
- [ ] Настроить volumes для certbot
- [ ] Проверить сетевые настройки

### ✅ Образы
- [ ] Собрать все Docker образы
- [ ] Протестировать локально
- [ ] Загрузить в Docker Hub (опционально)

---

## 🔧 Серверная подготовка

### ✅ VPS настройка
- [ ] Ubuntu 22.04 LTS
- [ ] Установить Docker и Docker Compose
- [ ] Настроить firewall (порты 80, 443, 22)
- [ ] Настроить swap файл
- [ ] Установить nginx (если не через Docker)

### ✅ Домены и DNS
- [ ] Настроить A записи для всех доменов
- [ ] Проверить DNS пропагацию
- [ ] Настроить CNAME записи (если нужно)

### ✅ SSH доступ
- [ ] Настроить SSH ключи
- [ ] Отключить парольную аутентификацию
- [ ] Настроить fail2ban

---

## 🚀 Деплой

### ✅ Первый деплой
```bash
# 1. Клонировать репозиторий
git clone https://github.com/your-username/telega-platform-1.git
cd telega-platform-1

# 2. Настроить .env файлы
cp .env.example .env.production
# Отредактировать .env.production

# 3. Запустить
docker compose -f docker-compose.prod.yml up -d

# 4. Проверить статус
docker compose -f docker-compose.prod.yml ps
```

### ✅ Проверка работоспособности
- [ ] API доступен: `https://api.telega.uz/health`
- [ ] Studio доступен: `https://studio.telega.uz`
- [ ] Shop доступен: `https://shop.telega.uz`
- [ ] Bot отвечает: `https://bot.telega.uz`

### ✅ SSL сертификаты
```bash
# Получить сертификаты
docker compose -f docker-compose.prod.yml run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d api.telega.uz -d studio.telega.uz -d shop.telega.uz -d bot.telega.uz

# Перезапустить nginx
docker compose -f docker-compose.prod.yml restart nginx
```

---

## 📊 Мониторинг

### ✅ Логирование
- [ ] Настроить логирование в файлы
- [ ] Настроить ротацию логов
- [ ] Настроить централизованное логирование (опционально)

### ✅ Метрики
- [ ] Настроить Prometheus (опционально)
- [ ] Настроить Grafana дашборды (опционально)
- [ ] Настроить алерты в Telegram

### ✅ Бэкапы
- [ ] Настроить автоматические бэкапы БД
- [ ] Настроить бэкапы файлов
- [ ] Протестировать восстановление

---

## 🔄 CI/CD (опционально)

### ✅ GitHub Actions
- [ ] Создать `.github/workflows/deploy.yml`
- [ ] Настроить secrets в GitHub
- [ ] Настроить автоматический деплой

### ✅ Secrets
- [ ] `VPS_HOST` - IP адрес сервера
- [ ] `VPS_USER` - пользователь для SSH
- [ ] `VPS_SSH_KEY` - приватный SSH ключ
- [ ] `DOCKER_HUB_TOKEN` - токен для Docker Hub

---

## 🧪 Тестирование

### ✅ Функциональные тесты
- [ ] Тест регистрации пользователя
- [ ] Тест создания магазина
- [ ] Тест добавления товара
- [ ] Тест оформления заказа
- [ ] Тест оплаты

### ✅ Нагрузочные тесты
- [ ] Тест под нагрузкой API
- [ ] Тест производительности БД
- [ ] Тест времени отклика

### ✅ Безопасность
- [ ] Проверить CORS настройки
- [ ] Проверить rate limiting
- [ ] Проверить валидацию входных данных
- [ ] Проверить JWT токены

---

## 📱 Telegram интеграция

### ✅ Боты
- [ ] Проверить webhook настройки
- [ ] Протестировать команды бота
- [ ] Проверить inline режим
- [ ] Протестировать платежи через Telegram Stars

### ✅ WebApp
- [ ] Протестировать WebApp в Telegram
- [ ] Проверить адаптивность
- [ ] Протестировать платежи

---

## 🚨 Troubleshooting

### ❌ Частые проблемы

**Проблема**: Docker не может подключиться к БД
```bash
# Решение: проверить сеть Docker
docker network ls
docker network inspect telega_telega
```

**Проблема**: SSL сертификаты не обновляются
```bash
# Решение: перезапустить certbot
docker compose -f docker-compose.prod.yml restart certbot
```

**Проблема**: nginx не проксирует запросы
```bash
# Решение: проверить конфигурацию
docker compose -f docker-compose.prod.yml exec nginx nginx -t
```

### 📞 Поддержка
- Telegram: @TeleGaSupportBot
- Email: support@telega.uz
- Документация: `docs/architecture.md`

---

## ✅ Финальная проверка

- [ ] Все сервисы запущены и работают
- [ ] SSL сертификаты активны
- [ ] Боты отвечают на команды
- [ ] WebApp работает в Telegram
- [ ] Платежи проходят успешно
- [ ] Мониторинг настроен
- [ ] Бэкапы работают
- [ ] Документация обновлена

**🎉 Платформа готова к продакшену!** 