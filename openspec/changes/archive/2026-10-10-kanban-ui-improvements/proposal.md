## Why

Kanban MVP 原型存在三个 UI/UX 问题：看板未铺满视口高度导致底部留白、卡片缺少 ID 标识、新建任务未显示创建时间。这些影响信息密度和可用性，需要在 MVP 基础上快速修复。

## What Changes

- 看板容器铺满 MainLayout 剩余高度，消除底部空白区域
- 任务卡片显示任务 ID（如 #1、#2），便于引用和识别
- 新建任务时自动生成并显示创建时间（当前日期）

## Capabilities

### New Capabilities

（无新增能力，均为现有功能的 UI 修复）

### Modified Capabilities

- `kanban-board`: 布局改为铺满剩余高度
- `task-card`: 卡片增加 ID 显示
- `task-detail`: 创建时间字段在查看/编辑模式下显示

## Impact

- `web/src/components/kanban/Board.tsx` — 容器高度样式调整
- `web/src/components/kanban/TaskCard.tsx` — 卡片增加 ID 渲染
- `web/src/components/kanban/TaskDetailPanel.tsx` — 创建时间显示
- `web/src/layouts/MainLayout.tsx` — 主容器 flex 布局调整
- `web/src/app.css` — 看板高度相关样式
