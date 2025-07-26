#!/bin/bash

echo "🔍 Проверка наличия GitHub CLI..."
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) не установлен. Установите: https://cli.github.com"
  exit 1
fi

BOT_TOKEN="8248185119:AAEbEPI9VMH9DCjwSJEPzFDJ55P-LFWTTjM"
CHAT_ID="-1002881050960"

echo "🔐 Добавление секретов в GitHub..."
gh secret set TELEGRAM_DEPLOY_BOT_TOKEN -b"$BOT_TOKEN"
gh secret set TELEGRAM_DEPLOY_CHAT_ID -b"$CHAT_ID"

echo "📤 Отправка тестового уведомления в Telegram..."
curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage \
  -d chat_id=$CHAT_ID \
  -d parse_mode=Markdown \
  -d text="✅ *TeleGaStatusBot готов к работе!*\nВсе CI/CD уведомления будут отображаться здесь."

echo "🎉 Готово! Secrets установлены и бот протестирован." 