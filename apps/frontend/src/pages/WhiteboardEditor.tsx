import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Users, Square, Circle, Minus } from 'lucide-react';

export const WhiteboardEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/workspace');
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
                {id === 'new' ? '新建画板' : `画板 ${id}`}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Users className="w-5 h-5 mr-2" />
              协作者
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
              <Save className="w-4 h-4 mr-2" />
              保存
            </button>
          </div>
        </div>
      </header>

      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded">
            <Square className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded">
            <Circle className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded">
            <Minus className="w-5 h-5" />
          </button>
          <div className="border-l border-gray-300 pl-4">
            <input
              type="color"
              className="w-8 h-8 rounded border border-gray-300"
              defaultValue="#000000"
            />
          </div>
        </div>
      </div>

      {/* 画板主体 */}
      <main className="flex-1">
        <div className="w-full h-96 bg-gray-50 border border-gray-200 m-6 rounded-lg">
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            画板区域 - 这里将来会是 Canvas 画布
          </div>
        </div>
      </main>
    </div>
  );
};
