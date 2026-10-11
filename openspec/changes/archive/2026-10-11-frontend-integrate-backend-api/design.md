## Context

MinGo.Wayfinder 是一个前后端分离的看板应用：
- **后端**：ASP.NET Core Web API，采用整洁架构（Clean Architecture），当前使用 `int Id` 作为唯一标识，时间字段存储为 `long`（Unix 时间戳）
- **前端**：SolidJS SPA，当前使用硬编码的模拟数据，未对接真实 API
- **现状问题**：
  - 前端数据无法持久化
  - API 标识策略不符合 RESTful 最佳实践（应使用 UUID 作为资源标识）
  - 时间格式（Unix 时间戳）不利于前端直接使用和调试

## Goals / Non-Goals

**Goals:**
- 实现前后端完整对接，支持完整的 CRUD 操作
- 采用 UUID 作为 API 资源的唯一标识，int ID 用于用户友好显示
- 统一时间格式为 UTC ISO8601 字符串，前端负责本地化
- 建立可复用的 API 服务层架构，便于后续扩展其他资源
- 开发环境 CORS 配置简化（AllowAll），生产环境严格配置

**Non-Goals:**
- 不实现拖拽排序功能
- 不实现用户认证和授权
- 不实现实时协作（WebSocket/SSE）
- 不优化数据库查询性能（当前数据量小）
- 不实现离线缓存

## Decisions

### 1. 双标识策略：UUID + int ID

**决策**：实体同时包含 `Guid Uuid` 和 `int Id` 两个标识字段。

**理由**：
- **UUID**：全局唯一，适合作为 API 资源标识，便于分布式系统、数据迁移、外部引用
- **int ID**：自增数字，用户友好，适合显示（如 `#42`），便于用户沟通和记忆

**替代方案**：
- ❌ 仅使用 UUID：用户不友好，`#550e8400-e29b-41d4-a716-446655440000` 难以识别
- ❌ 仅使用 int ID：不适合外部引用，暴露内部实现细节，安全性较低

**API 路径**：
```
GET    /api/tasks/{uuid}      ← 使用 UUID
PUT    /api/tasks/{uuid}      ← 使用 UUID
DELETE /api/tasks/{uuid}      ← 使用 UUID
```

**响应示例**：
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": 42,
  "title": "实现用户认证",
  "createdAt": "2026-10-11T08:30:00Z"
}
```

### 2. 时间格式：UTC ISO8601 字符串

**决策**：后端返回 UTC 时间的 ISO8601 字符串格式（如 `"2026-10-11T08:30:00Z"`），前端负责本地化展示。

**理由**：
- ISO8601 是国际标准，可读性好，便于调试
- UTC 时间避免时区混乱，前端根据浏览器时区自动转换
- 数据库存储为 `TEXT`（SQLite）或 `TIMESTAMP`（PostgreSQL），无需转换为时间戳

**替代方案**：
- ❌ Unix 时间戳（long）：可读性差，前端仍需转换，调试困难
- ❌ 本地时间字符串：后端需要知道用户时区，不适合多时区场景

**前端处理**：
```typescript
const formatLocalTime = (utcTime: string): string => {
  return new Date(utcTime).toLocaleString();
};
```

### 3. 枚举格式：字符串返回

**决策**：后端枚举以字符串形式返回（如 `"todo"`, `"in_progress"`），前端做可视化展示。

**理由**：
- 字符串可读性好，便于调试和 API 文档
- 前端可根据字符串做映射（颜色、图标、标签文本）
- EF Core 已配置为字符串存储

**替代方案**：
- ❌ 数字（int）：可读性差，前端需要维护映射表
- ❌ 对象（`{ value: "todo", label: "待办" }`）：冗余，前端可自行映射

### 4. API 服务层架构：httpClient + 按资源分文件

**决策**：
```
web/src/services/
├── httpClient.ts      # HTTP 客户端封装
└── tasks.ts           # Task 资源 API
```

**理由**：
- `httpClient.ts` 封装通用逻辑（base URL、错误处理、headers）
- `tasks.ts` 专注 Task 资源的 CRUD 操作
- 便于后续扩展其他资源（如 `projects.ts`, `users.ts`）

**替代方案**：
- ❌ 所有 API 调用放一个文件：文件过大，难以维护
- ❌ 使用 axios 等第三方库：增加依赖，fetch 已足够
- ❌ 使用 React Query 等数据管理库：SolidJS 生态不成熟，手动管理即可

### 5. 环境变量：Vite 内置支持

**决策**：使用 `.env.development` 和 `.env.production` 配置 `VITE_API_BASE_URL`。

**理由**：
- Vite 内置支持，无需额外配置
- 通过 `import.meta.env.VITE_*` 访问
- 不同环境使用不同配置文件

**配置示例**：
```
# .env.development
VITE_API_BASE_URL=http://localhost:5000

