import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Users, Wifi, WifiOff } from 'lucide-react';
import { DocEditor } from './components/DocEditor';
import { ConnectionStatus } from './components/ConnectionStatus';
import { useState } from 'react';

export const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [userCount, setUserCount] = useState(0);
  const [isCollaborative, setIsCollaborative] = useState(true);

  const handleBack = () => {
    navigate('/workspace');
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    // 这里可以添加保存逻辑
    console.log('保存文档:', content);
    // 在协同模式下，内容是自动同步的，这里可以做一些额外的保存操作
    if (isCollaborative) {
      console.log('协同模式下内容已自动同步');
    }
  };

  const toggleCollaborativeMode = () => {
    setIsCollaborative(!isCollaborative);
  };

  const documentId = id === 'new' ? `doc-${Date.now()}` : id || 'default-doc';

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
              <p className="text-sm text-gray-500">
                文档ID: {documentId}
              </p>
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
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {isCollaborative && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                🚀 协同编辑模式已启用！多人可以实时编辑此文档，所有更改会自动同步。
                {connectionStatus === 'connected' && (
                  <span className="font-medium"> 当前有 {userCount} 人在线编辑。</span>
                )}
              </p>
            </div>
          )}
          
          <DocEditor 
            onContentChange={handleContentChange} 
            initialContent="" 
            documentId={documentId}
            collaborative={isCollaborative}
            onStatusChange={setConnectionStatus}
            onUserCountChange={setUserCount}
          />
        </div>
      </main>
    </div>
  );
};