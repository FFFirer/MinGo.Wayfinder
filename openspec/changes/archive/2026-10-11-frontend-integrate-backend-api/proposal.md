## Why

前端当前使用硬编码的模拟数据，需要对接真实后端 API 以实现数据持久化和完整的 CRUD 功能。同时需要调整后端数据契约（UUID 标识、UTC 时间格式）以符合 RESTful API 最佳实践。

## What Changes

### 后端改造
- **实体标识调整**：为 `KanbanTask` 实体添加 `Guid Uuid` 字段作为唯一资源标识，保留 `int Id` 作为用户友好标识
- **时间格式调整**：将时间字段从 `long` (Unix 时间戳) 改为 `DateTime` UTC，API 响应返回 ISO8601 格式字符串
- **CORS 配置**：在 `appsettings.Development.json` 中添加 `AllowAll` 配置，开发环境允许所有跨域请求

### 前端改造
- **API 服务层**：创建 `web/src/services/` 目录，包含 `httpClient.ts`（HTTP 客户端封装）和 `tasks.ts`（Task 资源 API）
- **环境变量**：添加 `.env.development` 和 `.env.production` 配置 `VITE_API_BASE_URL`
- **类型定义更新**：更新 `web/src/types/kanban.ts`，对齐后端 DTO（UUID + int ID、ISO8601 时间）
- **Store 改造**：`kanbanStore.ts` 从硬编码数据改为调用真实 API
- **时间本地化**：前端将 UTC 时间转换为本地时区显示
- **枚举可视化**：前端将后端返回的枚举字符串做可视化展示（Chip、颜色等）

## Capabilities

### New Capabilities
- `api-integration`: 前端 API 服务层集成，包含 HTTP 客户端封装、环境变量配置、API 调用封装
- `dual-identifier`: 后端实体双标识策略（UUID + int ID），UUID 用于 API 路径，int ID 用于用户显示
- `utc-datetime-contract`: 前后端时间数据契约，后端返回 UTC ISO8601 格式，前端本地化展示

### Modified Capabilities
- `kanban-board`: 看板功能从模拟数据改为调用真实 API，更新类型定义以匹配后端 DTO

## Impact

### 后端代码
- `server/src/MinGo.Wayfinder.Domain/Entities/KanbanTask.cs` - 添加 `Guid Uuid` 字段
- `server/src/MinGo.Wayfinder.Infrastructure/Persistence/Configurations/KanbanTaskConfiguration.cs` - 配置 Uuid 字段
- `server/src/MinGo.Wayfinder.Application/DTOs/TaskDtos.cs` - 更新 DTO 时间类型为 `DateTime`
- `server/src/MinGo.Wayfinder.API/Controllers/TasksController.cs` - 更新 API 路径参数为 `Guid`
- `server/src/MinGo.Wayfinder.API/Program.cs` - 添加 CORS 配置逻辑
- `server/src/MinGo.Wayfinder.API/appsettings.Development.json` - 添加 CORS AllowAll 配置

### 前端代码
- `web/src/services/` - 新建目录，包含 `httpClient.ts` 和 `tasks.ts`
- `web/.env.development` / `web/.env.production` - 环境变量配置
- `web/src/types/kanban.ts` - 更新类型定义
- `web/src/stores/kanbanStore.ts` - 改为调用 API
- `web/src/components/kanban/TaskCard.tsx` - 显示本地化时间
- `web/src/components/kanban/TaskDetailPanel.tsx` - 显示本地化时间

### 数据库迁移
- 需要生成新的 EF Core 迁移，添加 `Uuid` 列到 `KanbanTasks` 表

### API 契约变更
- **BREAKING**: API 路径参数从 `int` 改为 `Guid`（`/api/tasks/{uuid}`）
- **BREAKING**: 时间字段格式从 `long` 改为 ISO8601 字符串
- 响应新增 `uuid` 字段，`id` 字段保留用于显示
