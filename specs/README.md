# OpenSpec - Spec 驱动开发

本项目使用 [OpenSpec](https://github.com/Fission-AI/OpenSpec) 进行 Spec 驱动开发（Spec-Driven Development, SDD），通过 Markdown specs 在编码前对齐人类和 AI。

## 目录结构

```
MinGo.Wayfinder/
├── specs/              # 最终规格（Source of Truth）
│   ├── README.md      # 本文件
│   └── [feature].md   # 已确认的功能规格
├── changes/           # 变更提案（Proposals）
│   ├── README.md      # 变更提案说明
│   └── [change].md    # 变更提案文档
└── docs/              # 其他文档
```

## OpenSpec 工作流程

### 1. 探索（Explore）

使用 `/opsx:explore` 命令探索需求和可能性。

```
/opsx:explore
```

### 2. 提案（Propose）

使用 `/opsx:propose` 命令创建变更提案，存放在 `changes/` 目录。

```
/opsx:propose
```

变更提案格式：

```markdown
# Change: [变更标题]

## Status
📋 Proposed | ✅ Accepted | 🚧 In Progress | ✔️ Completed | ❌ Rejected

## Summary
简要描述变更内容。

## Motivation
为什么需要这个变更？

## WHEN/THEN Scenarios

### Scenario 1: [场景名称]
**WHEN** [触发条件]
**THEN** [期望结果]

### Scenario 2: [场景名称]
**WHEN** [触发条件]
**THEN** [期望结果]

## Impact
- 影响的模块：
- 影响的 API：
- 影响的数据库：

## Implementation Notes
实现注意事项。
```

### 3. 应用（Apply）

使用 `/opsx:apply` 命令将已接受的变更应用到 `specs/` 目录。

```
/opsx:apply
```

### 4. 同步（Sync）

确保代码实现与 spec 保持同步。

### 5. 归档（Archive）

使用 `/opsx:archive` 命令归档已完成的变更。

```
/opsx:archive
```

## Spec 文件格式

`specs/` 目录中的 spec 文件使用 WHEN/THEN 场景格式：

```markdown
# [功能名称]

## Overview
功能概述。

## WHEN/THEN Scenarios

### Scenario 1: [场景名称]
**WHEN** [用户操作或系统事件]
**THEN** [系统响应或状态变化]

### Scenario 2: [场景名称]
**WHEN** [用户操作或系统事件]
**THEN** [系统响应或状态变化]

## Technical Details
技术实现细节。

## Dependencies
依赖项。
```

## 需求变更管理

### 提出变更

1. 在 `changes/` 目录创建变更提案文档
2. 使用 WHEN/THEN 格式描述变更
3. 标记状态为 `📋 Proposed`

### 评审变更

团队评审变更提案：
- ✅ **Accepted**：接受变更，进入开发
- ❌ **Rejected**：拒绝变更
- 🔄 **Revision Needed**：需要修改

### 应用变更

变更被接受后：
1. 使用 `/opsx:apply` 将变更应用到 `specs/`
2. 更新相关 spec 文件
3. 开始开发实现

### 完成变更

开发完成后：
1. 更新变更状态为 `✔️ Completed`
2. 使用 `/opsx:archive` 归档变更
3. 更新 CHANGELOG

## AI Agent 集成

当 AI Agent 协助开发时：

1. **查看 specs/**：了解当前功能的最终规格
2. **查看 changes/**：了解待处理的变更提案
3. **遵循 WHEN/THEN**：按照 spec 中的场景实现功能
4. **提出变更**：如需调整，在 `changes/` 创建提案
5. **保持同步**：确保代码实现与 spec 一致

## 快速开始

### 添加新功能

1. 使用 `/opsx:explore` 探索需求
2. 使用 `/opsx:propose` 创建变更提案
3. 团队评审变更提案
4. 使用 `/opsx:apply` 应用到 specs
5. 按照 spec 进行开发
6. 使用 `/opsx:archive` 归档变更

### 修改现有功能

1. 查看 `specs/[feature].md` 了解当前规格
2. 在 `changes/` 创建变更提案
3. 评审通过后应用到 specs
4. 更新代码实现

## 参考资源

- [OpenSpec GitHub](https://github.com/Fission-AI/OpenSpec)
- [Spec-Driven Development](https://github.com/Fission-AI/OpenSpec#spec-driven-development)
