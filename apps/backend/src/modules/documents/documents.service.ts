import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentsService {
  private documents = [
    { id: '1', title: 'Document 1', content: 'Hello World' },
    { id: '2', title: 'Document 2', content: 'Hello NestJS' },
  ];

  getAllDocuments() {
    return this.documents;
  }

  createDocument(data: any) {
    const newDoc = {
      id: Date.now().toString(),
      title: data.title || 'New Document',
      content: data.content || '',
    };
    this.documents.push(newDoc);
    return newDoc;
  }
}
