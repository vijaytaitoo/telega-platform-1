'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            username?: string;
            auth_date: number;
          };
          language_code?: string;
        };
      };
    };
  }
}

export interface TelegramLoginButtonProps {
  onSuccess?: (token: string) => void;
  className?: string;
}

export function TelegramLoginButton({ onSuccess, className }: TelegramLoginButtonProps) {
  const handleLogin = React.useCallback(async () => {
    try {
      if (!window.Telegram?.WebApp?.initData) {
        throw new Error('Telegram WebApp is not initialized');
      }

      const response = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initData,
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const { token } = await response.json();
      localStorage.setItem('jwt', token);

      if (onSuccess) {
        onSuccess(token);
      } else {
        window.location.href = '/studio';
      }
    } catch (error) {
      console.error('Login error:', error);
      // Здесь можно добавить обработку ошибок, например показ уведомления
    }
  }, [onSuccess]);

  return (
    <Button onClick={handleLogin} variant="telegram" className={className}>
      Войти через Telegram
    </Button>
  );
}
