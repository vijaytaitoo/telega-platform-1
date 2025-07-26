import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { TelegramAuthService } from './telegram-auth.service';

@Controller('auth/telegram')
export class TelegramAuthController {
  constructor(private readonly telegramAuthService: TelegramAuthService) {}

  @Post('login')
  async login(
    @Body()
    loginData: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
      auth_date: number;
      hash: string;
    },
  ) {
    try {
      const isValid = this.telegramAuthService.validateTelegramLogin(loginData);
      if (!isValid) {
        throw new UnauthorizedException('Invalid Telegram authentication data');
      }

      const token = await this.telegramAuthService.generateToken({
        id: loginData.id,
        first_name: loginData.first_name,
        last_name: loginData.last_name,
        username: loginData.username,
        photo_url: loginData.photo_url,
      });

      return { token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('validate-web-app')
  async validateWebApp(@Body() data: { initData: string }) {
    try {
      const isValid = await this.telegramAuthService.validateWebAppInitData(
        data.initData,
      );
      if (!isValid) {
        throw new UnauthorizedException('Invalid WebApp init data');
      }
      return { valid: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
