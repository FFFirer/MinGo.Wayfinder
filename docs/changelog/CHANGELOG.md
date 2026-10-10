# 变更日志

本文件记录 MinGo.Wayfinder 项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增
- 初始化项目结构 (2026-10-11)
- 建立 spec 模式的迭代追踪机制 (2026-10-11)

### 变更
- 无

### 修复
- 无

## [1.0.0] - 2026-10-11

### 新增
- 项目初始化
- 建立前后端混合架构
  - 后端：ASP.NET Core Web API + EF Core + SQLite/PostgreSQL
  - 前端：SolidJS + daisyui + TailwindCSS v4
- 采用整洁架构 + 领域驱动设计
- 建立独立的 EF Core 迁移程序集
- 创建项目文档结构
  - README.md：项目概述
  - AGENTS.md：AI Agent 协作指南
  - docs/spec/：产品规格文档
  - docs/changelog/：变更日志

---

## 变更类型说明

- **新增**：新功能
- **变更**：对现有功能的修改
- **弃用**：即将移除的功能
- **移除**：已移除的功能
- **修复**：问题修复
- **安全**：安全性修复

## 版本发布流程

1. 在 `docs/spec/releases/` 中创建版本发布计划
2. 完成所有计划的功能开发
3. 更新本文件的 `[未发布]` 部分
4. 将 `[未发布]` 改为版本号并添加发布日期
5. 创建 git tag：`git tag -a v1.0.0 -m "Release v1.0.0"`
6. 推送到远程：`git push origin v1.0.0`
