```
apps/frontend/src/
├── components/                     # 公共组件
│   ├── ui/                        # 基础 UI 组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── index.ts
│   ├── layout/                    # 布局组件
│   │   ├── AppLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── Sidebar.tsx
│   └── common/                    # 通用组件
│       ├── Loading.tsx
│       ├── ErrorBoundary.tsx
│       └── Header.tsx
├── pages/                         # 页面组件
│   ├── auth/                      # 认证相关页面
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ForgotPassword.tsx
│   ├── workspace/                 # 工作台页面
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   └── Recent.tsx
│   ├── editor/                    # 文档编辑器
│   │   ├── DocumentEditor.tsx
│   │   ├── components/
│   │   │   ├── Toolbar.tsx
│   │   │   ├── EditorContent.tsx
│   │   │   └── Collaborators.tsx
│   │   └── hooks/
│   │       └── useDocument.ts
│   └── whiteboard/                # 画板编辑器
│       ├── WhiteboardEditor.tsx
│       ├── components/
│       │   ├── Canvas.tsx
│       │   ├── ToolPanel.tsx
│       │   └── LayerPanel.tsx
│       └── hooks/
│           └── useWhiteboard.ts
├── hooks/                         # 自定义 Hooks
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   └── useWebSocket.ts
├── store/                         # 状态管理
│   ├── authStore.ts
│   ├── workspaceStore.ts
│   └── index.ts
├── services/                      # API 服务
│   ├── auth.service.ts
│   ├── document.service.ts
│   ├── whiteboard.service.ts
│   └── api.ts
├── utils/                         # 工具函数
│   ├── cn.ts
│   ├── constants.ts
│   └── validation.ts
├── types/                         # 类型定义
│   ├── auth.types.ts
│   ├── document.types.ts
│   └── common.types.ts
├── router/                        # 路由配置
│   ├── index.tsx
│   ├── ProtectedRoute.tsx
│   └── routes.ts
├── styles/                        # 样式文件
│   ├── globals.css
│   └── components.css
├── App.tsx
├── main.tsx
└── index.css
```
