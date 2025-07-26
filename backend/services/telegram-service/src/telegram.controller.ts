import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly configService: ConfigService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('webhook')
  async handleWebhook(
    @Headers('x-telegram-bot-api-secret-token') secretToken: string,
    @Body() update: any,
  ) {
    // Проверяем секретный токен
    const configToken = this.configService.get('TELEGRAM_WEBHOOK_SECRET');
    if (secretToken !== configToken) {
      throw new UnauthorizedException('Invalid secret token');
    }

    // Обрабатываем обновление
    await this.telegramService.handleUpdate(update);

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('message')
  async sendMessage(
    @Body() messageData: { chatId: number; text: string; options?: any },
    @Request() req: any,
  ) {
    await this.telegramService.sendMessage(
      messageData.chatId,
      messageData.text,
      messageData.options,
    );
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getBotStatus(@Request() req: any) {
    const token = this.configService.get('TELEGRAM_BOT_TOKEN');
    const webhookUrl = this.configService.get('TELEGRAM_WEBHOOK_URL');
    return {
      isConfigured: !!token && !!webhookUrl,
      webhookUrl,
      userId: req.user.userId,
    };
  }
}
