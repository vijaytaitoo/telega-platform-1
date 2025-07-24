import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TelegramService } from './telegram.service';
import { Update } from 'telegraf/typings/core/types/typegram';

@Processor('telegram')
export class TelegramProcessor {
  private readonly logger = new Logger(TelegramProcessor.name);

  constructor(private readonly telegramService: TelegramService) {}

  @Process('message')
  async handleMessage(job: Job<{ chatId: number; text: string; options?: any }>) {
    this.logger.debug(`Processing message job ${job.id}`);
    const { chatId, text, options } = job.data;
    
    try {
      await this.telegramService.sendMessage(chatId, text, options);
      this.logger.debug(`Message sent successfully to chat ${chatId}`);
    } catch (error) {
      this.logger.error(`Failed to send message to chat ${chatId}: ${error.message}`);
      throw error;
    }
  }

  @Process('update')
  async handleUpdate(job: Job<{ update: Update }>) {
    this.logger.debug(`Processing update job ${job.id}`);
    const { update } = job.data;

    try {
      await this.telegramService.handleUpdate(update);
      this.logger.debug('Update processed successfully');
    } catch (error) {
      this.logger.error(`Failed to process update: ${error.message}`);
      throw error;
    }
  }

  @Process('notification')
  async handleNotification(job: Job<{
    userId: string;
    notification: {
      title: string;
      message: string;
      type: string;
      metadata?: any;
    };
  }>) {
    this.logger.debug(`Processing notification job ${job.id}`);
    const { userId, notification } = job.data;

    try {
      await this.telegramService.sendNotification(userId, notification);
      this.logger.debug(`Notification sent successfully to user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to send notification to user ${userId}: ${error.message}`);
      throw error;
    }
  }
}