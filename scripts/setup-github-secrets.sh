#!/bin/bash

echo "🔐 Установка GitHub Secrets..."

if ! command -v gh &> /dev/null
then
    echo "❌ GitHub CLI не установлен. Установите его или добавьте секреты вручную."
    exit 1
fi

gh secret set TELEGRAM_DEPLOY_BOT_TOKEN --body "8248185119:AAEbEPI9VMH9DCjwSJEPzFDJ55P-LFWTTjM"
gh secret set TELEGRAM_DEPLOY_CHAT_ID --body "-1002881050960"

echo "✅ Секреты успешно установлены." 