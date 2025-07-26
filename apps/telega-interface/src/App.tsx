import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe, Rocket, ShoppingBag, Settings, Zap, Palette } from 'lucide-react';
import { TelegramUser } from './types';
import TelegramLoginButton from './components/TelegramLoginButton';
import Studio from './pages/Studio';
import Marketbase from './pages/Marketbase';

interface Language {
  code: 'ru' | 'uz' | 'en';
  name: string;
}

interface Texts {
  ru: {
    slogan1: string;
    slogan2: string;
    studio: string;
    marketbase: string;
    theme: string;
    language: string;
    subtitle: string;
    features: string[];
  };
  uz: {
    slogan1: string;
    slogan2: string;
    studio: string;
    marketbase: string;
    theme: string;
    language: string;
    subtitle: string;
    features: string[];
  };
  en: {
    slogan1: string;
    slogan2: string;
    studio: string;
    marketbase: string;
    theme: string;
    language: string;
    subtitle: string;
    features: string[];
  };
}

const texts: Texts = {
  ru: {
    slogan1: 'Экосистема будущего',
    slogan2: 'Для тех, кто думает иначе',
    studio: 'Tele•Ga Studio',
    marketbase: 'MarketBase',
    theme: 'Тема',
    language: 'Язык',
    subtitle: 'Инновации, радикальная простота и эстетика будущего внутри Telegram',
    features: [
      'Интуитивный дизайн',
      'Мгновенная синхронизация',
      'Безграничные возможности',
      'Революционный подход',
    ],
  },
  uz: {
    slogan1: 'Kelajak ekotizimi',
    slogan2: 'Boshqacha fikrlovchilar uchun',
    studio: 'Tele•Ga Studio',
    marketbase: 'MarketBase',
    theme: 'Mavzu',
    language: 'Til',
    subtitle: 'Telegram ichida innovatsiyalar, radikal soddalik va kelajak estetikasi',
    features: [
      'Intuitivny dizayn',
      'Oniy sinxronizatsiya',
      'Cheksiz imkoniyatlar',
      'Inqilobiy yondashuv',
    ],
  },
  en: {
    slogan1: 'Ecosystem of the Future',
    slogan2: 'For those who think differently',
    studio: 'Tele•Ga Studio',
    marketbase: 'MarketBase',
    theme: 'Theme',
    language: 'Language',
    subtitle: 'Innovation, radical simplicity and future aesthetics within Telegram',
    features: [
      'Intuitive Design',
      'Instant Synchronization',
      'Limitless Possibilities',
      'Revolutionary Approach',
    ],
  },
};

const languages: Language[] = [
  { code: 'ru', name: 'Русский' },
  { code: 'uz', name: "O'zbekcha" },
  { code: 'en', name: 'English' },
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'ru' | 'uz' | 'en'>('ru');
  const [currentPage, setCurrentPage] = useState<'home' | 'studio' | 'marketbase'>('home');
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const currentTexts = texts[language];

  // Handle page navigation
  const navigateToStudio = () => setCurrentPage('studio');
  const navigateToMarketbase = () => setCurrentPage('marketbase');
  const navigateToHome = () => setCurrentPage('home');

  // Render current page
  if (currentPage === 'studio') {
    return <Studio />;
  }

  if (currentPage === 'marketbase') {
    return <Marketbase />;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800'
          : 'bg-gradient-to-br from-orange-400 via-purple-500 to-purple-600'
      }`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <button
              onClick={navigateToHome}
              className="text-xl font-bold text-white hover:text-orange-200 transition-colors"
            >
              Tele•Ga
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:block">{currentTexts.language}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors duration-200 ${
                        language === lang.code
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <TelegramLoginButton onLogin={setUser} onLogout={() => setUser(null)} user={user} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse-slow">
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                Tele•Ga
              </span>
            </h1>

            <p className="text-2xl md:text-3xl font-light text-white mb-4 opacity-90">
              {currentTexts.slogan1}
            </p>

            <p className="text-lg md:text-xl text-white/80 mb-8 italic">"{currentTexts.slogan2}"</p>

            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {currentTexts.subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={navigateToStudio}
              className="group w-64 h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Palette className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-lg">{currentTexts.studio}</span>
            </button>

            <button
              onClick={navigateToMarketbase}
              className="group w-64 h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <ShoppingBag className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-lg">{currentTexts.marketbase}</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {currentTexts.features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature}</h3>
                <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/80">Uptime</div>
            </div>
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Support</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 text-sm">© 2025 Tele•Ga. Made with ❤️ for the future.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
