#!/bin/bash

echo "🔍 Проверка установлен ли GitHub CLI (gh)..."
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI не найден. Установи его отсюда: https://cli.github.com"
  exit 1
fi

BOT_TOKEN="8248185119:AAEbEPI9VMH9DCjwSJEPzFDJ55P-LFWTTjM"
CHAT_ID="-1002881050960"

echo "🔐 Добавляю секреты в репозиторий..."
gh secret set TELEGRAM_DEPLOY_BOT_TOKEN -b"$BOT_TOKEN"
gh secret set TELEGRAM_DEPLOY_CHAT_ID -b"$CHAT_ID"

echo "📤 Отправляю тестовое уведомление..."
curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage \
  -d chat_id=$CHAT_ID \
  -d parse_mode=Markdown \
  -d text="✅ *TeleGaStatusBot подключен!*\nГотов к приёму CI/CD уведомлений."

echo "✅ Готово. Secrets установлены. Бот работает." 