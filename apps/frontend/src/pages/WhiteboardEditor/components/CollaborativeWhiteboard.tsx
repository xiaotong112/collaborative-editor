import { Excalidraw } from '@excalidraw/excalidraw';
import { useEffect, useRef } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import '@excalidraw/excalidraw/index.css';

// 使用 any 临时绕过类型问题
type ExcalidrawElement = any;

interface CollaborativeWhiteboardProps {
  whiteboardId: string;
  onStatusChange?: (
    status: 'connecting' | 'connected' | 'disconnected'
  ) => void;
  onUserCountChange?: (count: number) => void;
  onElementsChange?: (elements: ExcalidrawElement[]) => void;
}

export const CollaborativeWhiteboard = ({
  whiteboardId,
  onStatusChange,
  onUserCountChange,
  onElementsChange,
}: CollaborativeWhiteboardProps) => {
  const excalidrawRef = useRef<any>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);
  const yarraysRef = useRef<Y.Array<any> | null>(null);

  useEffect(() => {
    // 创建 Y.Doc
    ydocRef.current = new Y.Doc();

    // 创建 WebSocket 提供者
    providerRef.current = new WebsocketProvider(
      'ws://localhost:3001',
      whiteboardId,
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

    // 创建共享数组来存储 Excalidraw 元素
    yarraysRef.current = ydocRef.current.getArray('excalidraw-elements');

    // 监听共享数组变化
    const handleYArrayChange = () => {
      if (yarraysRef.current && excalidrawRef.current) {
        const elements = yarraysRef.current.toArray();
        // 更新 Excalidraw 场景
        excalidrawRef.current.updateScene({
          elements: elements,
        });
        onElementsChange?.(elements);
      }
    };

    yarraysRef.current.observe(handleYArrayChange);

    return () => {
      if (yarraysRef.current) {
        yarraysRef.current.unobserve(handleYArrayChange);
      }
      if (providerRef.current) {
        providerRef.current.destroy();
      }
      if (ydocRef.current) {
        ydocRef.current.destroy();
      }
    };
  }, [whiteboardId, onStatusChange, onUserCountChange, onElementsChange]);

  const handleChange = (elements: readonly ExcalidrawElement[]) => {
    // 当本地元素发生变化时，同步到 Y.js
    if (yarraysRef.current) {
      ydocRef.current?.transact(() => {
        yarraysRef.current?.delete(0, yarraysRef.current.length);
        yarraysRef.current?.insert(0, elements as any[]);
      });
    }
    onElementsChange?.(elements as ExcalidrawElement[]);
  };

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
