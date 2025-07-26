# ✅ TeleGaStatusBot — Полная автоматизация CI/CD уведомлений в Telegram

## 🔧 Что включено:

- Автоматические уведомления в Telegram при успехе/ошибке деплоя
- Markdown-форматирование и эмодзи
- Полностью автоматический setup через GitHub CLI

---

## 📁 Файлы:

### 1. `.github/workflows/deploy.yml`

CI/CD с уведомлениями:

- ✅ Успешный деплой — отправляется сообщение с галочкой
- ❌ Ошибка деплоя — отправляется сообщение с ошибкой
- Используется `curl` вместо `telegram-action`

### 2. `scripts/setup-github-secrets.sh`

- Проверка наличия `gh`
- Установка:
  - `TELEGRAM_DEPLOY_BOT_TOKEN`
  - `TELEGRAM_DEPLOY_CHAT_ID`
- Отправка тестового уведомления

---

## 🔐 GitHub Secrets

| Название                    | Значение                                         |
| --------------------------- | ------------------------------------------------ |
| `TELEGRAM_DEPLOY_BOT_TOKEN` | `8248185119:AAEbEPI9VMH9DCjwSJEPzFDJ55P-LFWTTjM` |
| `TELEGRAM_DEPLOY_CHAT_ID`   | `-1002881050960`                                 |

Можно добавить вручную:
GitHub → Settings → Secrets and variables → Actions → New Repository Secret

Или автоматически:

```bash
sh scripts/setup-github-secrets.sh
```

---

## 🧪 Пример уведомлений

### ✅ Успешный деплой:

```
✅ Успешный деплой!
Коммит: abc123
Автор: @username
🔗 Перейти к логам
```

### ❌ Ошибка:

```
❌ Ошибка деплоя!
Коммит: abc123
Автор: @username
🔗 Смотреть ошибки
```

---

## 📌 Telegram-группа для уведомлений:

https://t.me/+gztDCh5qT4g4OWI6

---

## 🧠 Всё, что тебе нужно:

```bash
git push origin main
```

Больше ничего! Всё остальное автоматизировано. 🎯
