import { Injectable } from '@nestjs/common';

@Injectable()
export class WhiteboardService {
  private whiteboards = [
    { id: '1', title: 'Whiteboard 1', elements: [] },
    { id: '2', title: 'Whiteboard 2', elements: [] },
  ];

  getAllWhiteboards() {
    return this.whiteboards;
  }

  createWhiteboard(data: any) {
    const newBoard = {
      id: Date.now().toString(),
      title: data.title || 'New Whiteboard',
      elements: [],
    };
    this.whiteboards.push(newBoard);
    return newBoard;
  }
}
