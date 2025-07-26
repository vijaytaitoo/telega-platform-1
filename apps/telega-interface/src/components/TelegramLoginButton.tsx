import React, { useEffect, useState } from 'react';
import { LogIn, User } from 'lucide-react';
import { TelegramUser } from '../types';

interface TelegramLoginButtonProps {
  onLogin: (user: TelegramUser) => void;
  onLogout: () => void;
  user: TelegramUser | null;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        ready: () => void;
        expand: () => void;
      };
    };
  }
}

export default function TelegramLoginButton({ onLogin, onLogout, user }: TelegramLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      // Check if user data is available
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      if (initDataUnsafe?.user && !user) {
        const telegramUser: TelegramUser = {
          id: initDataUnsafe.user.id,
          first_name: initDataUnsafe.user.first_name,
          last_name: initDataUnsafe.user.last_name,
          username: initDataUnsafe.user.username,
          photo_url: initDataUnsafe.user.photo_url,
          auth_date: Date.now(),
          hash: 'telegram_webapp_hash',
        };
        onLogin(telegramUser);
      }
    }
  }, [onLogin, user]);

  const handleTelegramLogin = async () => {
    setIsLoading(true);

    try {
      // Simulate Telegram login process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: TelegramUser = {
        id: 123456789,
        first_name: 'Tele•Ga',
        last_name: 'User',
        username: 'telega_user',
        photo_url:
          'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        auth_date: Date.now(),
        hash: 'mock_hash_for_demo',
      };

      onLogin(mockUser);
    } catch (error) {
      console.error('Telegram login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white">
          {user.photo_url ? (
            <img src={user.photo_url} alt={user.first_name} className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="hidden sm:block">
            {user.first_name} {user.last_name}
          </span>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md rounded-lg text-white transition-all duration-200"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleTelegramLogin}
      disabled={isLoading}
      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogIn className="w-5 h-5" />
      <span>{isLoading ? 'Подключение...' : 'Войти через Telegram'}</span>
    </button>
  );
}
