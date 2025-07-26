import { Injectable } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import {
  ExtraEditMessageText,
  ExtraReplyMessage,
} from 'telegraf/typings/telegram-types';
import { Message, InputMediaPhoto } from 'telegraf/typings/core/types/typegram';
import { safeCaption, asStr, stripCaption } from './utils/telegram-helpers';

@Injectable()
export class BotService {
  private bot: Telegraf;

  async initialize(token: string) {
    this.bot = new Telegraf(token);
    this.bot.command('whoami', (ctx) => {
      ctx.reply(`🆔 Ваш chat_id: ${ctx.chat?.id}`);
    });
    await this.bot.launch();
  }

  async sendMessage(
    chatId: number,
    text: string,
    options?: ExtraReplyMessage,
  ): Promise<Message.TextMessage> {
    return this.bot.telegram.sendMessage(chatId, text, options);
  }

  async sendPhoto(
    chatId: number,
    photo: string,
    options?: ExtraReplyMessage & { caption?: string },
  ): Promise<Message.PhotoMessage> {
    return this.bot.telegram.sendPhoto(chatId, photo, options);
  }

  async sendMediaGroup(
    chatId: number,
    media: InputMediaPhoto[],
    options?: ExtraReplyMessage,
  ): Promise<Message[]> {
    return this.bot.telegram.sendMediaGroup(chatId, media, options);
  }

  async sendProductPreview(
    chatId: number,
    product: {
      title: string;
      description: string;
      price: number;
      image: string;
    },
    options?: ExtraReplyMessage,
  ): Promise<Message.PhotoMessage> {
    const cleanOptions = stripCaption(options);
    return this.sendPhoto(chatId, product.image, {
      caption: (`📦 ${product.title}\n\n${product.description}\n\n💰 Цена: ${product.price} ₽`) as unknown as string,
      parse_mode: 'HTML',
      ...cleanOptions,
    });
  }

  async editMessageText(
    chatId: number,
    messageId: number,
    text: string,
    options?: ExtraEditMessageText,
  ): Promise<Message.TextMessage | true> {
    return this.bot.telegram.editMessageText(
      chatId,
      messageId,
      undefined,
      text,
      options,
    );
  }

  async answerCallbackQuery(
    callbackQueryId: string,
    options?: { text?: string; show_alert?: boolean },
  ): Promise<true> {
    return this.bot.telegram.answerCbQuery(callbackQueryId, options?.text, {
      show_alert: options?.show_alert,
    });
  }

  async deleteMessage(chatId: number, messageId: number) {
    return this.bot.telegram.deleteMessage(chatId, messageId);
  }

  async getFile(
    fileId: string,
  ): Promise<{ file_id: string; file_size?: number; file_path?: string }> {
    return this.bot.telegram.getFile(fileId);
  }

  async getFileLink(fileId: string) {
    const file = await this.bot.telegram.getFile(fileId);
    return this.bot.telegram.getFileLink(file.file_id);
  }

  async stop() {
    await this.bot.stop();
  }
}
