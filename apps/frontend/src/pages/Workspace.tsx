import { useNavigate } from 'react-router-dom';
import { FileText, PenTool, Plus } from 'lucide-react';

export const Workspace = () => {
  const navigate = useNavigate();

  const handleCreateDocument = () => {
    navigate('/document/new');
  };

  const handleCreateWhiteboard = () => {
    navigate('/whiteboard/new');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">我的工作台</h2>
        <p className="text-gray-600">选择你要创建的内容类型</p>
      </div>

      {/* 创建选项 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div
          onClick={handleCreateDocument}
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">
              协同文档
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            创建一个新的协同文档，支持多人实时编辑
          </p>
          <div className="flex items-center text-blue-600">
            <Plus className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">新建文档</span>
          </div>
        </div>

        <div
          onClick={handleCreateWhiteboard}
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <PenTool className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">
              协同画板
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            创建一个新的协同画板，支持多人实时绘制和设计
          </p>
          <div className="flex items-center text-green-600">
            <Plus className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">新建画板</span>
          </div>
        </div>
      </div>

      {/* 最近使用 */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">最近使用</h3>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 text-center text-gray-500">
            暂无最近使用的文档或画板
          </div>
        </div>
      </div>
    </div>
  );
};
