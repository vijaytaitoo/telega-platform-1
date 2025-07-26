import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Product, Order, OrderItem, Shop],
      synchronize: true, // Только для разработки! Отключите в production
    }),
    TypeOrmModule.forFeature([User, Product, Order, OrderItem, Shop]),
    ShopsModule,
    AuthModule,
  ],
  controllers: [PromoController, GrokController, TgstatController],
})
export class AppModule {}
