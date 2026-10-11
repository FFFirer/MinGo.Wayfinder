## ADDED Requirements

### Requirement: 后端返回 UTC ISO8601 时间格式
后端 API 响应 SHALL 返回 UTC 时间的 ISO8601 字符串格式。

#### Scenario: DateTime 字段类型
- **WHEN** 定义 `TaskDto` 的时间字段
- **THEN** 字段类型为 `DateTime`，使用 `DateTimeKind.Utc`

#### Scenario: ISO8601 格式输出
- **WHEN** 序列化 `DateTime` 字段为 JSON
- **THEN** 输出格式为 ISO8601 字符串，如 `"2026-10-11T08:30:00Z"`

#### Scenario: 数据库存储
- **WHEN** 将 `DateTime` 保存到 SQLite 数据库
- **THEN** 存储为 ISO8601 格式的 `TEXT` 类型

### Requirement: 前端时间本地化展示
前端 SHALL 将后端返回的 UTC 时间转换为本地时区显示。

#### Scenario: 时间格式化工具函数
- **WHEN** 前端需要显示时间
- **THEN** 使用 `formatLocalTime(utcTime: string)` 函数转换为本地时间字符串

#### Scenario: 使用浏览器时区
- **WHEN** 调用 `formatLocalTime`
- **THEN** 使用 `Date.prototype.toLocaleString()` 根据浏览器时区自动转换

#### Scenario: 显示格式
- **WHEN** 在任务卡片或详情面板显示创建时间
- **THEN** 显示格式为 "创建于 YYYY-MM-DD HH:mm"（本地时间）

### Requirement: 前端类型定义使用字符串时间
前端类型定义 SHALL 将时间字段定义为 `string` 类型（ISO8601 格式）。

#### Scenario: Task 类型定义
- **WHEN** 定义 `Task` 接口
- **THEN** `createdAt` 和 `updatedAt` 字段类型为 `string`（ISO8601 UTC 时间）

#### Scenario: 不使用 Unix 时间戳
- **WHEN** 接收 API 响应
- **THEN** 时间字段为 ISO8601 字符串，不使用 `number` 类型的 Unix 时间戳

### Requirement: 禁止使用 Unix 时间戳
系统 SHALL 不在 API 响应中使用 Unix 时间戳格式。

#### Scenario: 后端不返回时间戳
- **WHEN** 后端序列化时间字段
- **THEN** 不返回 `long` 类型的 Unix 毫秒时间戳

#### Scenario: 前端不存储时间戳
- **WHEN** 前端存储任务数据
- **THEN** 保持原始 ISO8601 字符串，不转换为时间戳
