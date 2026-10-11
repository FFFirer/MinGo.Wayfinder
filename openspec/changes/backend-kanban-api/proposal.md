## Why

前端 Kanban MVP 已完成（纯前端内存数据），但缺少后端持久化服务。需要搭建完整的 ASP.NET Core 后端架构，实现任务管理 API，为后续功能扩展奠定基础。

## What Changes

- 搭建整洁架构后端项目（Domain/Application/Infrastructure/API 四层）
- 实现 Task 实体和 TaskStatus 枚举（string 存储）
- 使用 SQLite 数据库，时间字段存为 long（Unix 毫秒）
- 实现软删除机制（IsDeleted 字段）
- 提供 RESTful API：GET/POST/PUT/DELETE /api/tasks
- 集成 NSwag 生成 API 文档（仅 Development 环境）
- 实现全局异常处理中间件
- 配置内置日志（SimpleConsole 单行格式）
- 创建独立的 EF Core 迁移项目

## Capabilities

### New Capabilities

- `task-crud`: Kanban 任务的增删改查 API，包含列表查询、详情获取、创建、更新、软删除
- `soft-delete`: 软删除机制，支持标记删除而非物理删除，查询时默认过滤已删除记录

### Modified Capabilities

（无现有 capability 需要修改）

## Impact

- **新增项目**: 4 个 .NET 项目（Domain, Application, Infrastructure, API）+ 1 个迁移项目
- **解决方案**: 创建 MinGo.Wayfinder.slnx 组织所有项目
- **数据库**: 新增 SQLite 数据库文件（开发环境）
- **API**: 新增 /api/tasks 端点组
- **依赖**: 引入 EF Core SQLite、NSwag.AspNetCore
- **目录结构**: 新增 server/ 目录，包含完整后端代码
