import { useEffect, useRef } from 'react';
import Quill from 'quill';
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import 'quill/dist/quill.snow.css';

interface CollaborativeEditorProps {
  documentId: string;
  onContentChange?: (content: string) => void;
  onStatusChange?: (status: 'connecting' | 'connected' | 'disconnected') => void;
  onUserCountChange?: (count: number) => void;
}

export const CollaborativeEditor = ({
  documentId,
  onContentChange,
  onStatusChange,
  onUserCountChange,
}: CollaborativeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const bindingRef = useRef<QuillBinding | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    // 创建 Y.Doc
    ydocRef.current = new Y.Doc();
    
    // 创建 WebSocket 提供者
    providerRef.current = new WebsocketProvider(
      'ws://localhost:3001',
      documentId,
      ydocRef.current
    );

    // 监听连接状态
    providerRef.current.on('status', (event: { status: string }) => {
      onStatusChange?.(event.status as any);
    });

    // 监听用户数量变化
    providerRef.current.awareness.on('change', () => {
      const userCount = providerRef.current?.awareness.getStates().size || 0;
      onUserCountChange?.(userCount);
    });

    // 初始化 Quill
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: '开始协同编辑文档...',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    });

    // 创建 Y.Text 类型
    const ytext = ydocRef.current.getText('quill');

    // 绑定 Quill 和 Y.js
    bindingRef.current = new QuillBinding(ytext, quillRef.current, providerRef.current.awareness);

    // 监听内容变化
    const handleTextChange = () => {
      if (quillRef.current && onContentChange) {
        const content = quillRef.current.root.innerHTML;
        onContentChange(content);
      }
    };

    quillRef.current.on('text-change', handleTextChange);

    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
      }
      if (providerRef.current) {
        providerRef.current.destroy();
      }
      if (ydocRef.current) {
        ydocRef.current.destroy();
      }
      if (quillRef.current) {
        quillRef.current.off('text-change', handleTextChange);
      }
    };
  }, [documentId, onContentChange, onStatusChange, onUserCountChange]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg min-h-96">
      <div
        ref={editorRef}
        className="min-h-96"
        style={{
          minHeight: '400px',
          border: 'none',
        }}
      />
    </div>
  );
};