# .env.production
VITE_API_BASE_URL=https://api.example.com
```

### 6. CORS 配置：开发环境 AllowAll

**决策**：开发环境通过 `appsettings.Development.json` 配置 `AllowAll`，生产环境单独配置具体 Origin。

**理由**：
- 开发环境简化配置，避免跨域问题
- 生产环境严格配置，保证安全性
- 通过配置开关控制，代码逻辑统一

**配置示例**：
```json
// appsettings.Development.json
{
  "Cors": {
    "AllowAll": true
  }
}
```

**代码逻辑**：
```csharp
if (builder.Configuration.GetValue<bool>("Cors:AllowAll"))
{
    // AllowAll 策略
}
else
{
    // 具体 Origin 策略
}
```

## Risks / Trade-offs

### 1. 数据库迁移风险
**风险**：添加 `Uuid` 列需要生成新的迁移，已有数据需要填充 UUID。
→ **缓解**：
- 开发阶段可清空数据库重新迁移
- 生产环境需编写数据迁移脚本，为已有记录生成 UUID

### 2. API 路径参数变更
**风险**：API 路径参数从 `int` 改为 `Guid`，前端需要同步更新。
→ **缓解**：
- 前后端同步开发，一次性切换
- 更新 API 文档，明确路径参数类型

### 3. 时间格式变更
**风险**：时间字段从 `long` 改为 ISO8601 字符串，前端类型定义需要更新。
→ **缓解**：
- 前端类型定义与后端 DTO 对齐
- 统一使用 UTC 时间，避免时区问题

### 4. UUID 生成策略
**风险**：UUID 需要在实体创建时生成，确保唯一性。
→ **缓解**：
- 在实体构造函数中调用 `Guid.NewGuid()` 生成
- 数据库层面添加唯一约束

### 5. 前端硬编码数据迁移
**风险**：前端当前使用硬编码数据，切换到 API 后需要处理数据迁移。
→ **缓解**：
- 清空前端硬编码数据
- 首次加载时从 API 获取数据
- 提供 loading 状态和错误处理

## Migration Plan

### 阶段 1：后端改造
1. 为 `KanbanTask` 实体添加 `Guid Uuid` 字段
2. 更新 EF Core 配置，添加 Uuid 唯一约束
3. 更新 DTO，时间字段改为 `DateTime`
4. 更新 Controller，路径参数改为 `Guid`
5. 添加 CORS 配置逻辑
6. 生成数据库迁移并应用

### 阶段 2：前端 API 服务层
1. 创建 `web/src/services/` 目录
2. 实现 `httpClient.ts`（HTTP 客户端封装）
3. 实现 `tasks.ts`（Task 资源 API）
4. 添加 `.env.development` 和 `.env.production`

### 阶段 3：前端对接
1. 更新 `web/src/types/kanban.ts` 类型定义
2. 改造 `kanbanStore.ts`，调用真实 API
3. 更新组件，显示本地化时间和 UUID
4. 测试完整 CRUD 流程

### 回滚策略
- 后端：保留旧版 API（可选），通过版本号区分
- 前端：保留硬编码数据作为 fallback（不推荐）
