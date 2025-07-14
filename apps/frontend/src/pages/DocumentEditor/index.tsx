import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Users } from 'lucide-react';
import { DocEditor } from './components/DocEditor';
import { useState } from 'react';

export const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const handleBack = () => {
    navigate('/workspace');
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    // 这里可以添加保存逻辑
    console.log('保存文档:', content);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 编辑器顶部工具栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回工作台
            </button>
            <div className="border-l border-gray-300 pl-4">
              <h1 className="text-lg font-semibold">
                {id === 'new' ? '新建文档' : `文档 ${id}`}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Users className="w-5 h-5 mr-2" />
              协作者
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              保存
            </button>
          </div>
        </div>
      </header>

      {/* 编辑器主体 */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <DocEditor onContentChange={handleContentChange} initialContent="" />
        </div>
      </main>
    </div>
  );
};
