import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // Устанавливаем глобальный префикс
    app.setGlobalPrefix('api/v1');

    // Включаем CORS
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: '*',
    });

    // Включаем валидацию
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }));

    // Настраиваем Swagger
    const config = new DocumentBuilder()
      .setTitle('Tele•Ga API')
      .setDescription('API документация для платформы Tele•Ga')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Запускаем приложение
    const port = 3031;
    await app.listen(port, '0.0.0.0');
    
    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(`Swagger documentation is available at: http://localhost:${port}/api`);
    logger.log('Try also:');
    logger.log(`- http://127.0.0.1:${port}`);
    logger.log(`- http://127.0.0.1:${port}/api`);
  } catch (error) {
    logger.error('Failed to start application:', error);
    throw error;
  }
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
