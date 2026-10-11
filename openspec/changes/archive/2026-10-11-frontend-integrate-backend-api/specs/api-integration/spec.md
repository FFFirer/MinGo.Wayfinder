## ADDED Requirements

### Requirement: HTTP 客户端封装
系统 SHALL 提供统一的 HTTP 客户端封装，包含 base URL、错误处理、请求头等通用逻辑。

#### Scenario: 自动添加 base URL
- **WHEN** 前端发起 API 请求
- **THEN** 系统自动从环境变量 `VITE_API_BASE_URL` 读取 base URL 并拼接到请求地址

#### Scenario: 统一错误处理
- **WHEN** API 请求返回非 2xx 状态码
- **THEN** 系统抛出包含 HTTP 状态码和错误信息的异常

#### Scenario: 自动添加 Content-Type
- **WHEN** 发起 POST/PUT 请求
- **THEN** 系统自动添加 `Content-Type: application/json` 请求头

### Requirement: 环境变量配置
系统 SHALL 支持通过环境变量配置 API 基础地址，不同环境使用不同配置文件。

#### Scenario: 开发环境配置
- **WHEN** 运行 `npm run dev` 启动开发服务器
- **THEN** 系统加载 `.env.development` 文件，`VITE_API_BASE_URL` 为 `http://localhost:5000`

#### Scenario: 生产环境配置
- **WHEN** 运行 `npm run build` 构建生产版本
- **THEN** 系统加载 `.env.production` 文件，`VITE_API_BASE_URL` 为生产环境 API 地址

### Requirement: Task 资源 API 封装
系统 SHALL 提供 Task 资源的 API 封装，包含完整的 CRUD 操作。

#### Scenario: 获取所有任务
- **WHEN** 调用 `tasksApi.getAll()`
- **THEN** 系统发起 `GET /api/tasks` 请求，返回 `Task[]` 数组

#### Scenario: 根据 UUID 获取任务
- **WHEN** 调用 `tasksApi.getByUuid(uuid)`
- **THEN** 系统发起 `GET /api/tasks/{uuid}` 请求，返回 `Task` 对象

#### Scenario: 创建任务
- **WHEN** 调用 `tasksApi.create(dto)`
- **THEN** 系统发起 `POST /api/tasks` 请求，返回创建的 `Task` 对象

#### Scenario: 更新任务
- **WHEN** 调用 `tasksApi.update(uuid, dto)`
- **THEN** 系统发起 `PUT /api/tasks/{uuid}` 请求，返回更新后的 `Task` 对象

#### Scenario: 删除任务
- **WHEN** 调用 `tasksApi.delete(uuid)`
- **THEN** 系统发起 `DELETE /api/tasks/{uuid}` 请求，无返回值

### Requirement: Store 调用真实 API
系统 SHALL 将 Store 从硬编码数据改为调用真实 API。

#### Scenario: 初始化加载数据
- **WHEN** 看板页面首次加载
- **THEN** Store 调用 `tasksApi.getAll()` 获取任务列表，更新本地状态

#### Scenario: 创建任务后刷新
- **WHEN** 用户创建新任务
- **THEN** Store 调用 `tasksApi.create()` 创建任务，成功后将返回的任务添加到本地状态

#### Scenario: 更新任务后刷新
- **WHEN** 用户更新任务
- **THEN** Store 调用 `tasksApi.update()` 更新任务，成功后用返回的任务替换本地状态中的对应任务

#### Scenario: 删除任务后刷新
- **WHEN** 用户删除任务
- **THEN** Store 调用 `tasksApi.delete()` 删除任务，成功后从本地状态中移除该任务
