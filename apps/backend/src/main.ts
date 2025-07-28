import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(configService.get('PORT') ?? 3000, () => {
    console.log(
      `🚀 Server running on http://localhost:${configService.get<number>('PORT') ?? 3000}`
    );
  });
}
bootstrap();
