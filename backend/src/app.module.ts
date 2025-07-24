import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { BullModule } from '@nestjs/bull';
import { SupabaseModule } from './services/supabase.module';
import { AppController } from './app.controller';
import { ShopsModule } from './shops/shops.module';
import { bullConfig } from './config/bull.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +(process.env.POSTGRES_PORT || 5432),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'secret',
      database: process.env.POSTGRES_DB || 'telega',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
      retryStrategy: (times) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
    }),
    BullModule.forRoot(bullConfig),
    BullModule.registerQueue(
      { name: 'telegram' },
      { name: 'email' }
    ),
    SupabaseModule,
    ShopsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
