
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Включаем глобальные пайпы (валидация запросов)
  app.useGlobalPipes(new ValidationPipe());

  // Глобальный префикс для всех ручек
  app.setGlobalPrefix('api/v1');

  // Swagger-документация
  const config = new DocumentBuilder()
    .setTitle('Tele•Ga API')
    .setDescription('Документация API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Порт по умолчанию или из .env
  const port = process.env.PORT || 3030;
  await app.listen(port);

  // Логи запуска
  logger.log(`🚀 Server is running on http://localhost:${port}`);
  logger.log(`📄 Swagger API: http://localhost:${port}/api`);
}

bootstrap();
