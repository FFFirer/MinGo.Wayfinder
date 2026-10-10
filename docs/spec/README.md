# 产品规格文档（Spec）索引

本目录包含 MinGo.Wayfinder 项目的产品规格文档，采用 spec 模式进行需求管理和迭代追踪。

## 文档结构

```
docs/spec/
├── README.md                    # 本文件 - Spec 文档索引
├── product-overview.md          # 产品概述和愿景
├── requirements.md              # 需求规格说明
├── features/                    # 功能规格文档
│   └── [feature-name].md       # 每个功能一个文档
└── releases/                    # 发布计划
    └── [version].md            # 每个版本的发布计划
```

## Spec 模式工作流程

### 1. 需求提出

- 在 `requirements.md` 中添加新需求
- 或在 `features/` 中创建新功能文档

### 2. 需求评审

- 产品、开发、测试参与评审
- 确认需求优先级和可行性
- 更新需求状态：`待评审` → `已评审` → `开发中` → `已完成`

### 3. 功能设计

- 在 `features/` 中创建功能规格文档
- 包含：用户故事、验收标准、技术设计、UI/UX 设计

### 4. 开发实现

- 按照功能规格文档进行开发
- 在 `changelog/CHANGELOG.md` 中记录变更

### 5. 发布计划

- 在 `releases/` 中创建版本发布计划
- 包含：功能列表、时间线、风险评估

## 文档命名规范

- 功能文档：`features/[feature-name].md`（使用 kebab-case）
- 发布计划：`releases/v[version].md`（如 `releases/v1.0.0.md`）

## 需求状态

- 📋 **待评审**：新提出的需求
- ✅ **已评审**：已通过评审，待开发
- 🚧 **开发中**：正在开发
- 🧪 **测试中**：开发完成，测试中
- ✔️ **已完成**：已发布上线
- ❌ **已取消**：需求取消

## 快速链接

- [产品概述](./product-overview.md)
- [需求规格](./requirements.md)
- [变更日志](../changelog/CHANGELOG.md)
