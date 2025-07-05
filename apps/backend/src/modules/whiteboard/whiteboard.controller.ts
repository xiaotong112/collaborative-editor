import { Controller, Get, Post, Body } from '@nestjs/common';
import { WhiteboardService } from './whiteboard.service';

@Controller('whiteboard') // 处理 http://localhost:3000/api/whiteboard
export class WhiteboardController {
  constructor(private readonly whiteboardService: WhiteboardService) {}

  @Get() // GET /api/whiteboard - 获取画板列表
  async getWhiteboards() {
    const boards = this.whiteboardService.getAllWhiteboards();
    return { success: true, data: boards };
  }

  @Post() // POST /api/whiteboard - 创建新画板
  async createWhiteboard(@Body() body: any) {
    const newBoard = this.whiteboardService.createWhiteboard(body);
    return { success: true, data: newBoard };
  }
}
