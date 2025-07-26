import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './shops/shops.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';
import { Shop } from './shops/shop.entity';
import { PromoController } from './promo/promo.controller';
import { GrokController } from './grok/grok.controller';
import { TgstatController } from './tgstat/tgstat.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'telega',
      entities: [User, Product, Order, OrderItem, Shop],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    ShopsModule,
    AuthModule,
  ],
  controllers: [PromoController, GrokController, TgstatController],
})
export class AppModule {}
