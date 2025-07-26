# ✅ TeleGaStatusBot — Упрощённая CI/CD интеграция

## 🤖 Бот:

- [@TeleGaStatusBot](https://t.me/TeleGaStatusBot)
- Chat ID: `-1002881050960`
- Группа: [TeleGa Status](https://t.me/+gztDCh5qT4g4OWI6)

## 📁 Файлы:

- `.github/workflows/deploy.yml` — CI/CD workflow
- `scripts/setup-github-secrets.sh` — Автоматическая настройка
- `TELEGRAM_STATUS_BOT_COMPLETE_SETUP.md` — Инструкции

## 🔐 GitHub Secrets:

| Название                    | Значение         |
| --------------------------- | ---------------- |
| `TELEGRAM_DEPLOY_BOT_TOKEN` | `токен бота`     |
| `TELEGRAM_DEPLOY_CHAT_ID`   | `-1002881050960` |

## 🧪 Уведомления:

- ✅ Успешный деплой: получаешь сообщение в Telegram
- ❌ Ошибка: моментально узнаешь через Telegram

## 🚀 Использование:

1. Установи GitHub CLI
2. Запусти:

```bash
sh scripts/setup-github-secrets.sh
```

3. Соверши git push:

```bash
git push origin main
```

Уведомление придёт в Telegram-группу автоматически 🎉
