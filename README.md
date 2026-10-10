# MinGo.Wayfinder

前后端混合架构的导航应用，采用整洁架构、领域驱动设计和 Material Design 3 设计风格。

## 技术栈

### 后端

- **框架**: ASP.NET Core Web API
- **语言**: C#
- **ORM**: Entity Framework Core
- **数据库**: SQLite / PostgreSQL
- **架构**: 整洁架构（Clean Architecture）+ 领域驱动设计（DDD）
- **迁移**: 独立的 EF Core 迁移程序集（按数据库区分）

### 前端

- **框架**: SolidJS
- **UI 组件**: daisyui
- **样式**: TailwindCSS v4
- **设计系统**: Material Design 3
- **渲染模式**: SPA

## 项目结构

```
.
├── AGENTS.md                    # AI Agent 协作指南
├── README.md                    # 项目说明（本文件）
├── docs/                        # 设计文档
│   └── 前端架构设计.md
├── src/
│   ├── Domain/                  # 领域层（核心）
│   │   ├── Entities/           # 领域实体
│   │   ├── ValueObjects/       # 值对象
│   │   ├── Aggregates/         # 聚合根
│   │   ├── Interfaces/         # 领域接口
│   │   └── Enums/              # 枚举
│   ├── Application/            # 应用层
│   │   ├── Interfaces/         # 应用服务接口
│   │   ├── Services/           # 应用服务实现
│   │   ├── DTOs/               # 数据传输对象
│   │   └── Mappings/           # 对象映射
│   ├── Infrastructure/         # 基础设施层
│   │   ├── Persistence/        # 数据持久化
│   │   │   ├── DbContext.cs
│   │   │   ├── Repositories/   # 仓储实现
│   │   │   └── Configurations/ # EF Core 配置
│   │   └── Services/           # 外部服务实现
│   ├── API/                    # Web API 层
│   │   ├── Controllers/        # API 控制器
│   │   ├── Middleware/         # 中间件
│   │   └── Program.cs          # 应用入口
│   ├── Migrations/             # EF Core 迁移程序集（独立）
│   │   ├── AppDb/              # 主数据库迁移
│   │   └── OtherDb/            # 其他数据库迁移（如有）
│   └── Web/                    # SolidJS 前端项目
│       ├── components/         # 前端组件
│       ├── pages/              # 页面
│       ├── services/           # API 调用封装
│       └── App.tsx             # 前端入口
└── tests/                      # 测试项目
    ├── Domain.Tests/
    ├── Application.Tests/
    ├── Infrastructure.Tests/
    └── API.Tests/
```

## 快速开始

### 后端

```bash
cd src/API
dotnet run
```

### 前端

```bash
cd src/Web
npm install
npm run dev
```

### 完整启动

```bash
# 启动后端 API
dotnet run --project src/API

# 在另一个终端启动前端
cd src/Web
npm run dev
```

## 文档索引

- [前端架构设计](./docs/前端架构设计.md) - 前端技术选型和设计理念
- [AGENTS.md](./AGENTS.md) - AI Agent 协作规范
- [OpenSpec 规格管理](./specs/README.md) - Spec 驱动开发（SDD）
  - [功能规格](./specs/) - 最终规格（Source of Truth）
  - [变更提案](./changes/) - 需求变更管理
- [变更日志](./docs/changelog/CHANGELOG.md) - 版本变更记录
