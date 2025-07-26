import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@telega/database';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { BazuPaymentService } from './providers/bazu-payment.service';
import { TelegramPaymentService } from './providers/telegram-payment.service';
import { PaymentWebhookService } from './webhook.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    BazuPaymentService,
    TelegramPaymentService,
    PaymentWebhookService,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
