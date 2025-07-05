```
apps/backend/src/
├── modules/                        # 功能模块
│   ├── auth/                      # 认证模块
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── refresh-token.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── local-auth.guard.ts
│   │   └── strategies/
│   │       ├── jwt.strategy.ts
│   │       └── local.strategy.ts
│   ├── users/                     # 用户管理
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   ├── workspace/                 # 工作台
│   │   ├── workspace.controller.ts
│   │   ├── workspace.service.ts
│   │   ├── workspace.module.ts
│   │   ├── dto/
│   │   │   ├── create-workspace.dto.ts
│   │   │   └── update-workspace.dto.ts
│   │   └── entities/
│   │       └── workspace.entity.ts
│   ├── documents/                 # 文档管理
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   ├── documents.module.ts
│   │   ├── documents.gateway.ts
│   │   ├── dto/
│   │   │   ├── create-document.dto.ts
│   │   │   ├── update-document.dto.ts
│   │   │   └── document-operation.dto.ts
│   │   └── entities/
│   │       └── document.entity.ts
│   ├── whiteboard/                # 画板管理
│   │   ├── whiteboard.controller.ts
│   │   ├── whiteboard.service.ts
│   │   ├── whiteboard.module.ts
│   │   ├── whiteboard.gateway.ts
│   │   ├── dto/
│   │   │   ├── create-whiteboard.dto.ts
│   │   │   ├── update-whiteboard.dto.ts
│   │   │   └── whiteboard-operation.dto.ts
│   │   └── entities/
│   │       └── whiteboard.entity.ts
│   └── collaboration/             # 协同服务
│       ├── collaboration.service.ts
│       ├── collaboration.module.ts
│       ├── interfaces/
│       │   ├── operation.interface.ts
│       │   └── room.interface.ts
│       └── providers/
│           ├── operation-transform.provider.ts
│           └── room-manager.provider.ts
├── common/                        # 公共模块
│   ├── decorators/
│   │   ├── user.decorator.ts
│   │   └── roles.decorator.ts
│   ├── filters/
│   │   ├── http-exception.filter.ts
│   │   └── ws-exception.filter.ts
│   ├── guards/
│   │   ├── roles.guard.ts
│   │   └── ws-auth.guard.ts
│   ├── interceptors/
│   │   ├── response.interceptor.ts
│   │   └── logging.interceptor.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
│   └── middleware/
│       └── cors.middleware.ts
├── config/                        # 配置文件
│   ├── database.config.ts
│   ├── jwt.config.ts
│   ├── redis.config.ts
│   └── app.config.ts
├── database/                      # 数据库相关
│   ├── migrations/
│   ├── seeds/
│   └── data-source.ts
├── shared/                        # 共享资源
│   ├── enums/
│   │   ├── user-role.enum.ts
│   │   └── document-type.enum.ts
│   ├── interfaces/
│   │   └── response.interface.ts
│   └── types/
│       └── jwt-payload.type.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```
