import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { TelegramModule } from './telegram.module';
import helmet from 'helmet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_GUARD } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(TelegramModule);

  // Безопасность
  app.use(helmet());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
  });

  // Валидация и rate limiting
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // Swagger документация
  const options = new DocumentBuilder()
    .setTitle('Telegram Service API')
    .setDescription(
      'API для управления Telegram ботами и взаимодействия с пользователями',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3002);
}

bootstrap();
