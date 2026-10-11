## ADDED Requirements

### Requirement: 软删除标记
系统 SHALL 使用 IsDeleted 字段标记实体的删除状态，而非物理删除。

#### Scenario: 新建实体默认未删除
- **WHEN** 创建新实体
- **THEN** 实体的 IsDeleted 字段 MUST 为 false

#### Scenario: 删除操作标记为已删除
- **WHEN** 对实体执行删除操作
- **THEN** 系统 MUST 将 IsDeleted 设置为 true
- **THEN** 系统 MUST 更新 UpdatedAt 时间戳
- **THEN** 系统 MUST NOT 从数据库中物理删除记录

### Requirement: 查询过滤已删除记录
所有默认查询 SHALL 过滤掉 IsDeleted = true 的记录，除非明确要求包含。

#### Scenario: 默认查询排除已删除记录
- **WHEN** 执行查询操作且未指定 includeDeleted 参数
- **THEN** 查询结果 MUST 仅包含 IsDeleted = false 的记录

#### Scenario: 显式包含已删除记录
- **WHEN** 执行查询操作且 includeDeleted = true
- **THEN** 查询结果 MUST 包含所有记录，无论 IsDeleted 值

#### Scenario: 仅查询已删除记录
- **WHEN** 执行查询操作且 onlyDeleted = true
- **THEN** 查询结果 MUST 仅包含 IsDeleted = true 的记录

### Requirement: 软删除实体不可操作
已软删除的实体 SHALL 不允许再次更新或删除。

#### Scenario: 更新已删除实体
- **WHEN** 尝试更新 IsDeleted = true 的实体
- **THEN** 系统 MUST 返回 404 状态码

#### Scenario: 删除已删除实体
- **WHEN** 尝试删除 IsDeleted = true 的实体
- **THEN** 系统 MUST 返回 404 状态码

### Requirement: 软删除适用于所有实体
软删除机制 SHALL 适用于所有领域实体，不仅限于 Task。

#### Scenario: 新增实体自动支持软删除
- **WHEN** 新增领域实体
- **THEN** 实体 MUST 包含 IsDeleted 字段
- **THEN** 仓储层 MUST 默认过滤已删除记录
