#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Конфигурация .env файлов для каждого пакета
const envConfigs = {
  'apps/telega-interface': {
    filename: '.env',
    content: `# Tele•Ga Interface Environment
VITE_API_BASE_URL=http://localhost:3030/api/v1
VITE_TELEGRAM_BOT_NAME=@your_bot_name
VITE_TELEGA_VERSION=1.0.0
VITE_PORT=5173
`
  },
  'apps/telega-studio': {
    filename: '.env.local',
    content: `# Tele•Ga Studio Environment
NEXT_PUBLIC_API_BASE_URL=http://localhost:3030/api/v1
NEXT_PUBLIC_TELEGRAM_BOT_NAME=@your_bot_name
NEXT_PUBLIC_TELEGA_VERSION=1.0.0
NEXT_PUBLIC_PORT=3000
`
  },
  'backend/gateway': {
    filename: '.env',
    content: `# Tele•Ga Gateway Environment
PORT=3030
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/telega
JWT_SECRET=your-super-secret-jwt-key-change-this
STRIPE_SECRET_KEY=sk_test_your_stripe_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_WEBHOOK_URL=https://your-domain.com/webhook
`
  },
  'backend/services/auth-service': {
    filename: '.env',
    content: `# Tele•Ga Auth Service Environment
PORT=3001
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/telega
JWT_SECRET=your-super-secret-jwt-key-change-this
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
`
  },
  'backend/services/payment-service': {
    filename: '.env',
    content: `# Tele•Ga Payment Service Environment
PORT=3002
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_your_stripe_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
`
  },
  'backend/services/telegram-service': {
    filename: '.env',
    content: `# Tele•Ga Telegram Service Environment
PORT=3003
NODE_ENV=development
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
WEB_APP_URL=https://your-webapp-url.com
BOT_NAME=your_bot_name
ADMIN_CHAT_ID=123456789
`
  },
  'mass-mailer': {
    filename: '.env',
    content: `# Tele•Ga Mass Mailer Environment
PORT=3004
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/telega
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
REDIS_URL=redis://localhost:6379
`
  },
  'frontend': {
    filename: '.env',
    content: `# Tele•Ga Frontend Environment
VITE_API_BASE_URL=http://localhost:3030/api/v1
VITE_TELEGRAM_BOT_NAME=@your_bot_name
VITE_TELEGA_VERSION=1.0.0
VITE_PORT=5173
`
  }
};

// Функция для создания .env файла
function createEnvFile(packagePath, config) {
  const fullPath = path.join(process.cwd(), packagePath);
  const envPath = path.join(fullPath, config.filename);
  
  // Проверяем, существует ли директория
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Директория ${packagePath} не существует, пропускаем`);
    return;
  }
  
  // Проверяем, существует ли уже .env файл
  if (fs.existsSync(envPath)) {
    console.log(`⚠️  ${config.filename} уже существует в ${packagePath}, пропускаем`);
    return;
  }
  
  try {
    fs.writeFileSync(envPath, config.content);
    console.log(`✅ Создан ${config.filename} в ${packagePath}`);
  } catch (error) {
    console.error(`❌ Ошибка при создании ${config.filename} в ${packagePath}:`, error.message);
  }
}

// Функция для создания .env.example файлов
function createEnvExampleFiles() {
  console.log('\n📝 Создание .env.example файлов...\n');
  
  Object.entries(envConfigs).forEach(([packagePath, config]) => {
    const fullPath = path.join(process.cwd(), packagePath);
    const examplePath = path.join(fullPath, '.env.example');
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Директория ${packagePath} не существует, пропускаем`);
      return;
    }
    
    try {
      fs.writeFileSync(examplePath, config.content);
      console.log(`✅ Создан .env.example в ${packagePath}`);
    } catch (error) {
      console.error(`❌ Ошибка при создании .env.example в ${packagePath}:`, error.message);
    }
  });
}

// Основная функция
function main() {
  console.log('🚀 Tele•Ga - Генерация .env файлов\n');
  
  // Создаем .env файлы
  console.log('📝 Создание .env файлов...\n');
  Object.entries(envConfigs).forEach(([packagePath, config]) => {
    createEnvFile(packagePath, config);
  });
  
  // Создаем .env.example файлы
  createEnvExampleFiles();
  
  console.log('\n🎉 Генерация завершена!');
  console.log('\n📋 Следующие шаги:');
  console.log('1. Заполните токены и ключи в созданных .env файлах');
  console.log('2. Настройте базу данных PostgreSQL');
  console.log('3. Запустите проект: pnpm run dev');
  console.log('\n⚠️  ВАЖНО: Измените все секретные ключи перед продакшеном!');
}

// Запуск скрипта
if (require.main === module) {
  main();
}

module.exports = { createEnvFile, createEnvExampleFiles, envConfigs }; 