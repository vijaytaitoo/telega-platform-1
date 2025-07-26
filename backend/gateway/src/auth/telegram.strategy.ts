import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { validateTelegramLogin } from '../utils/validate-telegram';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  async validate(req: any): Promise<any> {
    try {
      const user = await validateTelegramLogin(req.body);
      if (!user) {
        throw new UnauthorizedException('Invalid Telegram login data');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Telegram authentication failed');
    }
  }
} 