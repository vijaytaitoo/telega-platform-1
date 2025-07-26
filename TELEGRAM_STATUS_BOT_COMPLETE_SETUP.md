# ✅ TeleGaStatusBot — CI/CD Telegram Интеграция

## 🧩 Компоненты:

- **Bot**: [@TeleGaStatusBot](https://t.me/TeleGaStatusBot)
- **Группа**: [TeleGa Status](https://t.me/+gztDCh5qT4g4OWI6)
- **Chat ID**: `-1002881050960`

## 📁 Структура:

- `.github/workflows/deploy.yml` — CI/CD с уведомлениями
- `scripts/setup-github-secrets.sh` — автоматическая установка секретов
- `TELEGRAM_STATUS_BOT_COMPLETE_SETUP.md` — вся документация

## 🔐 GitHub Secrets:

| Название                    | Значение                                         |
| --------------------------- | ------------------------------------------------ |
| `TELEGRAM_DEPLOY_BOT_TOKEN` | `8248185119:AAEbEPI9VMH9DCjwSJEPzFDJ55P-LFWTTjM` |
| `TELEGRAM_DEPLOY_CHAT_ID`   | `-1002881050960`                                 |

## ⚙️ Установка секретов:

**Автоматически:**

```bash
sh scripts/setup-github-secrets.sh
```

**Вручную:**
GitHub → Settings → Secrets and variables → Actions → New Repository Secret

## 🧪 Примеры уведомлений:

✅ Успешный деплой проекта Tele•Ga!

❌ Ошибка деплоя проекта Tele•Ga!

## 🎯 Что теперь?

Просто пушь в main:

```bash
git push origin main
```

Telegram-группа получит уведомление о деплое. Всё остальное — на автомате. 🚀
