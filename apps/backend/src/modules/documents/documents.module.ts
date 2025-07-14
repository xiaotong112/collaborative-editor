import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentsGateway } from './documents.gateway';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsGateway],
  exports: [DocumentsService],
})
export class DocumentsModule {
  // 这是文档功能的"小管理员"
  // 只管理文档相关的控制器和服务
}
