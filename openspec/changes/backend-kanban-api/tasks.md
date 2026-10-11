## 1. 项目初始化

- [x] 1.1 创建 server/ 目录结构
- [x] 1.2 创建 MinGo.Wayfinder.Domain 项目（classlib）
- [x] 1.3 创建 MinGo.Wayfinder.Application 项目（classlib）
- [x] 1.4 创建 MinGo.Wayfinder.Infrastructure 项目（classlib）
- [x] 1.5 创建 MinGo.Wayfinder.API 项目（webapi）
- [x] 1.6 创建 MinGo.Wayfinder.Migrations 项目（classlib）
- [x] 1.7 创建 MinGo.Wayfinder.slnx 解决方案文件
- [x] 1.8 配置项目间引用关系

## 2. Domain 层实现

- [x] 2.1 创建 TaskStatus 枚举（todo, in_progress, review, done）
- [x] 2.2 创建 Task 实体（Id, Title, Description, Status, CreatedAt, UpdatedAt, IsDeleted）
- [x] 2.3 创建 ITaskRepository 接口

## 3. Application 层实现

- [x] 3.1 创建 TaskDto, CreateTaskDto, UpdateTaskDto
- [x] 3.2 创建 ITaskService 接口
- [x] 3.3 实现 TaskService 服务

## 4. Infrastructure 层实现

- [x] 4.1 安装 EF Core SQLite NuGet 包
- [x] 4.2 创建 DateTimeToLongConverter（UTC ↔ long 转换）
- [x] 4.3 创建 TaskConfiguration（EF Core 实体配置）
- [x] 4.4 创建 AppDbContext
- [x] 4.5 实现 TaskRepository

## 5. API 层实现

- [x] 5.1 安装 NSwag.AspNetCore NuGet 包
- [x] 5.2 创建 GlobalExceptionMiddleware（全局异常处理）
- [x] 5.3 创建 TasksController（CRUD 端点）
- [x] 5.4 配置 Program.cs（DI、日志、中间件、NSwag）
- [x] 5.5 配置 appsettings.json（SQLite 连接字符串）

## 6. 迁移项目配置

- [x] 6.1 配置 Migrations 项目引用 Infrastructure 项目
- [x] 6.2 安装 EF Core Design NuGet 包
- [x] 6.3 创建 AppDbContextFactory
- [x] 6.4 生成初始迁移

## 7. 验证与测试

- [x] 7.1 应用迁移创建数据库
- [x] 7.2 启动 API 项目验证运行
- [x] 7.3 使用 Swagger UI 测试所有端点
- [x] 7.4 验证软删除机制
- [x] 7.5 验证时间字段转换
