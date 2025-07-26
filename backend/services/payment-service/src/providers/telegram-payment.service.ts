import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  IPaymentProvider,
  PaymentDetails,
  PaymentProvider,
  PaymentResult,
  PaymentStatus,
} from '../interfaces/payment.interface';

@Injectable()
export class TelegramPaymentService implements IPaymentProvider {
  private readonly botToken: string;
  private readonly providerToken: string;
  private readonly apiUrl: string = 'https://api.telegram.org/bot';

  constructor(private readonly configService: ConfigService) {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const providerToken = this.configService.get<string>(
      'TELEGRAM_PROVIDER_TOKEN',
    );
    if (!botToken) throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    if (!providerToken)
      throw new Error('TELEGRAM_PROVIDER_TOKEN is not defined');
    this.botToken = botToken;
    this.providerToken = providerToken;
  }

  async createPayment(details: PaymentDetails): Promise<PaymentResult> {
    try {
      const response = await axios.post(
        `${this.apiUrl}${this.botToken}/createInvoiceLink`,
        {
          title: details.description || 'Payment',
          description: `Order #${details.orderId}`,
          payload: details.orderId,
          provider_token: this.providerToken,
          currency: details.currency,
          prices: [
            {
              label: 'Total',
              amount: Math.round(details.amount * 100), // Convert to smallest currency unit
            },
          ],
        },
      );

      return {
        id: uuidv4(),
        status: PaymentStatus.PENDING,
        provider: PaymentProvider.TELEGRAM,
        providerPaymentId: response.data.result,
        amount: details.amount,
        currency: details.currency,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      return {
        id: uuidv4(),
        status: PaymentStatus.FAILED,
        provider: PaymentProvider.TELEGRAM,
        amount: details.amount,
        currency: details.currency,
        error: error.message,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  async processWebhook(payload: any): Promise<PaymentResult> {
    const { successful_payment } = payload;
    if (!successful_payment) {
      throw new Error('Invalid webhook payload');
    }

    return {
      id: uuidv4(),
      status: PaymentStatus.COMPLETED,
      provider: PaymentProvider.TELEGRAM,
      providerPaymentId: successful_payment.provider_payment_charge_id,
      amount: successful_payment.total_amount / 100, // Convert from smallest currency unit
      currency: successful_payment.currency,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    // Telegram doesn't provide API to check payment status
    // Status is only available through webhooks
    return PaymentStatus.PENDING;
  }

  async refundPayment(paymentId: string): Promise<PaymentResult> {
    // Telegram doesn't provide API for refunds
    // Refunds should be handled manually through the payment provider's dashboard
    throw new Error('Refunds are not supported through Telegram Payments API');
  }
}
