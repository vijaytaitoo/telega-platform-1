import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  async sendMessage(token: string, chatId: number | string, message: string, buttons?: any) {
    const bot = new Telegraf(token);
    await bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: buttons ? { inline_keyboard: buttons } : undefined,
    });
  }

  async sendPhoto(token: string, chatId: number | string, photo: string, caption?: string, buttons?: any) {
    const bot = new Telegraf(token);
    await bot.telegram.sendPhoto(chatId, photo, {
      caption,
      parse_mode: 'HTML',
      reply_markup: buttons ? { inline_keyboard: buttons } : undefined,
    });
  }
} 