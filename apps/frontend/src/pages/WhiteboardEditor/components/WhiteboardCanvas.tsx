import { Excalidraw } from '@excalidraw/excalidraw';
import { CollaborativeWhiteboard } from './CollaborativeWhiteboard';

// 使用 any 临时绕过类型问题，在实际使用中可以更精确地定义类型
type ExcalidrawElement = any;

interface WhiteboardCanvasProps {
  whiteboardId: string;
  collaborative?: boolean;
  onStatusChange?: (
    status: 'connecting' | 'connected' | 'disconnected'
  ) => void;
  onUserCountChange?: (count: number) => void;
  onElementsChange?: (elements: ExcalidrawElement[]) => void;
}

export const WhiteboardCanvas = ({
  whiteboardId,
  collaborative = true,
  onStatusChange,
  onUserCountChange,
  onElementsChange,
}: WhiteboardCanvasProps) => {
  const handleChange = (elements: readonly ExcalidrawElement[]) => {
    // 处理元素变化
    onElementsChange?.(elements as ExcalidrawElement[]);
  };

  // 如果启用协同编辑，使用协同白板
  if (collaborative) {
    return (
      <CollaborativeWhiteboard
        whiteboardId={whiteboardId}
        onStatusChange={onStatusChange}
        onUserCountChange={onUserCountChange}
        onElementsChange={onElementsChange}
      />
    );
  }

  // 单机白板 UI
  return (
    <div className="w-full h-full">
      <Excalidraw
        onChange={handleChange}
        initialData={{
          elements: [],
          appState: {
            viewBackgroundColor: '#ffffff',
          },
        }}
        langCode={'zh-CN'}
        UIOptions={{
          canvasActions: {
            loadScene: true,
            export: {
              saveFileToDisk: true,
            },
            changeViewBackgroundColor: true,
          },
        }}
      />
    </div>
  );
};
