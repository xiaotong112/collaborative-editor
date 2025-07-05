import { Controller, Get, Post, Body } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents') // 处理 http://localhost:3000/api/documents
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get() // GET /api/documents - 获取文档列表
  async getDocuments() {
    const docs = this.documentsService.getAllDocuments();
    return { success: true, data: docs };
  }

  @Post() // POST /api/documents - 创建新文档
  async createDocument(@Body() body: any) {
    const newDoc = this.documentsService.createDocument(body);
    return { success: true, data: newDoc };
  }
}
