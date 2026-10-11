## Context

MinGo.Wayfinder 是一个前后端分离的导航应用。前端 Kanban MVP 已完成（SolidJS + MD3），使用纯前端内存数据管理任务。现在需要搭建后端服务，实现数据持久化。

**当前状态**:
- 前端：已完成，数据结构定义为 `{ id, title, description, status, createdAt, updatedAt }`
- 后端：server/ 目录不存在，需要从零搭建
- 数据库：未配置

**约束**:
- 采用整洁架构（Clean Architecture）+ 领域驱动设计（DDD）
- 使用 SQLite 数据库（开发环境）
- 前端暂不对接，后端独立可用
- 字段完全对齐前端数据结构

## Goals / Non-Goals

**Goals:**
- 搭建完整的 ASP.NET Core 后端架构（Domain/Application/Infrastructure/API 四层）
- 实现 Task 实体的完整 CRUD API
- 使用 SQLite 存储数据，时间字段存为 long（Unix 毫秒）
- 实现软删除机制
- 集成 NSwag 生成 API 文档
- 实现全局异常处理
- 创建独立的 EF Core 迁移项目

**Non-Goals:**
- 不对接前端（前端继续使用内存数据）
- 不实现用户认证/授权
- 不实现文件上传、邮件发送等外部服务
- 不实现复杂的业务逻辑（如任务依赖、权限控制）
- 不实现 PostgreSQL 支持（仅 SQLite）
- 不实现单元测试/集成测试

## Decisions

### 决策 1: 项目结构采用整洁架构四层分层

**选择**: Domain / Application / Infrastructure / API 四层架构

**理由**:
- 符合项目的 AGENTS.md 规范要求
- 职责清晰，便于后续扩展
- 领域层不依赖外部层，业务规则集中管理

**替代方案**:
- 单层项目（快速但不利于扩展）
- 洋葱架构（更复杂，当前需求不需要）

### 决策 2: 实体 ID 使用 int 自增

**选择**: `Id: int` 自增主键

**理由**:
- 简单直观，性能好
- SQLite 原生支持 AUTOINCREMENT
- MVP 阶段不需要分布式 ID

**替代方案**:
- Guid（全局唯一但性能稍差）
- Snowflake ID（复杂，当前不需要）

### 决策 3: 枚举存储为 string

**选择**: `TaskStatus` 枚举存储为 string（"todo", "in_progress", "review", "done"）

**理由**:
- 数据库可读性好，便于调试
- 前端对齐（前端使用 string 字面量）
- EF Core 原生支持枚举 string 转换

**替代方案**:
- 存储为 int（性能好但可读性差）

### 决策 4: 时间字段存储为 long（Unix 毫秒）

**选择**: `CreatedAt` / `UpdatedAt` 存储为 long（UTC Unix 毫秒时间戳）

**理由**:
- SQLite 没有原生的 DateTime 类型
- long 存储性能好，占用空间小
- 便于跨时区处理（统一 UTC）
- EF Core ValueConverter 自动转换

**替代方案**:
- 存储为 ISO 8601 字符串（可读性好但性能稍差）
- 存储为 DateTime（SQLite 会转为字符串，性能差）

### 决策 5: 软删除机制

**选择**: 使用 `IsDeleted: bool` 字段标记删除状态

**理由**:
- 数据可恢复，符合审计需求
- 查询时默认过滤 `IsDeleted = false`
- 实现简单，不影响现有逻辑

**替代方案**:
- 硬删除（简单但数据不可恢复）
- 删除时间戳（记录删除时间但增加复杂度）

### 决策 6: 日志使用内置 SimpleConsole

**选择**: ASP.NET Core 内置日志 + SimpleConsole 单行格式

**理由**:
- 无需引入第三方依赖
- 单行格式适合开发环境查看
- 后续可按需切换到 Serilog

**替代方案**:
- Serilog（功能强大但增加依赖）
- NLog（同上）

### 决策 7: API 文档使用 NSwag

**选择**: NSwag.AspNetCore 生成 OpenAPI 文档和 Swagger UI

**理由**:
- 与 ASP.NET Core 集成良好
- 支持生成客户端代码（未来前端对接用）
- 仅 Development 环境启用，不影响生产

**替代方案**:
- Swashbuckle（功能类似，但 NSwag 更轻量）

### 决策 8: 解决方案使用 .slnx 格式

**选择**: MinGo.Wayfinder.slnx（新的 XML 格式解决方案文件）

**理由**:
- .slnx 是 .sln 的现代化替代，更易读易维护
- 支持更好的工具集成
- 符合最新 .NET 生态趋势

**替代方案**:
- 传统 .sln 格式（兼容性好但格式老旧）

## Risks / Trade-offs

**[风险] SQLite 并发限制** → 当前 MVP 阶段无影响，后续如需高并发可迁移到 PostgreSQL

**[风险] 软删除增加查询复杂度** → 所有查询需加 `IsDeleted = false` 过滤，通过仓储模式封装

**[风险] 时间戳转换可能出错** → 统一使用 UTC，通过 EF Core ValueConverter 自动转换，避免手动处理

**[权衡] 整洁架构增加代码量** → 换取清晰的职责分离和可扩展性

**[权衡] string 枚举性能稍差** → 换取可读性和前端对齐
