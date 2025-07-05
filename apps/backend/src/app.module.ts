import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './modules/documents/documents.module';
import { WhiteboardModule } from './modules/whiteboard/whiteboard.module';

@Module({
  imports: [
    // 这里导入所有子模块，告诉NestJS有哪些功能模块
    DocumentsModule,
    WhiteboardModule,
  ],
  controllers: [AppController], // 根控制器
  providers: [AppService], // 根服务
})
export class AppModule {
  // 这是整个应用的"总管理员"
  // 它知道应用有哪些功能模块
}
