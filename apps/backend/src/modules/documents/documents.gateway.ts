import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import * as Y from 'yjs';

@WebSocketGateway({ 
  port: 3001,
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  }
})
export class DocumentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private docs = new Map<string, Y.Doc>();
  private rooms = new Map<string, Set<WebSocket>>();
  private connections = new Map<WebSocket, { docName: string; doc: Y.Doc }>();

  handleConnection(client: WebSocket, request: any) {
    console.log('WebSocket client connected');
    
    // 从 URL 获取房间名
    const url = new URL(request.url || '/?room=default', `http://${request.headers.host}`);
    const docName = url.searchParams.get('room') || 'default';
    
    // 获取或创建文档
    if (!this.docs.has(docName)) {
      this.docs.set(docName, new Y.Doc());
    }
    
    const doc = this.docs.get(docName)!;
    
    // 存储连接信息
    this.connections.set(client, { docName, doc });
    
    // 添加到房间
    if (!this.rooms.has(docName)) {
      this.rooms.set(docName, new Set());
    }
    this.rooms.get(docName)!.add(client);
    
    // 处理消息 - 简单的转发机制
    client.on('message', (message: Buffer) => {
      this.handleMessage(client, message, docName);
    });
    
    // 发送当前文档状态（如果有的话）
    const currentState = Y.encodeStateAsUpdate(doc);
    if (currentState.length > 0) {
      client.send(currentState);
    }
    
    console.log(`Client connected to document: ${docName}, total clients: ${this.rooms.get(docName)?.size}`);
  }

  handleDisconnect(client: WebSocket) {
    console.log('WebSocket client disconnected');
    
    const connInfo = this.connections.get(client);
    if (connInfo) {
      const { docName } = connInfo;
      
      // 从房间移除
      if (this.rooms.has(docName)) {
        this.rooms.get(docName)!.delete(client);
        if (this.rooms.get(docName)!.size === 0) {
          this.rooms.delete(docName);
          console.log(`Room ${docName} is now empty`);
        }
      }
      
      // 清理连接信息
      this.connections.delete(client);
      
      console.log(`Client disconnected from document: ${docName}`);
    }
  }

  private handleMessage(sender: WebSocket, message: Buffer, docName: string) {
    try {
      const connInfo = this.connections.get(sender);
      if (!connInfo) return;

      const { doc } = connInfo;
      
      // 应用更新到文档
      Y.applyUpdate(doc, message);
      
      // 广播给房间内的其他客户端
      this.broadcastToRoom(sender, message, docName);
      
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  private broadcastToRoom(sender: WebSocket, message: Buffer, docName: string) {
    const roomClients = this.rooms.get(docName);
    if (roomClients) {
      roomClients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }

  @SubscribeMessage('join-document')
  handleJoinDocument(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() data: { documentId: string }
  ) {
    const { documentId } = data;
    console.log(`Client explicitly joined document: ${documentId}`);
    
    // 发送房间信息
    const stats = this.getRoomStats(documentId);
    client.send(JSON.stringify({
      type: 'room-info',
      data: stats
    }));
  }

  @SubscribeMessage('leave-document')
  handleLeaveDocument(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() data: { documentId: string }
  ) {
    const { documentId } = data;
    console.log(`Client explicitly left document: ${documentId}`);
  }

  // 获取房间统计信息
  getRoomStats(docName: string) {
    return {
      clientCount: this.rooms.get(docName)?.size || 0,
      hasDocument: this.docs.has(docName),
      documentId: docName,
    };
  }

  // 获取所有活动房间
  getAllRooms() {
    const rooms: Array<{ name: string; clientCount: number }> = [];
    this.rooms.forEach((clients, name) => {
      rooms.push({
        name,
        clientCount: clients.size,
      });
    });
    return rooms;
  }
}