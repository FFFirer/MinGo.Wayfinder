# Change: Kanban 任务管理 MVP 前端原型

## 元信息

- **提案编号**: CHG-002
- **提案人**: 0sdf0
- **创建日期**: 2026-10-11
- **状态**: 🚧 In Progress

## Summary

实现基于 MD3 设计规范的 Kanban 看板任务管理前端原型，包含固定状态列、任务 CRUD、状态切换、响应式布局（桌面端并排/移动端 Tab 切换），纯前端内存数据，无持久化、无拖拽。

## Motivation

### 背景
项目需要一个任务管理功能来追踪工作进度。参考 Kanboard 的看板模式，以 MD3 设计语言实现前端 MVP 原型。

### 目标
- 提供可视化的看板视图，直观展示任务在不同状态间的分布
- 支持任务的创建、编辑、删除和状态切换
- 桌面端和移动端均有良好的交互体验
- 复用现有 MD3 组件体系（Button, Card, Menu）

### 非目标
- 不实现拖拽排序
- 不实现数据持久化或后端 API 对接
- 不实现用户/多人协作
- 不实现子任务、评论、标签
- 不实现列的增删改（列 = 固定状态枚举）
- 不实现优先级和截止日期

## WHEN/THEN Scenarios

### Scenario 1: 查看看板

**WHEN** 用户访问首页
**THEN** 显示四列看板：待办、进行中、审核、已完成，各列展示对应状态的任务卡片

**验收标准**：
- [x] 四列按状态横向排列（桌面端）或 Tab 切换（移动端）
- [x] 每张卡片显示标题、描述预览、状态 Chip
- [x] 列头显示状态名和任务计数

### Scenario 2: 创建任务

**WHEN** 用户点击 AppBar 的 [+ 新建] 按钮
**THEN** 右侧滑出详情面板（编辑模式，空表单），保存后任务出现在"待办"列

**验收标准**：
- [x] 面板以编辑模式打开
- [x] 包含标题（必填）、描述、状态字段
- [x] 新建任务默认 status = 'todo'
- [x] 保存后面板关闭，新卡片出现在待办列

### Scenario 3: 编辑任务

**WHEN** 用户点击任务卡片
**THEN** 右侧滑出详情面板（查看模式），点击 [编辑] 进入编辑态

**验收标准**：
- [x] 查看模式显示所有字段（只读）
- [x] 编辑模式字段可修改
- [x] 保存后更新卡片，面板回到查看模式

### Scenario 4: 切换状态

**WHEN** 用户点击卡片上的状态 Chip
**THEN** 弹出 MD3 Menu 显示四个状态选项，选择后卡片移至对应列

**验收标准**：
- [x] Chip 点击弹出 Menu
- [x] 选择新状态后卡片立即移动
- [x] 当前状态在 Menu 中标记

### Scenario 5: 删除任务

**WHEN** 用户在编辑模式点击 [删除] 或在卡片 [⋮] 菜单选择删除
**THEN** 任务从看板中移除

**验收标准**：
- [x] 删除后面板关闭
- [x] 卡片从列中消失

### Scenario 6: 移动端适配

**WHEN** 用户在移动端（<768px）访问
**THEN** 列以 Tab 形式展示，详情面板全屏覆盖

**验收标准**：
- [x] Tab 可点击/滑动切换列
- [x] 详情面板全屏
- [x] AppBar 精简（隐藏搜索）

## Impact Analysis

### 影响的模块

- [ ] Domain（领域层）
- [ ] Application（应用层）
- [ ] Infrastructure（基础设施层）
- [ ] API（API 层）
- [x] Web（前端）
- [ ] Database（数据库）

### 性能影响

- 预期性能影响：无
- 纯前端内存操作，数据量小

### 安全影响

- 是否有安全影响：否

## Implementation Notes

### 技术实现方案

- 使用 SolidJS createStore 管理任务状态
- 响应式：CSS 媒体查询 + 条件渲染（桌面并排/移动 Tab）
- 复用现有 Menu 组件实现状态切换和更多操作
- 新增 Chip、TextField、IconButton 基础 UI 组件
- 详情面板使用 CSS transition 实现滑入/滑出动画

### 新增文件

```
web/src/types/kanban.ts
web/src/stores/kanbanStore.ts
web/src/components/ui/Chip.tsx
web/src/components/ui/TextField.tsx
web/src/components/ui/IconButton.tsx
web/src/components/kanban/Board.tsx
web/src/components/kanban/Column.tsx
web/src/components/kanban/TaskCard.tsx
web/src/components/kanban/TaskDetailPanel.tsx
web/src/pages/KanbanBoard.tsx
```

### 修改文件

```
web/src/app.tsx              → 路由指向 KanbanBoard
web/src/app.css              → 看板样式
web/src/layouts/MainLayout.tsx → AppBar 加 [+] 按钮
```

## Changelog

| 日期 | 版本 | 变更描述 | 变更人 |
|------|------|---------|--------|
| 2026-10-11 | 1.0 | 初始版本 | 0sdf0 |
