import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PaymentWebhookService {
  private readonly bazuWebhookSecret: string;
  private readonly telegramWebhookSecret: string;

  constructor(private readonly configService: ConfigService) {
    const bazuSecret = this.configService.get<string>('BAZU_WEBHOOK_SECRET');
    const telegramSecret = this.configService.get<string>('TELEGRAM_WEBHOOK_SECRET');

    if (!bazuSecret) {
      throw new Error('BAZU_WEBHOOK_SECRET is not configured');
    }
    if (!telegramSecret) {
      throw new Error('TELEGRAM_WEBHOOK_SECRET is not configured');
    }

    this.bazuWebhookSecret = bazuSecret;
    this.telegramWebhookSecret = telegramSecret;
  }

  verifyBazuWebhookSignature(payload: any, signature: string): boolean {
    const hmac = crypto.createHmac('sha256', this.bazuWebhookSecret);
    const calculatedSignature = hmac
      .update(JSON.stringify(payload))
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(calculatedSignature),
    );
  }

  verifyTelegramWebhookSignature(payload: any, signature: string): boolean {
    // Telegram uses a different signature verification method
    // This is a placeholder - implement according to Telegram's requirements
    return true;
  }

  validateWebhookPayload(payload: any): boolean {
    // Add validation logic for webhook payload structure
    if (!payload || typeof payload !== 'object') {
      return false;
    }

    // Add more specific validation rules based on provider requirements
    return true;
  }
} 