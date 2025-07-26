import CryptoJS from 'crypto-js';
import { TelegramUser } from '../types';

export function validateTelegramAuth(data: Record<string, string>, botToken: string): boolean {
  const { hash, ...fields } = data;

  // Create check string
  const checkString = Object.keys(fields)
    .sort()
    .map((key) => `${key}=${fields[key]}`)
    .join('\n');

  // Create secret key
  const secret = CryptoJS.SHA256(botToken);

  // Create HMAC
  const hmac = CryptoJS.HmacSHA256(checkString, secret).toString();

  return hmac === hash;
}

export function createTelegramLoginUrl(botUsername: string, authUrl: string): string {
  const params = new URLSearchParams({
    bot_id: botUsername,
    origin: window.location.origin,
    return_to: authUrl,
    request_access: 'write',
  });

  return `https://oauth.telegram.org/auth?${params.toString()}`;
}

export function parseTelegramAuthData(authData: string): TelegramUser | null {
  try {
    const params = new URLSearchParams(authData);
    const user = params.get('user');

    if (!user) return null;

    const userData = JSON.parse(user);

    return {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      photo_url: userData.photo_url,
      auth_date: parseInt(params.get('auth_date') || '0'),
      hash: params.get('hash') || '',
    };
  } catch (error) {
    console.error('Failed to parse Telegram auth data:', error);
    return null;
  }
}

// Mock function for demo purposes
export function mockTelegramAuth(): Promise<TelegramUser> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 123456789,
        first_name: 'Tele•Ga',
        last_name: 'User',
        username: 'telega_user',
        photo_url:
          'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        auth_date: Date.now(),
        hash: 'mock_hash_for_demo',
      });
    }, 1000);
  });
}
