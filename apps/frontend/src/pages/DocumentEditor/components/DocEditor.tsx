import { useEffect, useRef } from 'react';
import Quill from 'quill';
import { CollaborativeEditor } from './CollaborativeEditor';
import 'quill/dist/quill.snow.css';

interface DocEditorProps {
  onContentChange?: (content: string) => void;
  initialContent?: string;
  documentId?: string;
  collaborative?: boolean;
  onStatusChange?: (status: 'connecting' | 'connected' | 'disconnected') => void;
  onUserCountChange?: (count: number) => void;
}

export const DocEditor = ({
  onContentChange,
  initialContent = '',
  documentId = 'default-doc',
  collaborative = true,
  onStatusChange,
  onUserCountChange,
}: DocEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  // 所有 Hooks 必须在顶层调用
  useEffect(() => {
    // 只有在非协同模式下才初始化 Quill
    if (!collaborative && editorRef.current && !quillRef.current) {
      // 初始化 Quill 编辑器
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: '开始编写你的文档...',
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

      // 设置初始内容
      if (initialContent) {
        quillRef.current.root.innerHTML = initialContent;
      }

      // 监听内容变化
      quillRef.current.on('text-change', () => {
        if (quillRef.current && onContentChange) {
          const content = quillRef.current.root.innerHTML;
          onContentChange(content);
        }
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
      }
    };
  }, [collaborative, initialContent, onContentChange]);

  // 如果启用协同编辑，使用协同编辑器
  if (collaborative) {
    return (
      <CollaborativeEditor
        documentId={documentId}
        onContentChange={onContentChange}
        onStatusChange={onStatusChange}
        onUserCountChange={onUserCountChange}
      />
    );
  }

  // 单机编辑器 UI
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