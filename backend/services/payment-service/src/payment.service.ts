import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@telega/database';
import { BazuPaymentService } from './providers/bazu-payment.service';
import { TelegramPaymentService } from './providers/telegram-payment.service';
import {
  PaymentDetails,
  PaymentProvider,
  PaymentResult,
  PaymentStatus,
} from './interfaces/payment.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly bazuPaymentService: BazuPaymentService,
    private readonly telegramPaymentService: TelegramPaymentService,
  ) {}

  private getProvider(provider: PaymentProvider) {
    switch (provider) {
      case PaymentProvider.BAZU:
        return this.bazuPaymentService;
      case PaymentProvider.TELEGRAM:
        return this.telegramPaymentService;
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }

  async createPayment(
    provider: PaymentProvider,
    details: PaymentDetails,
  ): Promise<Payment> {
    const paymentProvider = this.getProvider(provider);
    const result = await paymentProvider.createPayment(details);

    const payment = this.paymentRepository.create({
      orderId: details.orderId,
      provider: result.provider,
      providerPaymentId: result.providerPaymentId,
      amount: result.amount,
      currency: result.currency,
      status: result.status,
      error: result.error,
      metadata: details.metadata,
    });

    return this.paymentRepository.save(payment);
  }

  async processWebhook(
    provider: PaymentProvider,
    payload: any,
  ): Promise<Payment> {
    const paymentProvider = this.getProvider(provider);
    const result = await paymentProvider.processWebhook(payload);

    const payment = await this.paymentRepository.findOne({
      where: { providerPaymentId: result.providerPaymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = result.status;
    payment.error = result.error;
    payment.updatedAt = new Date();

    return this.paymentRepository.save(payment);
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const paymentProvider = this.getProvider(
      payment.provider as PaymentProvider,
    );
    const status = await paymentProvider.getPaymentStatus(
      payment.providerPaymentId,
    );

    if (status !== payment.status) {
      payment.status = status;
      payment.updatedAt = new Date();
      await this.paymentRepository.save(payment);
    }

    return status;
  }

  async refundPayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const paymentProvider = this.getProvider(
      payment.provider as PaymentProvider,
    );
    const result = await paymentProvider.refundPayment(
      payment.providerPaymentId,
    );

    payment.status = result.status;
    payment.error = result.error;
    payment.updatedAt = new Date();

    return this.paymentRepository.save(payment);
  }

  async getPaymentById(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async getPaymentsByOrderId(orderId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { orderId },
      order: { createdAt: 'DESC' },
    });
  }
}
