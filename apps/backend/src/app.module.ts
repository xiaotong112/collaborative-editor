import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestMinioModule } from 'nestjs-minio';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { WhiteboardModule } from './modules/whiteboard/whiteboard.module';

@Module({
  // 这里导入所有子模块，告诉NestJS有哪些功能模块
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory(
        configService: ConfigService<{
          MONGODB_HOST: string;
          MONGODB_PORT: number;
          MONGODB_DATABASE: string;
          MONGODB_USERNAME?: string;
          MONGODB_PASSWORD?: string;
        }>
      ) {
        return {
          uri: `mongodb://${configService.get('MONGODB_HOST')}:${configService.get('MONGODB_PORT')}`,
          dbName: configService.get('MONGODB_DATABASE'),
          user: configService.get('MONGODB_USERNAME'),
          pass: configService.get('MONGODB_PASSWORD'),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(
        configService: ConfigService<{
          MYSQL_HOST: string;
          MYSQL_PORT: number;
          MYSQL_USERNAME: string;
          MYSQL_PASSWORD: string;
          MYSQL_DATABASE: string;
        }>
      ) {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    NestMinioModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory(
        configService: ConfigService<{
          MINIO_HOST: string;
          MINIO_PORT: number;
          MINIO_USERNAME: string;
          MINIO_PASSWORD: string;
          MINIO_BUCKET: string;
        }>
      ) {
        return {
          endPoint: configService.get('MINIO_HOST') ?? '8.155.56.55',
          port: configService.get('MINIO_PORT') ?? 9000,
        };
      },
    }),
    AuthModule,
    DocumentsModule,
    WhiteboardModule,
  ],
  providers: [AppService], // 根服务
})
export class AppModule {
  // 这是整个应用的"总管理员"
  // 它知道应用有哪些功能模块
}
