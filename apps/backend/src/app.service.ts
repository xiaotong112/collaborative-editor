import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Collaborative Editor!';
  }

  getServerInfo() {
    return {
      name: 'Collaborative Editor Backend',
      version: '1.0.0',
    };
  }
}
