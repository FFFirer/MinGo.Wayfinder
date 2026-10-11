## ADDED Requirements

### Requirement: 实体包含 UUID 和 int ID 双标识
`KanbanTask` 实体 SHALL 同时包含 `Guid Uuid` 和 `int Id` 两个标识字段。

#### Scenario: UUID 字段定义
- **WHEN** 创建 `KanbanTask` 实体
- **THEN** 实体包含 `Guid Uuid` 字段，在构造函数中调用 `Guid.NewGuid()` 生成

#### Scenario: int ID 字段定义
- **WHEN** 创建 `KanbanTask` 实体
- **THEN** 实体包含 `int Id` 字段，由数据库自增生成

#### Scenario: UUID 唯一约束
- **WHEN** 将 `KanbanTask` 保存到数据库
- **THEN** 数据库对 `Uuid` 字段施加唯一约束，保证全局唯一性

### Requirement: API 路径使用 UUID 参数
API 端点 SHALL 使用 `Guid` 类型的 UUID 作为路径参数。

#### Scenario: GET 单个任务
- **WHEN** 请求 `GET /api/tasks/{uuid}`
- **THEN** Controller 接收 `Guid uuid` 参数，根据 UUID 查询任务

#### Scenario: PUT 更新任务
- **WHEN** 请求 `PUT /api/tasks/{uuid}`
- **THEN** Controller 接收 `Guid uuid` 参数，根据 UUID 更新任务

#### Scenario: DELETE 删除任务
- **WHEN** 请求 `DELETE /api/tasks/{uuid}`
- **THEN** Controller 接收 `Guid uuid` 参数，根据 UUID 删除任务

### Requirement: API 响应包含 UUID 和 int ID
API 响应 SHALL 同时包含 `uuid` 和 `id` 字段。

#### Scenario: TaskDto 定义
- **WHEN** 返回任务数据
- **THEN** 响应包含 `uuid` (Guid) 和 `id` (int) 两个字段

#### Scenario: 前端显示 int ID
- **WHEN** 前端渲染任务卡片
- **THEN** 显示 `#id`（如 `#42`），使用 int ID 便于用户识别

#### Scenario: 前端操作使用 UUID
- **WHEN** 前端执行更新或删除操作
- **THEN** 使用 `uuid` 作为 API 路径参数

### Requirement: 数据库迁移添加 UUID 列
系统 SHALL 生成数据库迁移，为 `KanbanTasks` 表添加 `Uuid` 列。

#### Scenario: 迁移脚本生成
- **WHEN** 运行 `dotnet ef migrations add AddUuidToKanbanTasks`
- **THEN** 生成迁移脚本，包含添加 `Uuid` 列和唯一约束的操作

#### Scenario: 已有数据填充 UUID
- **WHEN** 应用迁移到已有数据库
- **THEN** 为已有记录生成新的 UUID 值

#### Scenario: 新记录自动生成 UUID
- **WHEN** 创建新的 `KanbanTask` 记录
- **THEN** 实体构造函数自动生成 UUID，无需手动赋值
