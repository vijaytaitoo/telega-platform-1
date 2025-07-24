import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhookService {
  async setWebhook(token: string, url: string) {
    const telegramUrl = `https://api.telegram.org/bot${token}/setWebhook`;
    const response = await axios.post(telegramUrl, {
      url,
      allowed_updates: ['message', 'callback_query', 'inline_query'],
    });

    return response.data;
  }

  async deleteWebhook(token: string) {
    const telegramUrl = `https://api.telegram.org/bot${token}/deleteWebhook`;
    const response = await axios.post(telegramUrl);

    return response.data;
  }

  async getWebhookInfo(token: string) {
    const telegramUrl = `https://api.telegram.org/bot${token}/getWebhookInfo`;
    const response = await axios.get(telegramUrl);

    return response.data;
  }
} 