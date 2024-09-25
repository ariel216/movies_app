import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api-movies');
  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
