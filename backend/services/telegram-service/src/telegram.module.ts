import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@telega/database';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { BotService } from './bot.service';
import { WebhookService } from './webhook.service';
import { NotificationService } from './notification.service';
import { CartService } from './cart.service';
import { OrderService } from './order.service';
import { TelegramProcessor } from './telegram.processor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 минута
          limit: 10, // 10 запросов
        },
      ],
    }),
    BullModule.registerQueue({ name: 'telegram' }),
    AuthModule,
  ],
  controllers: [TelegramController],
  providers: [
    TelegramService,
    BotService,
    WebhookService,
    NotificationService,
    CartService,
    OrderService,
    TelegramProcessor,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [TelegramService],
})
export class TelegramModule {}
