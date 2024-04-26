import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Male Fashion REST API')
    .setDescription('Документация')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:4173',
      'http://localhost:5173',
      'http://89.223.30.245',
      'https://male-fashion.ru',
    ],
  });

  await app.listen(PORT, () =>
    console.log(`Сервер запустился на порту ${PORT}`),
  );
}
start();
