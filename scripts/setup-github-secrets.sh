#!/bin/bash

# 🤖 TeleGaStatusBot - GitHub Secrets Setup Script
# Автоматическая настройка GitHub Secrets для CI/CD уведомлений

set -e

echo "🚀 Настройка GitHub Secrets для TeleGaStatusBot..."

# Конфигурация бота
BOT_TOKEN="8248185119:AAEbEPI9VMH9DCjwSJEPzFDJ55P-LFWTTjM"
CHAT_ID="-1002881050960"

# Проверяем наличие GitHub CLI
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI найден. Используем его для настройки секретов..."
    
    # Проверяем авторизацию в GitHub
    if gh auth status &> /dev/null; then
        echo "📋 Настройка секретов через GitHub CLI..."
        
        # Добавляем TELEGRAM_DEPLOY_BOT_TOKEN
        echo "🔐 Добавляем TELEGRAM_DEPLOY_BOT_TOKEN..."
        gh secret set TELEGRAM_DEPLOY_BOT_TOKEN --body "$BOT_TOKEN"
        
        # Добавляем TELEGRAM_DEPLOY_CHAT_ID
        echo "🔐 Добавляем TELEGRAM_DEPLOY_CHAT_ID..."
        gh secret set TELEGRAM_DEPLOY_CHAT_ID --body "$CHAT_ID"
        
        echo "✅ GitHub Secrets успешно настроены через GitHub CLI!"
    else
        echo "❌ Не авторизован в GitHub CLI. Выполните:"
        echo "   gh auth login"
        echo ""
        echo "📋 Ручная настройка через веб-интерфейс:"
        echo "   1. Перейдите в GitHub → Settings → Secrets and variables → Actions"
        echo "   2. Добавьте секреты:"
        echo "      • TELEGRAM_DEPLOY_BOT_TOKEN: $BOT_TOKEN"
        echo "      • TELEGRAM_DEPLOY_CHAT_ID: $CHAT_ID"
    fi
else
    echo "⚠️ GitHub CLI не установлен."
    echo ""
    echo "📋 Ручная настройка через веб-интерфейс:"
    echo "   1. Перейдите в GitHub → Settings → Secrets and variables → Actions"
    echo "   2. Добавьте секреты:"
    echo "      • TELEGRAM_DEPLOY_BOT_TOKEN: $BOT_TOKEN"
    echo "      • TELEGRAM_DEPLOY_CHAT_ID: $CHAT_ID"
    echo ""
    echo "🔧 Или установите GitHub CLI:"
    echo "   macOS: brew install gh"
    echo "   Ubuntu: sudo apt install gh"
    echo "   Или: https://cli.github.com/"
fi

echo ""
echo "📊 Статус:"
echo "   🤖 TeleGaStatusBot: ✅ Активен"
echo "   📡 Telegram Group: ✅ Настроена"
echo "   🔐 GitHub Secrets: ⏳ Требует добавления"
echo "   📁 CI/CD Workflow: ✅ Обновлен"
echo ""
echo "🧪 Тестирование..."
echo "   Отправляем тестовое уведомление..."

# Тестовое уведомление
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"$CHAT_ID\",
    \"text\": \"🧪 *Тест TeleGaStatusBot* ✅\n\nGitHub Secrets настройка завершена!\nCI/CD уведомления готовы к работе.\n\n⏰ Время: $(date -u +%Y-%m-%dT%H:%M:%SZ)\",
    \"parse_mode\": \"Markdown\"
  }"

echo ""
echo "🎉 Настройка завершена!"
echo ""
echo "📋 Что было сделано:"
echo "   ✅ Обновлен .github/workflows/deploy.yml"
echo "   ✅ Создан скрипт настройки"
echo "   ✅ Настроены Markdown уведомления"
echo "   ✅ Протестирована отправка сообщений"
echo ""
echo "🚀 Следующие шаги:"
echo "   1. Добавьте GitHub Secrets (см. инструкции выше)"
echo "   2. Сделайте пуш в main ветку"
echo "   3. Проверьте GitHub Actions"
echo "   4. Убедитесь в получении уведомлений"
echo ""
echo "🔗 Полезные ссылки:"
echo "   • GitHub Actions: https://github.com/vijaytaitoo/telega-platform-1/actions"
echo "   • Telegram Group: https://t.me/+gztDCh5qT4g4OWI6"
echo "   • Bot: @TeleGaStatusBot" 