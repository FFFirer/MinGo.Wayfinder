## 1. 后端实体和 DTO 改造

- [x] 1.1 为 `KanbanTask` 实体添加 `Guid Uuid` 字段，在构造函数中调用 `Guid.NewGuid()` 生成
- [x] 1.2 更新 EF Core 配置，为 `Uuid` 字段添加唯一约束和索引
- [x] 1.3 更新 `TaskDto`，添加 `Guid Uuid` 字段
- [x] 1.4 更新 `TaskDto`，将 `CreatedAt` 和 `UpdatedAt` 类型从 `long` 改为 `DateTime`
- [x] 1.5 更新 `CreateTaskDto` 和 `UpdateTaskDto`，时间字段改为 `DateTime`（如需要）
- [x] 1.6 生成数据库迁移：`dotnet ef migrations add AddUuidAndChangeTimeFormat`
- [x] 1.7 应用迁移到开发数据库

## 2. 后端 API Controller 改造

- [x] 2.1 更新 `TasksController.GetById`，路径参数从 `int id` 改为 `Guid uuid`
- [x] 2.2 更新 `TasksController.Update`，路径参数从 `int id` 改为 `Guid uuid`
- [x] 2.3 更新 `TasksController.Delete`，路径参数从 `int id` 改为 `Guid uuid`
- [x] 2.4 更新 `TasksController.Create`，返回的 `CreatedAtAction` 使用 `uuid` 而非 `id`
- [x] 2.5 更新 `ITaskService` 接口，查询方法参数从 `int` 改为 `Guid`
- [x] 2.6 更新 `TaskService` 实现，根据 `Uuid` 查询实体

## 3. 后端 CORS 配置

- [x] 3.1 在 `appsettings.Development.json` 中添加 `Cors:AllowAll` 配置项，值为 `true`
- [x] 3.2 在 `Program.cs` 中添加 CORS 配置逻辑，根据 `Cors:AllowAll` 动态选择策略
- [x] 3.3 开发环境使用 `AllowAnyOrigin()`，生产环境使用具体 Origin 列表

## 4. 前端 API 服务层

- [x] 4.1 创建 `web/src/services/` 目录
- [x] 4.2 创建 `web/src/services/httpClient.ts`，封装 fetch 调用，自动添加 base URL 和 Content-Type
- [x] 4.3 在 `httpClient.ts` 中实现统一错误处理，抛出包含状态码的异常
- [x] 4.4 创建 `web/src/services/tasks.ts`，实现 `tasksApi` 对象，包含 `getAll`, `getByUuid`, `create`, `update`, `delete` 方法
- [x] 4.5 创建 `web/.env.development`，配置 `VITE_API_BASE_URL=http://localhost:5000`
- [x] 4.6 创建 `web/.env.production`，配置 `VITE_API_BASE_URL` 为生产环境地址（可暂时留空或占位）

## 5. 前端类型定义更新

- [x] 5.1 更新 `web/src/types/kanban.ts`，`Task` 接口添加 `uuid: string` 字段
- [x] 5.2 更新 `Task` 接口，`id` 字段类型从 `string` 改为 `number`
- [x] 5.3 更新 `Task` 接口，`createdAt` 和 `updatedAt` 字段类型保持 `string`（ISO8601 UTC）
- [x] 5.4 确保 `Task` 接口不包含 `isDeleted` 字段
- [x] 5.5 更新 `CreateTaskDto` 和 `UpdateTaskDto`，对齐后端 DTO 字段

## 6. 前端 Store 改造

- [x] 6.1 移除 `kanbanStore.ts` 中的 `initialTasks` 硬编码数据
- [x] 6.2 在 Store 初始化时调用 `tasksApi.getAll()` 获取任务列表
- [x] 6.3 添加 loading 状态，首次加载时显示加载指示器
- [x] 6.4 添加 error 状态，API 调用失败时显示错误信息
- [x] 6.5 更新 `createTask` 方法，调用 `tasksApi.create()` 后更新本地状态
- [x] 6.6 更新 `updateTask` 方法，调用 `tasksApi.update()` 后更新本地状态
- [x] 6.7 更新 `deleteTask` 方法，调用 `tasksApi.delete()` 后更新本地状态

## 7. 前端组件更新

- [x] 7.1 创建时间格式化工具函数 `formatLocalTime(utcTime: string): string`
- [x] 7.2 更新 `TaskCard.tsx`，使用 `formatLocalTime` 显示本地化时间
- [x] 7.3 更新 `TaskDetailPanel.tsx`，使用 `formatLocalTime` 显示本地化时间
- [x] 7.4 确保卡片和详情面板使用 `task.id`（int）显示 `#ID`
- [x] 7.5 定义任务状态枚举映射（`todo` → 灰色 "待办"，`in_progress` → 蓝色 "进行中" 等）
- [x] 7.6 更新 `Chip` 组件，根据状态枚举显示不同颜色和标签

## 8. 集成测试和验证

- [x] 8.1 启动后端 API（`dotnet run`），确认运行在 `http://localhost:5000`
- [x] 8.2 启动前端开发服务器（`npm run dev`），确认运行在 `http://localhost:5179`
- [x] 8.3 测试获取任务列表，验证数据从后端正确加载
- [x] 8.4 测试创建任务，验证数据持久化到数据库
- [x] 8.5 测试更新任务，验证数据正确更新
- [x] 8.6 测试删除任务，验证数据从数据库软删除
- [x] 8.7 验证时间显示为本地时区格式
- [x] 8.8 验证卡片显示 `#int ID`，操作使用 `uuid`
- [x] 8.9 验证状态 Chip 显示正确的颜色和标签
