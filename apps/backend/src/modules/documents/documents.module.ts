import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
  controllers: [DocumentsController], // 这个模块的控制器
  providers: [DocumentsService], // 这个模块的服务
  exports: [DocumentsService], // 导出服务，让其他模块可以使用
})
export class DocumentsModule {
  // 这是文档功能的"小管理员"
  // 只管理文档相关的控制器和服务
}
