import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('telegram')
export class TelegramProcessor {
  @Process('sendMessage')
  async sendMessage(job: Job<{ chatId: string; text: string }>) {
    const { chatId, text } = job.data;
    console.log(`Отправка сообщения в Telegram: ${chatId} → ${text}`);
    // Тут будет вызов Telegram API
  }
}