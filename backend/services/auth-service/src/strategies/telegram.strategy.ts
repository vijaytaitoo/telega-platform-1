import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';
import { TelegramAuthDto } from '../dto/telegram-auth.dto';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: any): Promise<any> {
    const authData: TelegramAuthDto = req.body;
    return this.authService.validateTelegramAuth(authData);
  }
} 