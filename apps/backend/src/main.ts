import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 创建应用，从根模块开始
  app.setGlobalPrefix('api'); // 所有路由前缀加上 /api
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
