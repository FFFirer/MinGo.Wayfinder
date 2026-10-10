# [功能名称]

## 元信息

- **Spec 编号**: SPEC-XXX
- **创建日期**: [日期]
- **最后更新**: [日期]
- **状态**: 📝 Draft | ✅ Active | 🔄 Deprecated | ❌ Removed
- **相关变更**: [CHG-XXX](../changes/[change].md)

## Overview

功能概述（1-2 段）。

## WHEN/THEN Scenarios

### Scenario 1: [场景名称]

**WHEN** [触发条件/用户操作]
**THEN** [期望结果/系统响应]

**验收标准**：
- 标准 1
- 标准 2

### Scenario 2: [场景名称]

**WHEN** [触发条件/用户操作]
**THEN** [期望结果/系统响应]

**验收标准**：
- 标准 1
- 标准 2

## Technical Details

### 领域模型

```csharp
// Domain/Entities/YourEntity.cs
public class YourEntity
{
    // 实体定义
}
```

### API 接口

```http
POST /api/your-endpoint
Content-Type: application/json

{
  "property": "value"
}

Response: 200 OK
{
  "id": "guid",
  "property": "value"
}
```

### 数据库结构

```sql
CREATE TABLE your_table (
    id UUID PRIMARY KEY,
    property VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 前端组件

```
src/Web/
├── pages/
│   └── YourPage.tsx
└── components/
    └── YourComponent.tsx
```

## Dependencies

- 依赖的其他功能：
- 依赖的第三方库：
- 依赖的外部服务：

## Constraints

- 性能约束：
- 安全约束：
- 兼容性约束：

## Future Enhancements

- 未来可能的增强功能

## Related Specs

- [相关功能 Spec](./related-feature.md)

## Changelog

| 日期 | 版本 | 变更描述 | 变更人 | 相关变更 |
|------|------|---------|--------|---------|
| [日期] | 1.0 | 初始版本 | [姓名] | - |
| [日期] | 1.1 | 添加场景 2 | [姓名] | [CHG-XXX](../changes/[change].md) |
