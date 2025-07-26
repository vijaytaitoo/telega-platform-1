# 🔧 Troubleshooting Guide

## 📋 Общие проблемы и решения

### 1. Ошибки зависимостей

#### Chakra UI ошибки
```bash
# Ошибка: Cannot find module '@chakra-ui/react'
# Решение: Установить недостающие зависимости
cd frontend
pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### NestJS версии конфликты
```bash
# Ошибка: TS2345 Argument of type 'INestApplication<any>' is not assignable
# Решение: Обновить все NestJS пакеты до совместимых версий
cd backend/gateway
pnpm add @nestjs/common@11.1.5 @nestjs/core@11.1.5 @nestjs/platform-express@11.1.5 @nestjs/typeorm@11.0.0 @nestjs/swagger@7.4.2 @nestjs/jwt@11.0.0 @nestjs/passport@11.0.5 typeorm@0.3.25 telegraf@4.16.3
pnpm add -D @nestjs/cli@11.0.7
```

### 2. Проблемы с запуском

#### Команда nest не найдена
```bash
# Ошибка: sh: nest: command not found
# Решение: Установить @nestjs/cli
cd backend/gateway
pnpm add -D @nestjs/cli@11.0.7
```

#### Проблемы с TypeORM
```bash
# Ошибка: UnknownDependenciesException TypeOrmCoreModule
# Решение: Очистить кэш и переустановить зависимости
rm -rf node_modules
pnpm install
```

### 3. Проблемы с Telegram OAuth2

#### Ошибки в Telegram контроллере
```typescript
// Ошибка: Property 'findOrCreateTelegramUser' does not exist
// Решение: Добавить методы в AuthService

async findOrCreateTelegramUser(telegramUser: TelegramUserData): Promise<any> {
  // Логика поиска/создания пользователя
  return {
    id: telegramUser.id,
    telegramId: telegramUser.id,
    username: telegramUser.username || `user_${telegramUser.id}`,
    firstName: telegramUser.first_name,
    lastName: telegramUser.last_name,
    photoUrl: telegramUser.photo_url,
    roles: ['user'],
  };
}

async generateTokens(user: any) {
  const payload = {
    username: user.username,
    sub: user.id,
    roles: user.roles,
    telegramId: user.telegramId,
  };
  
  return {
    accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
    refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
  };
}
```

## 🚀 Исправления для продакшена

### 1. Обновление зависимостей

```bash
# Обновить все пакеты до последних версий
pnpm outdated
pnpm up --latest

# Проверить совместимость
pnpm audit
```

### 2. Исправление TypeScript ошибок

```bash
# Проверить все TypeScript ошибки
pnpm run lint

# Автоматическое исправление
pnpm run lint --fix
```

### 3. Очистка кэша

```bash
# Очистить кэш pnpm
pnpm store prune

# Очистить node_modules
rm -rf node_modules
pnpm install
```

## 🔍 Диагностика проблем

### 1. Проверка статуса сервисов

```bash
# Проверить запущенные процессы
ps aux | grep nest
ps aux | grep node

# Проверить порты
lsof -i :3030
lsof -i :5173
lsof -i :3000
```

### 2. Проверка логов

```bash
# Логи Gateway
cd backend/gateway
pnpm run start:dev

# Логи Frontend
cd frontend
pnpm run dev
```

### 3. Проверка подключений

```bash
# Проверить API
curl http://localhost:3030/health

# Проверить Frontend
curl http://localhost:5173

# Проверить Studio
curl http://localhost:3000
```

## 🛠️ Полезные команды

### Очистка проекта
```bash
# Очистить все временные файлы
pnpm run clean

# Очистить кэш
pnpm store prune

# Переустановить зависимости
rm -rf node_modules
pnpm install
```

### Перезапуск сервисов
```bash
# Остановить все процессы
pkill -f "nest start"
pkill -f "vite"
pkill -f "next"

# Запустить заново
pnpm run dev
```

### Проверка конфигурации
```bash
# Проверить TypeScript конфигурацию
npx tsc --noEmit

# Проверить ESLint
npx eslint . --ext .ts,.tsx

# Проверить Prettier
npx prettier --check .
```

## 📞 Получение помощи

### Логи для отладки
```bash
# Собрать полные логи
pnpm run dev 2>&1 | tee debug.log

# Логи с временными метками
pnpm run dev 2>&1 | while read line; do echo "$(date '+%H:%M:%S') $line"; done
```

### Создание issue
При создании issue включите:
1. Версию Node.js: `node --version`
2. Версию pnpm: `pnpm --version`
3. Операционную систему
4. Полные логи ошибки
5. Шаги для воспроизведения

### Полезные ссылки
- **Документация**: https://docs.telega.uz
- **Telegram поддержка**: @TeleGaSupportBot
- **GitHub Issues**: https://github.com/your-username/telega-platform-1/issues 