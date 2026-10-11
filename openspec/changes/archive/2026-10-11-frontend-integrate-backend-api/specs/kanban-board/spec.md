## MODIFIED Requirements

### Requirement: 卡片显示任务 ID
每张任务卡片 SHALL 在标题区域显示任务 ID，格式为 `#N`（N 为数字 ID）。

#### Scenario: 卡片显示 ID
- **WHEN** 看板渲染任务卡片
- **THEN** 卡片标题前显示 `#1`、`#2` 等 ID，使用 `md-label-small` 样式和低对比度颜色

#### Scenario: ID 来源
- **WHEN** 从 API 获取任务数据
- **THEN** 使用 `task.id`（int 类型）显示，而非 `task.uuid`

### Requirement: 创建时间在详情面板显示
任务详情面板 SHALL 在查看模式和编辑模式中均显示任务创建时间。

#### Scenario: 查看模式显示创建时间
- **WHEN** 用户打开任务详情面板（查看模式）
- **THEN** 标题下方显示创建时间文本，格式为 "创建于 YYYY-MM-DD HH:mm"（本地时间）

#### Scenario: 编辑模式显示创建时间
- **WHEN** 用户进入编辑模式
- **THEN** 标题输入框下方显示创建时间（只读文本），格式为 "创建于 YYYY-MM-DD HH:mm"（本地时间）

#### Scenario: 时间本地化
- **WHEN** 显示创建时间
- **THEN** 将后端返回的 UTC ISO8601 时间字符串转换为本地时区显示

## ADDED Requirements

### Requirement: 类型定义对齐后端 DTO
前端 `Task` 类型定义 SHALL 与后端 `TaskDto` 对齐。

#### Scenario: UUID 字段
- **WHEN** 定义 `Task` 接口
- **THEN** 包含 `uuid: string` 字段（对应后端 `Guid Uuid`）

#### Scenario: int ID 字段
- **WHEN** 定义 `Task` 接口
- **THEN** 包含 `id: number` 字段（对应后端 `int Id`）

#### Scenario: 时间字段类型
- **WHEN** 定义 `Task` 接口
- **THEN** `createdAt` 和 `updatedAt` 字段类型为 `string`（ISO8601 UTC 时间）

#### Scenario: 移除软删除字段
- **WHEN** 定义 `Task` 接口
- **THEN** 不包含 `isDeleted` 字段（软删除为后端实现差异，前端无需关注）

### Requirement: 枚举可视化展示
前端 SHALL 将后端返回的枚举字符串做可视化展示。

#### Scenario: 任务状态枚举定义
- **WHEN** 定义任务状态类型
- **THEN** 使用 TypeScript enum 或 const object 定义状态值（`todo`, `in_progress`, `done`, `review`）

#### Scenario: 状态 Chip 显示
- **WHEN** 渲染任务状态
- **THEN** 使用 `Chip` 组件，根据状态显示不同颜色和标签文本
- **AND** 状态映射：`todo` → 灰色 "待办"，`in_progress` → 蓝色 "进行中"，`done` → 绿色 "已完成"，`review` → 橙色 "审核中"
