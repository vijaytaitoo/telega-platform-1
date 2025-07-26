#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Функция для добавления React импорта в JSX файлы
function addReactImport(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Если файл уже содержит React импорт, пропускаем
    if (content.includes("import React") || content.includes("import * as React")) {
      return false;
    }
    
    // Если файл содержит JSX, добавляем React импорт
    if (content.includes('jsx') || content.includes('JSX') || content.includes('<')) {
      const lines = content.split('\n');
      const importIndex = lines.findIndex(line => line.startsWith('import'));
      
      if (importIndex === -1) {
        // Если нет импортов, добавляем в начало
        lines.unshift("import React from 'react';");
      } else {
        // Добавляем после существующих импортов
        lines.splice(importIndex + 1, 0, "import React from 'react';");
      }
      
      fs.writeFileSync(filePath, lines.join('\n'));
      console.log(`✅ Добавлен React импорт в ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Ошибка при обработке ${filePath}:`, error.message);
  }
  return false;
}

// Функция для исправления CSS файлов
function fixCSSFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Проверяем, начинается ли файл с @tailwind
    if (!content.trim().startsWith('@tailwind')) {
      const fixedContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

${content}`;
      
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Исправлен CSS файл ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Ошибка при обработке CSS ${filePath}:`, error.message);
  }
  return false;
}

// Функция для рекурсивного обхода директорий
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(filePath);
    } else if (stat.isFile()) {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        addReactImport(filePath);
      } else if (file.endsWith('.css') && file.includes('index.css')) {
        fixCSSFile(filePath);
      }
    }
  });
}

// Основная функция
function main() {
  console.log('🔧 Исправление ошибок линтера...');
  
  const directories = [
    'apps/telega-interface/src',
    'apps/telega-studio/src',
    'frontend/src',
    'backend/gateway/src',
    'backend/services'
  ];
  
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`📁 Обработка директории: ${dir}`);
      processDirectory(dir);
    }
  });
  
  console.log('✅ Исправление завершено!');
}

if (require.main === module) {
  main();
}

module.exports = { addReactImport, fixCSSFile, processDirectory }; 