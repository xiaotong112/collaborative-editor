import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface DocEditorProps {
  onContentChange?: (content: string) => void;
  initialContent?: string;
}

export const DocEditor = ({
  onContentChange,
  initialContent = '',
}: DocEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
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
  }, [initialContent, onContentChange]);

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
