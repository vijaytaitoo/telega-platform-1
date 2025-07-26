# 🧪 Тестирование Tele•Ga

## Обзор

Проект Tele•Ga включает комплексную систему тестирования для обеспечения качества кода и функциональности.

## Типы тестов

### 1. Unit Tests (Модульные тесты)

- **Цель**: Тестирование отдельных функций и компонентов
- **Технологии**: Jest, React Testing Library
- **Запуск**: `pnpm test`

### 2. E2E Tests (End-to-End тесты)

- **Цель**: Тестирование полного пользовательского пути
- **Технологии**: Cypress
- **Запуск**: `cd frontend && npx cypress run`

### 3. Integration Tests (Интеграционные тесты)

- **Цель**: Тестирование взаимодействия между модулями
- **Технологии**: Jest, Supertest
- **Запуск**: `pnpm test:integration`

## Тесты локализации

### Поддерживаемые языки

- 🇷🇺 Русский (ru)
- 🇺🇿 Узбекский (uz)
- 🇺🇸 Английский (en)

### Поддерживаемые валюты

- ₽ RUB (Российский рубль)
- UZS (Узбекский сум)
- $ USD (Доллар США)
- € EUR (Евро)

### Примеры тестов

```typescript
// Тест переключения языка
it('switches to Uzbek language', () => {
  cy.get('#language-selector').select('uz');
  cy.contains("Savatga qo'shish").should('be.visible');
});

// Тест отображения цен в UZS
it('displays prices in UZS', () => {
  cy.get('#currency-selector').select('UZS');
  cy.contains('100 000,00 UZS').should('be.visible');
});
```

## Тесты платежей

### Поддерживаемые платежные методы

- 💳 LiqPay (Украина)
- 💳 UzumPay (Узбекистан)
- ⭐ Telegram Stars
- 🪙 TON (The Open Network)
- ₿ Bitcoin
- 💵 Наличные при получении

### Примеры тестов

```typescript
// Тест LiqPay
it('processes LiqPay payment', () => {
  cy.get('#payment-method').select('LiqPay');
  cy.get('#pay-button').click();
  cy.url().should('include', 'liqpay.ua');
});

// Тест наличных
it('handles cash on delivery', () => {
  cy.get('#payment-method').select('cash');
  cy.get('#pay-button').click();
  cy.contains('Оплата при получении подтверждена').should('be.visible');
});
```

## Запуск тестов

### Локально

```bash
# Все тесты
pnpm test

# Только E2E
cd frontend && npx cypress run

# Открыть Cypress UI
cd frontend && npx cypress open
```

### В CI/CD

Тесты автоматически запускаются в GitHub Actions при:

- Push в main/develop
- Pull Request в main

## Структура тестов

```
frontend/
├── cypress/
│   ├── e2e/
│   │   ├── localization.cy.ts
│   │   └── payments.cy.ts
│   ├── support/
│   │   ├── e2e.ts
│   │   └── commands.ts
│   └── cypress.config.ts
└── src/
    ├── __tests__/
    │   └── components/
    └── hooks/
        └── __tests__/
```

## Покрытие тестами

### Цели покрытия

- **Unit Tests**: >80%
- **E2E Tests**: Основные пользовательские сценарии
- **Integration Tests**: Критические пути интеграции

### Отчеты

- HTML отчеты в `coverage/`
- Cypress видео и скриншоты в `cypress/videos/`

## Настройка окружения

### Переменные окружения для тестов

```bash
# .env.test
CYPRESS_BASE_URL=http://localhost:5173
TEST_DATABASE_URL=postgresql://test:test@localhost:5432/telega_test
```

### Моки и стабы

```typescript
// Мок API платежей
cy.intercept('POST', '/api/payments', {
  statusCode: 200,
  body: { success: true },
});
```

## Troubleshooting

### Частые проблемы

1. **Cypress не находит элементы**
   - Проверьте селекторы
   - Убедитесь, что приложение загружено

2. **Тесты падают в CI**
   - Проверьте переменные окружения
   - Увеличьте таймауты

3. **Проблемы с локализацией**
   - Проверьте JSON файлы переводов
   - Убедитесь в корректности ключей

## Дополнительные ресурсы

- [Cypress Documentation](https://docs.cypress.io/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
