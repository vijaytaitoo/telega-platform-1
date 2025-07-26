import React, { useState } from 'react';
import { Upload, Download, Plus, FileText, Package, BarChart3 } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'products' | 'analytics' | 'settings'>('products');
  const [csvData, setCsvData] = useState('');

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvData(text);
        // Here you would parse CSV and convert to JSON
        console.log('CSV uploaded:', text);
      };
      reader.readAsText(file);
    }
  };

  const exportData = () => {
    // Mock export functionality
    const data = {
      products: [],
      settings: {},
      analytics: {},
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shop-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full">
      <h2 className="text-lg font-semibold text-white mb-4">Панель управления</h2>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-white/5 rounded-lg p-1">
        {[
          { id: 'products', label: 'Товары', icon: Package },
          { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
          { id: 'settings', label: 'Настройки', icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded transition-colors ${
              activeTab === id
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'products' && (
          <>
            <div className="space-y-3">
              <h3 className="text-white font-medium">Импорт товаров</h3>

              <div className="space-y-2">
                <label className="block">
                  <span className="text-white/80 text-sm">Загрузить CSV файл</span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="mt-1 flex items-center justify-center w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-white mr-2" />
                    <span className="text-white text-sm">Выбрать файл</span>
                  </label>
                </label>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200">
                <Plus className="w-4 h-4" />
                <span>Добавить товар</span>
              </button>

              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-300 mb-2">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-medium">Быстрый импорт</span>
                </div>
                <p className="text-xs text-blue-200/80 mb-2">
                  Формат CSV: название,цена,описание,категория
                </p>
                <button className="w-full text-xs px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded transition-colors">
                  Скачать шаблон
                </button>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <h3 className="text-white font-medium mb-3">Быстрые действия</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-white/80 hover:text-white transition-colors text-sm">
                  📦 Управление категориями ({Math.floor(Math.random() * 5) + 1})
                </button>
                <button className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-white/80 hover:text-white transition-colors text-sm">
                  🏷️ Настройка скидок ({Math.floor(Math.random() * 3) + 1} активных)
                </button>
                <button className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-white/80 hover:text-white transition-colors text-sm">
                  📊 Отчеты по продажам (за месяц)
                </button>
                <button className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-white/80 hover:text-white transition-colors text-sm">
                  🎨 Настройка темы магазина
                </button>
                <button className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-white/80 hover:text-white transition-colors text-sm">
                  📱 Интеграция с Telegram Bot
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <h3 className="text-white font-medium">Статистика</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-white/70 text-xs">Просмотры</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-white/70 text-xs">Продажи</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">0₽</div>
                <div className="text-white/70 text-xs">Доход</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-white/70 text-xs">Клиенты</div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">График продаж</h4>
              <div className="h-20 bg-white/5 rounded flex items-center justify-center">
                <span className="text-white/50 text-sm">Данные появятся после первых продаж</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h3 className="text-white font-medium">Настройки магазина</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-white/80 text-sm mb-1">Название магазина</label>
                <input
                  type="text"
                  placeholder="Мой магазин"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-1">Описание</label>
                <textarea
                  placeholder="Описание вашего магазина"
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-1">Категория</label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/40">
                  <option value="fashion">Мода</option>
                  <option value="electronics">Электроника</option>
                  <option value="freelance">Фриланс</option>
                </select>
              </div>
            </div>

            <button
              onClick={exportData}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Экспорт данных</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
