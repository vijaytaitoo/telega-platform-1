import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TelegramUserData } from '../utils/validate-telegram';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Здесь должна быть ваша логика проверки пользователя
    if (username === 'admin' && password === 'admin') {
      return { userId: 1, username: 'admin', roles: ['admin'] };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOrCreateTelegramUser(telegramUser: TelegramUserData): Promise<any> {
    // Здесь должна быть логика поиска или создания пользователя в БД
    // Пока возвращаем мок данные
    return {
      id: telegramUser.id,
      telegramId: telegramUser.id,
      username: telegramUser.username || `user_${telegramUser.id}`,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      photoUrl: telegramUser.photo_url,
      roles: ['user'],
    };
  }

  async generateTokens(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
      telegramId: user.telegramId,
    };
    
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
