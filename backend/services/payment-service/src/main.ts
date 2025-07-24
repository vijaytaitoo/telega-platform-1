import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global prefix for all routes
  app.setGlobalPrefix('api/payments');

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Payment service is running on port ${port}`);
}

bootstrap(); 