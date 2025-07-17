import {
  ArrowLeft,
  Download,
  Save,
  Upload,
  Users,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConnectionStatus } from './components/ConnectionStatus';
import { WhiteboardCanvas } from './components/WhiteboardCanvas';

export const WhiteboardEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting');
  const [userCount, setUserCount] = useState(0);
  const [isCollaborative, setIsCollaborative] = useState(true);

  const handleBack = () => {
    navigate('/workspace');
  };

  const handleExport = () => {
    // 这里可以添加导出逻辑
    console.log('导出白板');
  };

  const handleImport = () => {
    // 这里可以添加导入逻辑
    console.log('导入白板');
  };

  const handleSave = () => {
    // 这里可以添加保存逻辑
    console.log('保存白板');
    if (isCollaborative) {
      console.log('协同模式下内容已自动同步');
    }
  };

  const toggleCollaborativeMode = () => {
    setIsCollaborative(!isCollaborative);
  };

  const whiteboardId =
    id === 'new' ? `whiteboard-${Date.now()}` : id || 'default-whiteboard';

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
                {id === 'new' ? '新建白板' : `白板 ${id}`}
              </h1>
              <p className="text-sm text-gray-500">白板ID: {whiteboardId}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* 协同模式切换 */}
            <button
              onClick={toggleCollaborativeMode}
              className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                isCollaborative
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isCollaborative ? (
                <>
                  <Wifi className="w-4 h-4 mr-2" />
                  协同模式
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 mr-2" />
                  单机模式
                </>
              )}
            </button>

            {/* 连接状态 */}
            {isCollaborative && (
              <ConnectionStatus
                status={connectionStatus}
                userCount={userCount}
              />
            )}

            {/* 协作者按钮 */}
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Users className="w-5 h-5 mr-2" />
              协作者
              {userCount > 0 && (
                <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {userCount}
                </span>
              )}
            </button>

            {/* 导入导出按钮 */}
            <button
              onClick={handleImport}
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <Upload className="w-4 h-4 mr-2" />
              导入
            </button>

            <button
              onClick={handleExport}
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <Download className="w-4 h-4 mr-2" />
              导出
            </button>

            {/* 保存按钮 */}
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {isCollaborative ? '手动保存' : '保存'}
            </button>
          </div>
        </div>
      </header>

      {/* 编辑器主体 */}
      <main className="h-[calc(100vh-73px)]">
        {isCollaborative && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
              <p className="text-sm text-blue-700">
                🎨
                协同绘图模式已启用！多人可以实时编辑此白板，所有更改会自动同步。
                {connectionStatus === 'connected' && (
                  <span className="font-medium">
                    {' '}
                    当前有 {userCount} 人在线编辑。
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        <WhiteboardCanvas
          whiteboardId={whiteboardId}
          collaborative={isCollaborative}
          onStatusChange={setConnectionStatus}
          onUserCountChange={setUserCount}
        />
      </main>
    </div>
  );
};
