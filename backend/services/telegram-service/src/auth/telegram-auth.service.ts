import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, createHmac } from 'crypto';

@Injectable()
export class TelegramAuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateTelegramLogin(data: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
  }): boolean {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const secretKey = createHash('sha256')
      .update(botToken)
      .digest();

    const dataCheckString = Object.entries(data)
      .filter(([key]) => key !== 'hash')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const hmac = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return hmac === data.hash;
  }

  async generateToken(telegramData: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  }) {
    const payload = {
      sub: telegramData.id,
      username: telegramData.username,
      firstName: telegramData.first_name,
      lastName: telegramData.last_name,
      photoUrl: telegramData.photo_url,
    };

    return this.jwtService.sign(payload);
  }

  async validateWebAppInitData(initData: string): Promise<boolean> {
    try {
      const searchParams = new URLSearchParams(initData);
      const hash = searchParams.get('hash');
      searchParams.delete('hash');

      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not set');
      }

      const secretKey = createHash('sha256')
        .update(botToken)
        .digest();

      const dataCheckString = Array.from(searchParams.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

      const hmac = createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

      return hmac === hash;
    } catch (error) {
      return false;
    }
  }
}