# 👨‍💻 Руководство разработчика Tele•Ga

## 🚀 Быстрый старт

### Предварительные требования
- **Node.js** 18+ 
- **pnpm** 8+
- **Git** 2.30+
- **Docker** (опционально)

### Установка
```bash
# Клонирование репозитория
git clone https://github.com/your-username/telega-platform-1.git
cd telega-platform-1

# Установка зависимостей
pnpm install

# Генерация .env файлов
pnpm run apply

# Запуск в режиме разработки
pnpm run dev
```

---

## 📁 Структура проекта

### Монорепа (pnpm workspaces)
```
telega-platform-1/
├── apps/                    # Frontend приложения
│   ├── telega-interface/    # Vite + React (магазин)
│   └── telega-studio/       # Next.js (админка)
├── backend/                 # Backend сервисы
│   ├── gateway/             # NestJS API Gateway
│   ├── services/            # Микросервисы
│   └── libs/                # Общие библиотеки
├── frontend/                # Отдельный Vite
├── mass-mailer/             # Сервис рассылки
└── shared/                  # Общие типы
```

### Backend архитектура
- **Gateway** - основной API (порт 3030)
- **Auth Service** - аутентификация (порт 3031)
- **Telegram Service** - боты (порт 3032)
- **Payment Service** - платежи (порт 3033)

---

## 🛠️ Команды разработки

### Основные команды
```bash
# Установка зависимостей
pnpm install

# Запуск всех сервисов
pnpm run dev

# Сборка проекта
pnpm run build

# Линтинг
pnpm run lint

# Форматирование кода
pnpm run prettier

# Тесты
pnpm run test
```

### Отдельные сервисы
```bash
# Backend Gateway
pnpm --filter @telega/gateway run start:dev

# Frontend Interface
pnpm --filter telega-interface run dev

# Frontend Studio
pnpm --filter telega-studio run dev

# Telegram Service
pnpm --filter @telega/telegram-service run start:dev

# Mass Mailer
pnpm --filter mass-mailer run dev
```

---

## 🔧 Настройка окружения

### Environment Variables
Создайте `.env` файлы для каждого сервиса:

#### Backend Gateway (backend/gateway/.env)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/telega

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Telegram
TELEGRAM_BOT_TOKEN=your-bot-token

# Redis
REDIS_URL=redis://localhost:6379

# Server
PORT=3030
NODE_ENV=development
```

#### Frontend Interface (apps/telega-interface/.env)
```env
VITE_API_URL=http://localhost:3030
VITE_TELEGRAM_BOT_USERNAME=your-bot-username
VITE_PORT=5173
```

### База данных
```bash
# Создание базы данных
createdb telega

# Запуск миграций
pnpm run db:mig

