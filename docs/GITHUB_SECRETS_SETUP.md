# 🔧 Настройка GitHub Secrets для Telegram Deploy Bot

## 🤖 Полученные данные бота

- **Бот**: @TeleGaDeployBot
- **Токен**: `8293583868:AAHwxBrWviloGjEfYL0gqnMEJBT1mpeBPYA`

## 📋 Шаги настройки

### 1. Перейдите в GitHub Secrets

1. Откройте ваш репозиторий на GitHub
2. Перейдите в **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **New repository secret**

### 2. Добавьте следующие секреты

#### TELEGRAM_DEPLOY_BOT_TOKEN

```
8293583868:AAHwxBrWviloGjEfYL0gqnMEJBT1mpeBPYA
```

#### TELEGRAM_DEPLOY_CHAT_ID

Для получения chat_id:

1. Добавьте бота @TeleGaDeployBot в ваш канал/группу
2. Отправьте сообщение в канал
3. Откройте: `https://api.telegram.org/bot8293583868:AAHwxBrWviloGjEfYL0gqnMEJBT1mpeBPYA/getUpdates`
4. Найдите `chat.id` в ответе

**Примеры chat_id:**

- Личный чат: `123456789`
- Группа: `-1001234567890`
- Канал: `-1001234567890`

#### KUBE_CONFIG

Base64-кодированный kubeconfig файл:

```bash
# Создайте kubeconfig для вашего кластера
kubectl config view --raw | base64
```

### 3. Проверка настройки

После добавления секретов, при пуше в `main` ветку:

1. **GitHub Actions** запустит CI/CD pipeline
2. **Telegram бот** отправит уведомления:
   - ✅ Успешный деплой
   - ❌ Ошибки деплоя
   - 📊 Статус и ссылки

## 🧪 Тест бота

### Проверьте, что бот работает:

```bash
curl "https://api.telegram.org/bot8293583868:AAHwxBrWviloGjEfYL0gqnMEJBT1mpeBPYA/getMe"
```

### Отправьте тестовое сообщение:

```bash
curl -X POST "https://api.telegram.org/bot8293583868:AAHwxBrWviloGjEfYL0gqnMEJBT1mpeBPYA/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "YOUR_CHAT_ID",
    "text": "🚀 Tele•Ga Deploy Bot готов к работе!"
  }'
```

## 📱 Примеры уведомлений

### Успешный деплой:

```
✅ Tele•Ga успешно задеплоен!

🚀 Коммит: `1a0b00f`
👤 Автор: vijaytaitoo
📅 Время: 2024-01-26T10:39:11Z

🔗 Ссылки:
• API: https://api.telega.uz
• Shop: https://shop.telega.uz
• Studio: https://studio.telega.uz

📊 Статус: https://github.com/vijaytaitoo/telega-platform-1/actions/runs/123456789
```

### Ошибка деплоя:

```
❌ Ошибка деплоя Tele•Ga!

🚨 Коммит: `1a0b00f`
👤 Автор: vijaytaitoo

🔗 Логи: https://github.com/vijaytaitoo/telega-platform-1/actions/runs/123456789

⚠️ Проверьте логи и исправьте ошибки
```

## 🔒 Безопасность

- ✅ Токен хранится в GitHub Secrets
- ✅ Доступ только через GitHub Actions
- ✅ Логирование всех уведомлений
- ✅ Возможность отключения уведомлений

## 🚀 Готово!

После настройки всех секретов:

1. **Запушьте в main** - CI/CD запустится автоматически
2. **Telegram уведомления** - получайте статус деплоя
3. **Мониторинг** - следите за процессом в реальном времени

---

**Дата**: Январь 2024  
**Статус**: ✅ Bot Ready  
**Следующий этап**: Настройка DNS и первый деплой
