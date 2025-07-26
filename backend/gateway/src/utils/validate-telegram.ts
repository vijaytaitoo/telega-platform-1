import crypto from 'crypto';

export interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export function validateTelegramLogin(data: TelegramUserData): TelegramUserData | null {
  try {
    const { hash, ...userData } = data;
    
    // Проверяем, что данные не старше 24 часов
    const authDate = new Date(userData.auth_date * 1000);
    const now = new Date();
    const diffHours = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60);
    
    if (diffHours > 24) {
      console.warn('Telegram login data is too old:', diffHours, 'hours');
      return null;
    }

    // Получаем секретный ключ из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN not configured');
      return null;
    }

    // Создаем секретный ключ из токена бота
    const secret = crypto.createHash('sha256').update(botToken).digest();

    // Сортируем ключи и создаем строку для проверки
    const checkString = Object.keys(userData)
      .sort()
      .map((key) => `${key}=${userData[key as keyof typeof userData]}`)
      .join('\n');

    // Создаем HMAC для проверки
    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
    
    // Сравниваем хеши
    if (hmac !== hash) {
      console.warn('Invalid Telegram login hash');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error validating Telegram login:', error);
    return null;
  }
}

export function generateTelegramLoginUrl(botUsername: string, redirectUrl: string): string {
  const baseUrl = 'https://oauth.telegram.org/auth';
  const params = new URLSearchParams({
    bot_id: botUsername,
    request_access: 'write',
    origin: redirectUrl,
  });
  
  return `${baseUrl}?${params.toString()}`;
}

export function extractTelegramUserFromWebAppData(initData: string): TelegramUserData | null {
  try {
    const params = new URLSearchParams(initData);
    const userData: Partial<TelegramUserData> = {};
    
    // Извлекаем данные пользователя
    userData.id = parseInt(params.get('id') || '0');
    userData.first_name = params.get('first_name') || '';
    userData.last_name = params.get('last_name') || undefined;
    userData.username = params.get('username') || undefined;
    userData.photo_url = params.get('photo_url') || undefined;
    userData.auth_date = parseInt(params.get('auth_date') || '0');
    userData.hash = params.get('hash') || '';
    
    // Проверяем обязательные поля
    if (!userData.id || !userData.first_name || !userData.hash) {
      return null;
    }
    
    return userData as TelegramUserData;
  } catch (error) {
    console.error('Error extracting Telegram user data:', error);
    return null;
  }
} 