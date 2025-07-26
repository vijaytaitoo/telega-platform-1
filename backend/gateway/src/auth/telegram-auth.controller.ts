import { Controller, Post, Body, UseGuards, Get, Query, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { TelegramStrategy } from './telegram.strategy';
import { AuthService } from './auth.service';
import { generateTelegramLoginUrl, extractTelegramUserFromWebAppData } from '../utils/validate-telegram';

@ApiTags('telegram-auth')
@Controller('auth/telegram')
export class TelegramAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly telegramStrategy: TelegramStrategy,
  ) {}

  @Get('login-url')
  @ApiOperation({ summary: 'Generate Telegram OAuth login URL' })
  @ApiResponse({ 
    status: 200, 
    description: 'Telegram login URL generated successfully',
    schema: {
      type: 'object',
      properties: {
        loginUrl: { type: 'string' },
        botUsername: { type: 'string' },
      },
    },
  })
  async getLoginUrl(@Query('redirect') redirectUrl: string = 'https://shop.telega.uz') {
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'your_bot_username';
    const loginUrl = generateTelegramLoginUrl(botUsername, redirectUrl);
    
    return {
      loginUrl,
      botUsername,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user via Telegram OAuth' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        initData: { type: 'string', description: 'Telegram WebApp initData' },
      },
      required: ['initData'],
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User authenticated successfully',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            telegramId: { type: 'number' },
            username: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            photoUrl: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid Telegram login data' })
  async telegramLogin(@Body() body: { initData: string }) {
    try {
      // Извлекаем данные пользователя из initData
      const telegramUser = extractTelegramUserFromWebAppData(body.initData);
      if (!telegramUser) {
        throw new Error('Invalid Telegram initData');
      }

      // Создаем или обновляем пользователя в базе данных
      const user = await this.authService.findOrCreateTelegramUser(telegramUser);

      // Генерируем JWT токены
      const tokens = await this.authService.generateTokens(user);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user.id,
          telegramId: user.telegramId,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.photoUrl,
        },
      };
    } catch (error) {
      throw new Error('Telegram authentication failed');
    }
  }

  @Post('callback')
  @ApiOperation({ summary: 'Handle Telegram OAuth callback' })
  @ApiResponse({ status: 200, description: 'OAuth callback handled successfully' })
  async handleCallback(@Body() body: any, @Res() res: Response) {
    try {
      // Обрабатываем callback от Telegram OAuth
      const user = await this.telegramStrategy.validate({ body });
      
      // Создаем или обновляем пользователя
      const dbUser = await this.authService.findOrCreateTelegramUser(user);
      
      // Генерируем токены
      const tokens = await this.authService.generateTokens(dbUser);
      
      // Перенаправляем на фронтенд с токенами
      const redirectUrl = new URL('https://shop.telega.uz/auth/callback');
      redirectUrl.searchParams.set('access_token', tokens.accessToken);
      redirectUrl.searchParams.set('refresh_token', tokens.refreshToken);
      
      res.redirect(redirectUrl.toString());
    } catch (error) {
      // В случае ошибки перенаправляем на страницу ошибки
      res.redirect('https://shop.telega.uz/auth/error');
    }
  }

  @Post('webapp-login')
  @ApiOperation({ summary: 'Login via Telegram WebApp' })
  @ApiResponse({ status: 200, description: 'WebApp login successful' })
  async webappLogin(@Body() body: { initData: string }) {
    try {
      const telegramUser = extractTelegramUserFromWebAppData(body.initData);
      if (!telegramUser) {
        throw new Error('Invalid WebApp initData');
      }

      const user = await this.authService.findOrCreateTelegramUser(telegramUser);
      const tokens = await this.authService.generateTokens(user);

      return {
        success: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user.id,
          telegramId: user.telegramId,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.photoUrl,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'WebApp authentication failed',
      };
    }
  }

  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Verify Telegram user session' })
  @ApiResponse({ status: 200, description: 'Session verified successfully' })
  async verifySession(@Body() body: any) {
    // Проверяем текущую сессию пользователя
    return {
      success: true,
      user: body.user,
    };
  }
} 