# 🤝 Руководство для контрибьюторов

## 📋 Содержание

- [Введение](#-введение)
- [Быстрый старт](#-быстрый-старт)
- [Структура проекта](#-структура-проекта)
- [Стиль кода](#-стиль-кода)
- [Git Workflow](#-git-workflow)
- [Тестирование](#-тестирование)
- [Деплой](#-деплой)
- [Полезные команды](#-полезные-команды)

## 🎯 Введение

Tele•Ga Platform — это мощная e-commerce платформа на базе Telegram. Мы приветствуем всех, кто хочет внести свой вклад в развитие проекта!

### 🎯 Наши цели

- Создать лучшую Telegram e-commerce платформу
- Обеспечить простоту использования для продавцов и покупателей
- Поддерживать высокое качество кода и документации
- Создать активное сообщество разработчиков

## 🚀 Быстрый старт

### Предварительные требования

```bash
# Системные требования
- Node.js 18+
- pnpm 8+
- Git 2.30+
- Docker (опционально)
- PostgreSQL 14+ (опционально)
- Redis 6+ (опционально)
```

### Установка

```bash
# 1. Клонирование репозитория
git clone https://github.com/your-username/telega-platform-1.git
cd telega-platform-1

# 2. Установка зависимостей
pnpm install

# 3. Генерация .env файлов
node scripts/generate-secrets.js

# 4. Запуск в режиме разработки
pnpm run dev
```

### Проверка установки

```bash
# Проверить, что все сервисы запустились
curl http://localhost:3001/health
curl http://localhost:3002
curl http://localhost:3003
```

## 🏗️ Структура проекта

```
telega-platform-1/
├── apps/                    # Frontend приложения
│   ├── telega-interface/    # Vite + React (магазин)
│   └── telega-studio/       # Next.js (админка)
├── backend/                 # Backend сервисы
│   ├── gateway/             # NestJS API Gateway
│   ├── services/            # Микросервисы
│   └── libs/               # Общие библиотеки
├── frontend/               # Общие frontend компоненты
├── mass-mailer/            # Сервис массовых рассылок
├── shared/                 # Общие типы и интерфейсы
├── docs/                   # Документация
├── scripts/                # Вспомогательные скрипты
├── helm/                   # Kubernetes Helm Charts
└── k8s/                    # Kubernetes манифесты
```

### Архитектура

Проект использует **микросервисную архитектуру** с **монорепозиторием**:

- **Gateway**: API Gateway на NestJS
- **Telegram Service**: Обработка Telegram ботов
- **Auth Service**: Аутентификация и авторизация
- **Payment Service**: Интеграция с платежными системами
- **Frontend Interface**: Пользовательский интерфейс магазина
- **Frontend Studio**: Административная панель

## 📝 Стиль кода

### TypeScript

```typescript
// ✅ Хорошо
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  // логика
};

// ❌ Плохо
const getUser = async (id) => {
  // без типов
};
```

### React компоненты

```typescript
// ✅ Хорошо
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary'
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ❌ Плохо
export const Button = (props) => {
  return <button {...props} />;
};
```

### NestJS сервисы

```typescript
// ✅ Хорошо
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async findById(id: number): Promise<User> {
    this.logger.log(`Finding user with id: ${id}`);
    return this.userRepository.findById(id);
  }
}

// ❌ Плохо
@Injectable()
export class UserService {
  async findById(id) {
    return this.userRepository.findById(id);
  }
}
```

### Именование

```typescript
// ✅ Хорошо
const getUserById = async (userId: number) => {};
const isUserActive = (user: User) => {};
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// ❌ Плохо
const get = async (id: number) => {};
const check = (user: User) => {};
const token = process.env.TOKEN;
```

## 🔄 Git Workflow

### Ветки

```bash
main          # Основная ветка (production)
develop       # Ветка разработки
feature/*     # Новые функции
bugfix/*      # Исправления багов
hotfix/*      # Критические исправления
```

### Создание новой функции

```bash
# 1. Создать ветку
git checkout -b feature/new-payment-method

# 2. Внести изменения
# ... работа над кодом ...

# 3. Добавить изменения
git add .

# 4. Создать коммит
git commit -m "feat: add PayPal payment method

- Add PayPal integration service
- Update payment controller
- Add PayPal configuration to env
- Update documentation"

# 5. Отправить изменения
git push origin feature/new-payment-method

# 6. Создать Pull Request
```

### Коммиты

Используем [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Типы коммитов
feat:     # Новая функция
fix:      # Исправление бага
docs:     # Документация
style:    # Форматирование кода
refactor: # Рефакторинг
test:     # Тесты
chore:    # Обновление зависимостей, конфигурации

# Примеры
feat: add Telegram OAuth2 login
fix: resolve TypeORM connection issue
docs: update deployment guide
style: format code with prettier
refactor: extract payment logic to service
test: add unit tests for user service
chore: update dependencies
```

### Pull Request

При создании PR:

1. **Описание**: Подробно опишите изменения
2. **Тесты**: Убедитесь, что все тесты проходят
3. **Линтинг**: Проверьте код линтером
4. **Документация**: Обновите документацию при необходимости

```markdown
## Описание

Добавлена интеграция с PayPal для обработки платежей.

## Изменения

- [x] Добавлен PayPal Service
- [x] Обновлен Payment Controller
- [x] Добавлены переменные окружения
- [x] Обновлена документация

## Тестирование

- [x] Unit тесты
- [x] Integration тесты
- [x] Manual тестирование

## Скриншоты

[Добавьте скриншоты, если применимо]
```

## 🧪 Тестирование

### Запуск тестов

```bash
# Все тесты
pnpm run test

# Тесты с покрытием
pnpm run test:cov

# E2E тесты
pnpm run test:e2e

# Специфичные тесты
pnpm --filter @telega/gateway test
pnpm --filter @telega/interface test
```

### Написание тестов

```typescript
// Unit тест
describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should find user by id', async () => {
    const user = { id: 1, name: 'John' };
    jest.spyOn(repository, 'findById').mockResolvedValue(user);

    const result = await service.findById(1);

    expect(result).toEqual(user);
    expect(repository.findById).toHaveBeenCalledWith(1);
  });
});
```

### React тесты

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🚀 Деплой

### Локальная разработка

```bash
# Запуск всех сервисов
pnpm run dev

# Запуск только backend
pnpm --filter @telega/gateway start:dev

# Запуск только frontend
pnpm --filter @telega/interface dev
```

### Production деплой

```bash
# Сборка Docker образов
docker build -t telega-gateway ./backend/gateway
docker build -t telega-interface ./apps/telega-interface

# Деплой в Kubernetes
helm upgrade --install telega ./helm -f helm/values.production.yaml
```

### CI/CD

Проект использует GitHub Actions для автоматического деплоя:

1. **Тестирование**: Запускается на каждом PR
2. **Сборка**: Docker образы собираются автоматически
3. **Деплой**: Автоматический деплой в Kubernetes при мерже в main

## 🛠️ Полезные команды

### Разработка

```bash
# Установка зависимостей
pnpm install

# Запуск в режиме разработки
pnpm run dev

# Линтинг
pnpm run lint

# Форматирование кода
pnpm run prettier

# Очистка
pnpm run clean
```

### Docker

```bash
# Сборка образа
docker build -t telega-gateway ./backend/gateway

# Запуск контейнера
docker run -p 3001:3001 telega-gateway

# Docker Compose
docker-compose up -d
```

### Kubernetes

```bash
# Применение секретов
kubectl apply -f k8s/secrets.yaml

# Деплой с Helm
helm upgrade --install telega ./helm

# Просмотр логов
kubectl logs -f deployment/telega-gateway

# Порт-форвардинг
kubectl port-forward svc/telega-gateway 3001:3001
```

### Отладка

```bash
# Проверка подключения к БД
psql $DATABASE_URL -c "SELECT 1;"

# Проверка Redis
redis-cli -u $REDIS_URL ping

# Проверка Telegram Bot
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe"

# Логи сервисов
pnpm --filter @telega/gateway logs
```

## 📚 Дополнительные ресурсы

### Документация

- [README.md](../README.md) - Основная документация
- [docs/DEV_GUIDE.md](DEV_GUIDE.md) - Руководство разработчика
- [docs/ARCHITECTURE.md](ARCHITECTURE.md) - Архитектура проекта
- [docs/ENV_REFERENCE.md](ENV_REFERENCE.md) - Справочник переменных

### Технологии

- [NestJS](https://nestjs.com/) - Backend framework
- [React](https://reactjs.org/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Docker](https://www.docker.com/) - Containerization
- [Kubernetes](https://kubernetes.io/) - Orchestration
- [Helm](https://helm.sh/) - Package manager for Kubernetes

### Сообщество

- [Telegram Channel](https://t.me/Tele_GaCommunity) - Обсуждения
- [GitHub Issues](https://github.com/your-username/telega-platform-1/issues) - Баги и предложения
- [GitHub Discussions](https://github.com/your-username/telega-platform-1/discussions) - Общие вопросы

## 🤝 Поддержка

Если у вас есть вопросы или нужна помощь:

1. **GitHub Issues** - для багов и предложений
2. **GitHub Discussions** - для общих вопросов
3. **Telegram** - для быстрой связи
4. **Email** - для приватных вопросов

### Контакты

- **Telegram**: @TeleGaSupportBot
- **Email**: team@telega.uz
- **GitHub**: [your-username](https://github.com/your-username)

---

**Спасибо за ваш вклад в развитие Tele•Ga Platform! 🚀**
