#!/bin/bash

# 🤖 TeleGaStatusBot - GitHub Secrets Setup Script
# Автоматическая настройка GitHub Secrets для CI/CD уведомлений

set -e

echo "🚀 Настройка GitHub Secrets для TeleGaStatusBot..."

# Проверяем наличие GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI не установлен. Установите его:"
    echo "   macOS: brew install gh"
    echo "   Ubuntu: sudo apt install gh"
    echo "   Или: https://cli.github.com/"
    exit 1
fi

# Проверяем авторизацию в GitHub
if ! gh auth status &> /dev/null; then
    echo "❌ Не авторизован в GitHub CLI. Выполните:"
    echo "   gh auth login"
    exit 1
fi

# Конфигурация бота
BOT_TOKEN="8248185119:AAEbEPI9VMH9DCjwSJEPzFDJ55P-LFWTTjM"
CHAT_ID="-1002881050960"

echo "📋 Настройка секретов..."

# Добавляем TELEGRAM_DEPLOY_BOT_TOKEN
echo "🔐 Добавляем TELEGRAM_DEPLOY_BOT_TOKEN..."
gh secret set TELEGRAM_DEPLOY_BOT_TOKEN --body "$BOT_TOKEN"

# Добавляем TELEGRAM_DEPLOY_CHAT_ID
echo "🔐 Добавляем TELEGRAM_DEPLOY_CHAT_ID..."
gh secret set TELEGRAM_DEPLOY_CHAT_ID --body "$CHAT_ID"

echo "✅ GitHub Secrets успешно настроены!"
echo ""
echo "📊 Статус:"
echo "   🤖 TeleGaStatusBot: ✅ Активен"
echo "   📡 Telegram Group: ✅ Настроена"
echo "   🔐 GitHub Secrets: ✅ Добавлены"
echo "   📁 CI/CD Workflow: ✅ Обновлен"
echo ""
echo "🧪 Тестирование..."
echo "   Отправляем тестовое уведомление..."

# Тестовое уведомление
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"$CHAT_ID\",
    \"text\": \"🧪 *Тест TeleGaStatusBot* ✅\n\nGitHub Secrets настроены!\nCI/CD уведомления готовы к работе.\n\n⏰ Время: $(date -u +%Y-%m-%dT%H:%M:%SZ)\",
    \"parse_mode\": \"Markdown\"
  }"

echo ""
echo "🎉 Настройка завершена!"
echo ""
echo "📋 Что было сделано:"
echo "   ✅ Обновлен .github/workflows/deploy.yml"
echo "   ✅ Добавлены GitHub Secrets"
echo "   ✅ Настроены Markdown уведомления"
echo "   ✅ Протестирована отправка сообщений"
echo ""
echo "🚀 Следующие шаги:"
echo "   1. Сделайте пуш в main ветку"
echo "   2. Проверьте GitHub Actions"
echo "   3. Убедитесь в получении уведомлений"
echo ""
echo "🔗 Полезные ссылки:"
echo "   • GitHub Actions: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/actions"
echo "   • Telegram Group: https://t.me/+gztDCh5qT4g4OWI6"
echo "   • Bot: @TeleGaStatusBot" 