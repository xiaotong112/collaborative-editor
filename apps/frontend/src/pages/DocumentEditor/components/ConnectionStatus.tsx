interface ConnectionStatusProps {
  status: 'connecting' | 'connected' | 'disconnected';
  userCount: number;
}

export const ConnectionStatus = ({ status, userCount }: ConnectionStatusProps) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-500',
          text: '已连接',
        };
      case 'connecting':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-500',
          text: '连接中...',
        };
      case 'disconnected':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-500',
          text: '连接断开',
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-500',
          text: '未知状态',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={`flex items-center ${statusInfo.color}`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${statusInfo.bgColor}`} />
        {statusInfo.text}
      </div>
      {status === 'connected' && userCount > 0 && (
        <div className="text-gray-600">
          {userCount} 人在线
        </div>
      )}
    </div>
  );
};