# Сброс базы данных
pnpm run db:reset
```

---

## 📝 Стиль кода

### TypeScript
- Строгая типизация
- Использование интерфейсов
- Избегание `any` типа
- Правильные импорты

### React
- Функциональные компоненты
- Hooks для состояния
- TypeScript для типов
- Tailwind CSS для стилей

### NestJS
- Декораторы для метаданных
- Dependency Injection
- Guards для авторизации
- Interceptors для логирования

### Примеры кода

#### TypeScript Interface
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  telegramId?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### React Component
```typescript
import React, { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await onAddToCart(product);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600 mt-1">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">{product.price} ₽</span>
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Добавление...' : 'В корзину'}
        </button>
      </div>
    </div>
  );
};
```

#### NestJS Controller
```typescript
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все товары' })
  @ApiResponse({ status: 200, description: 'Список товаров' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать товар' })
  @ApiResponse({ status: 201, description: 'Товар создан' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}
```

---

## 🧪 Тестирование

### Unit тесты
```bash
# Запуск всех тестов
pnpm run test

# Тесты с покрытием
pnpm run test:cov

# Тесты в watch режиме
pnpm run test:watch
```

### E2E тесты
```bash
# Запуск E2E тестов
pnpm run test:e2e

# E2E тесты с отладкой
pnpm run test:e2e:debug
```

### Пример теста
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = [{ id: 1, name: 'Test Product' }];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});
```

---

## 🔄 Git Workflow

### Ветки
- `main` - продакшен код
- `develop` - разработка
- `feature/*` - новые фичи
- `bugfix/*` - исправления багов
- `hotfix/*` - срочные исправления

### Commit сообщения
Используем [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Новые фичи
git commit -m "feat: add product search functionality"

# Исправления багов
git commit -m "fix: resolve TypeORM connection issue"

# Документация
git commit -m "docs: update API documentation"

# Рефакторинг
git commit -m "refactor: improve error handling"

# Тесты
git commit -m "test: add unit tests for payment service"
```

### Pull Request процесс
1. Создать ветку от `develop`
2. Внести изменения
3. Написать тесты
4. Обновить документацию
5. Создать PR
6. Code review
7. Merge в `develop`

---

## 🐛 Отладка

### Backend отладка
```bash
# Запуск с отладкой
pnpm --filter @telega/gateway run start:debug

# Логи в реальном времени
pnpm --filter @telega/gateway run start:dev | pino-pretty
```

### Frontend отладка
```bash
# React DevTools
# Установить расширение в браузере

# Redux DevTools (если используется)
# Установить расширение в браузере
```

### Database отладка
```bash
# Подключение к PostgreSQL
psql -h localhost -U telega_user -d telega

# Просмотр логов
docker logs telega-postgres
```

---

## 📊 Мониторинг

### Логирование
- Winston для структурированных логов
- Pino для производительности
- Логи в JSON формате

### Метрики
- Prometheus для сбора метрик
- Grafana для визуализации
- Health checks для сервисов

### Алерты
- Telegram бот для уведомлений
- Email уведомления
- Slack интеграция

---

## 🚀 Деплой

### Локальный деплой
```bash
# Сборка Docker образов
docker compose build

# Запуск в продакшен режиме
docker compose -f docker-compose.prod.yml up -d
```

### Продакшен деплой
```bash
# Подключение к серверу
ssh user@telega.uz

# Обновление кода
git pull origin main

# Перезапуск сервисов
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 📚 Полезные ссылки

### Документация
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Telegraf Documentation](https://telegraf.js.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Инструменты
- [Postman](https://www.postman.com/) - API тестирование
- [Insomnia](https://insomnia.rest/) - REST клиент
- [DBeaver](https://dbeaver.io/) - Database GUI
- [Redis Commander](https://github.com/joeferner/redis-commander) - Redis GUI

### Сообщество
- [Telegram Support](https://t.me/TeleGaSupportBot)
- [Community Chat](https://t.me/Tele_GaCommunity)
- [GitHub Issues](https://github.com/your-username/telega-platform-1/issues)

---

## 🆘 Поддержка

### Частые проблемы

**Проблема**: TypeORM не может подключиться к БД
```bash
# Решение: проверить DATABASE_URL
echo $DATABASE_URL
# Должно быть: postgresql://user:password@localhost:5432/telega
```

**Проблема**: NestJS не может найти модули
```bash
# Решение: очистить кеш
rm -rf dist
pnpm run build
```

**Проблема**: React компоненты не обновляются
```bash
# Решение: очистить кеш Vite
rm -rf node_modules/.vite
pnpm run dev
```

### Контакты
- **Backend вопросы**: @backend_team
- **Frontend вопросы**: @frontend_team
- **DevOps вопросы**: @devops_team
- **Общие вопросы**: @TeleGaSupportBot

---

## 🎯 Чеклист для новых разработчиков

- [ ] Установлен Node.js 18+
- [ ] Установлен pnpm
- [ ] Клонирован репозиторий
- [ ] Установлены зависимости
- [ ] Настроены .env файлы
- [ ] Запущен проект локально
- [ ] Прочитана документация
- [ ] Настроен IDE (ESLint, Prettier)
- [ ] Создан первый коммит
- [ ] Присоединился к Telegram чату

**Добро пожаловать в команду Tele•Ga! 🚀** 