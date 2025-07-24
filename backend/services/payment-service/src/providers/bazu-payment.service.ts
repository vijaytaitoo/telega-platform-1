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
export class BazuPaymentService implements IPaymentProvider {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('BAZU_API_KEY');
    if (!apiKey) throw new Error('BAZU_API_KEY is not defined');
    this.apiKey = apiKey;
    this.apiUrl = this.configService.get<string>('BAZU_API_URL', 'https://api.bazucompany.com/v1');
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async createPayment(details: PaymentDetails): Promise<PaymentResult> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/payments`,
        {
          amount: details.amount,
          currency: details.currency,
          description: details.description,
          metadata: {
            orderId: details.orderId,
            ...details.metadata,
          },
        },
        { headers: this.headers },
      );

      return {
        id: uuidv4(),
        status: PaymentStatus.PENDING,
        provider: PaymentProvider.BAZU,
        providerPaymentId: response.data.id,
        amount: details.amount,
        currency: details.currency,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      return {
        id: uuidv4(),
        status: PaymentStatus.FAILED,
        provider: PaymentProvider.BAZU,
        amount: details.amount,
        currency: details.currency,
        error: error.message,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  async processWebhook(payload: any): Promise<PaymentResult> {
    // Verify webhook signature
    // Process payment status update
    return {
      id: uuidv4(),
      status: this.mapBazuStatus(payload.status),
      provider: PaymentProvider.BAZU,
      providerPaymentId: payload.payment_id,
      amount: payload.amount,
      currency: payload.currency,
      createdAt: new Date(payload.created_at),
      updatedAt: new Date(),
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/payments/${paymentId}`,
        { headers: this.headers },
      );
      return this.mapBazuStatus(response.data.status);
    } catch (error) {
      return PaymentStatus.FAILED;
    }
  }

  async refundPayment(paymentId: string): Promise<PaymentResult> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/payments/${paymentId}/refund`,
        {},
        { headers: this.headers },
      );

      return {
        id: uuidv4(),
        status: PaymentStatus.REFUNDED,
        provider: PaymentProvider.BAZU,
        providerPaymentId: paymentId,
        amount: response.data.amount,
        currency: response.data.currency,
        createdAt: new Date(response.data.created_at),
        updatedAt: new Date(),
      };
    } catch (error) {
      return {
        id: uuidv4(),
        status: PaymentStatus.FAILED,
        provider: PaymentProvider.BAZU,
        providerPaymentId: paymentId,
        amount: 0,
        currency: 'USD',
        error: error.message,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  private mapBazuStatus(bazuStatus: string): PaymentStatus {
    const statusMap = {
      'created': PaymentStatus.PENDING,
      'processing': PaymentStatus.PROCESSING,
      'succeeded': PaymentStatus.COMPLETED,
      'failed': PaymentStatus.FAILED,
      'refunded': PaymentStatus.REFUNDED,
    };
    return statusMap[bazuStatus] || PaymentStatus.FAILED;
  }
}