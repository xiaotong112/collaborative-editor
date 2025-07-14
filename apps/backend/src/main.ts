import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // 启用 CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📡 WebSocket server running on ws://localhost:3001');
}
bootstrap();