## ADDED Requirements

### Requirement: 获取所有任务
系统 SHALL 提供 GET /api/tasks 端点，返回所有未删除的任务列表。

#### Scenario: 成功获取任务列表
- **WHEN** 客户端发送 GET /api/tasks 请求
- **THEN** 系统返回 200 状态码和任务数组
- **THEN** 响应体包含所有 IsDeleted = false 的任务
- **THEN** 每个任务包含 id, title, description, status, createdAt, updatedAt 字段

#### Scenario: 按状态筛选任务
- **WHEN** 客户端发送 GET /api/tasks?status=todo 请求
- **THEN** 系统返回 200 状态码和筛选后的任务数组
- **THEN** 响应体仅包含 status = "todo" 且 IsDeleted = false 的任务

#### Scenario: 包含已删除任务
- **WHEN** 客户端发送 GET /api/tasks?includeDeleted=true 请求
- **THEN** 系统返回 200 状态码和所有任务（包括已删除）
- **THEN** 响应体包含所有任务，无论 IsDeleted 值

#### Scenario: 无任务时返回空数组
- **WHEN** 数据库中无任务且客户端发送 GET /api/tasks 请求
- **THEN** 系统返回 200 状态码和空数组 []

### Requirement: 获取单个任务
系统 SHALL 提供 GET /api/tasks/{id} 端点，返回指定 ID 的任务详情。

#### Scenario: 成功获取任务详情
- **WHEN** 客户端发送 GET /api/tasks/1 请求且任务存在
- **THEN** 系统返回 200 状态码和任务对象
- **THEN** 响应体包含完整的任务信息

#### Scenario: 任务不存在
- **WHEN** 客户端发送 GET /api/tasks/999 请求且任务不存在
- **THEN** 系统返回 404 状态码和错误信息

#### Scenario: 任务已删除
- **WHEN** 客户端发送 GET /api/tasks/1 请求且任务已被软删除
- **THEN** 系统返回 404 状态码和错误信息

### Requirement: 创建任务
系统 SHALL 提供 POST /api/tasks 端点，创建新任务。

#### Scenario: 成功创建任务
- **WHEN** 客户端发送 POST /api/tasks 请求，包含有效的 CreateTaskDto
- **THEN** 系统创建任务，设置 status = "todo", IsDeleted = false
- **THEN** 系统记录 CreatedAt 和 UpdatedAt 为当前 UTC 时间（Unix 毫秒）
- **THEN** 系统返回 201 状态码和新创建的任务对象
- **THEN** 响应 Location 头指向 /api/tasks/{id}

#### Scenario: 标题为空
- **WHEN** 客户端发送 POST /api/tasks 请求，title 为空或 null
- **THEN** 系统返回 400 状态码和验证错误信息

#### Scenario: 标题超长
- **WHEN** 客户端发送 POST /api/tasks 请求，title 长度超过 200 字符
- **THEN** 系统返回 400 状态码和验证错误信息

#### Scenario: 无效的状态值
- **WHEN** 客户端发送 POST /api/tasks 请求，status 不是有效枚举值
- **THEN** 系统返回 400 状态码和验证错误信息

### Requirement: 更新任务
系统 SHALL 提供 PUT /api/tasks/{id} 端点，更新指定任务。

#### Scenario: 成功更新任务
- **WHEN** 客户端发送 PUT /api/tasks/1 请求，包含有效的 UpdateTaskDto
- **THEN** 系统更新任务字段（title, description, status）
- **THEN** 系统更新 UpdatedAt 为当前 UTC 时间（Unix 毫秒）
- **THEN** 系统返回 200 状态码和更新后的任务对象

#### Scenario: 任务不存在
- **WHEN** 客户端发送 PUT /api/tasks/999 请求且任务不存在
- **THEN** 系统返回 404 状态码和错误信息

#### Scenario: 任务已删除
- **WHEN** 客户端发送 PUT /api/tasks/1 请求且任务已被软删除
- **THEN** 系统返回 404 状态码和错误信息

#### Scenario: 标题为空
- **WHEN** 客户端发送 PUT /api/tasks/1 请求，title 为空或 null
- **THEN** 系统返回 400 状态码和验证错误信息

### Requirement: 删除任务
系统 SHALL 提供 DELETE /api/tasks/{id} 端点，软删除指定任务。

#### Scenario: 成功删除任务
- **WHEN** 客户端发送 DELETE /api/tasks/1 请求且任务存在
- **THEN** 系统将任务的 IsDeleted 设置为 true
- **THEN** 系统更新 UpdatedAt 为当前 UTC 时间（Unix 毫秒）
- **THEN** 系统返回 204 状态码（无内容）

#### Scenario: 任务不存在
- **WHEN** 客户端发送 DELETE /api/tasks/999 请求且任务不存在
- **THEN** 系统返回 404 状态码和错误信息

#### Scenario: 任务已删除
- **WHEN** 客户端发送 DELETE /api/tasks/1 请求且任务已被软删除
- **THEN** 系统返回 404 状态码和错误信息

### Requirement: API 文档
系统 SHALL 在 Development 环境提供 NSwag 生成的 API 文档。

#### Scenario: Development 环境访问 Swagger UI
- **WHEN** 在 Development 环境访问 /swagger
- **THEN** 系统显示 Swagger UI 页面
- **THEN** 页面包含所有 /api/tasks 端点的文档

#### Scenario: Production 环境不暴露文档
- **WHEN** 在 Production 环境访问 /swagger
- **THEN** 系统返回 404 状态码
