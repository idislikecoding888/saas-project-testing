import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:5173',
    ],
    credentials: true,
  });

  app.use(
    helmet(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();