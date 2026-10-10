# kanban-board Specification

## Purpose
TBD - created by archiving change kanban-ui-improvements. Update Purpose after archive.
## Requirements
### Requirement: 看板铺满剩余高度
看板容器 SHALL 填满 MainLayout 中 `<main>` 区域的剩余高度，底部不出现空白区域。

#### Scenario: 桌面端看板铺满
- **WHEN** 用户在桌面端访问看板页面
- **THEN** 看板四列区域从 AppBar 下方延伸至视口底部，无额外空白

#### Scenario: 移动端看板铺满
- **WHEN** 用户在移动端访问看板页面
- **THEN** Tab 栏 + 列内容区域填满视口剩余高度，可滚动查看卡片

### Requirement: 卡片显示任务 ID
每张任务卡片 SHALL 在标题区域显示任务 ID，格式为 `#N`（N 为数字 ID）。

#### Scenario: 卡片显示 ID
- **WHEN** 看板渲染任务卡片
- **THEN** 卡片标题前显示 `#1`、`#2` 等 ID，使用 `md-label-small` 样式和低对比度颜色

### Requirement: 创建时间在详情面板显示
任务详情面板 SHALL 在查看模式和编辑模式中均显示任务创建时间。

#### Scenario: 查看模式显示创建时间
- **WHEN** 用户打开任务详情面板（查看模式）
- **THEN** 标题下方显示创建时间文本，格式为 "创建于 YYYY-MM-DD"

#### Scenario: 编辑模式显示创建时间
- **WHEN** 用户进入编辑模式
- **THEN** 标题输入框下方显示创建时间（只读文本），格式为 "创建于 YYYY-MM-DD"

