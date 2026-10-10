# AI Agent 协作指南

本文件为 AI Agent 提供项目上下文和协作规范，帮助快速理解项目并做出正确的决策。

## 项目概述

MinGo.Wayfinder 是一个前后端混合架构的导航应用：
- **后端**: ASP.NET Core Web API，采用整洁架构 + 领域驱动设计
- **前端**: SolidJS SPA 应用，采用 Material Design 3 设计语言
- **数据访问**: Entity Framework Core + SQLite/PostgreSQL
- **迁移管理**: 独立的 EF Core 迁移程序集（按数据库区分）

## 技术栈约束

### 后端技术栈

- **ASP.NET Core**: 使用最新的稳定版本，构建 RESTful Web API
- **C#**: 使用最新的语言特性
- **Entity Framework Core**: ORM 框架，支持 SQLite 和 PostgreSQL
- **架构模式**: 整洁架构（Clean Architecture）+ 领域驱动设计（DDD）
- **依赖注入**: 使用 ASP.NET Core 内置的 DI 容器
- **配置**: 使用 appsettings.json 和环境变量
- **迁移管理**: 独立的迁移程序集，按数据库区分

### 架构分层

```
依赖方向：外层 → 内层

API (表示层)
  ↓
Application (应用层)
  ↓
Domain (领域层) ← Infrastructure (基础设施层)
```

**领域层 (Domain)**：核心业务逻辑，不依赖任何外部层
- 实体 (Entities)、值对象 (Value Objects)、聚合根 (Aggregates)
- 领域事件 (Domain Events)
- 领域接口 (Interfaces)

**应用层 (Application)**：编排业务流程
- 应用服务 (Application Services)
- DTO (数据传输对象)
- 接口定义 (由基础设施层实现)

**基础设施层 (Infrastructure)**：技术实现
- EF Core DbContext 和仓储实现
- 外部服务集成（邮件、缓存等）

**API 层 (Presentation)**：HTTP 接口
- 控制器 (Controllers)
- 中间件 (Middleware)
- 过滤器 (Filters)

### 前端技术栈

- **SolidJS**: 使用函数式组件和响应式原语（createSignal, createEffect, createMemo）
- **TailwindCSS v4**: 使用新的 CSS-first 配置方式，注意与 v3 的语法差异
- **daisyui**: 基于 TailwindCSS 的组件库，优先使用 daisyui 提供的组件
- **Material Design 3**: 遵循 Google 的 MD3 设计规范

### 禁止事项

- ❌ 不要引入其他后端框架（Spring, Express 等）
- ❌ 不要引入其他前端框架（React, Vue 等）
- ❌ 不要使用 TailwindCSS v3 的配置方式（tailwind.config.js）
- ❌ 不要使用与 MD3 冲突的设计风格
- ❌ 不要在 API 控制器中直接编写业务逻辑，应使用服务层

## 代码规范

### 后端代码结构

```
server/
├── Domain/                      # 领域层（核心，无外部依赖）
│   ├── Entities/               # 领域实体
│   │   └── Order.cs
│   ├── ValueObjects/           # 值对象
│   │   └── Address.cs
│   ├── Aggregates/             # 聚合根
│   │   └── OrderAggregate.cs
│   ├── Interfaces/             # 领域接口（仓储接口）
│   │   └── IOrderRepository.cs
│   ├── Events/                 # 领域事件
│   │   └── OrderCreatedEvent.cs
│   └── Enums/                  # 枚举
│       └── OrderStatus.cs
│
├── Application/                # 应用层（编排业务流程）
│   ├── Interfaces/             # 应用服务接口
│   │   └── IOrderService.cs
│   ├── Services/               # 应用服务实现
│   │   └── OrderService.cs
│   ├── DTOs/                   # 数据传输对象
│   │   ├── CreateOrderDto.cs
│   │   └── OrderDto.cs
│   └── Mappings/               # 对象映射（实体 ↔ DTO）
│       └── OrderMapping.cs
│
├── Infrastructure/             # 基础设施层（技术实现）
│   ├── Persistence/            # 数据持久化
│   │   ├── AppDbContext.cs     # EF Core DbContext
│   │   ├── Repositories/       # 仓储实现
│   │   │   └── OrderRepository.cs
│   │   └── Configurations/     # EF Core 实体配置
│   │       └── OrderConfiguration.cs
│   └── Services/               # 外部服务实现
│       └── EmailService.cs
│
├── API/                        # Web API 层（表示层）
│   ├── Controllers/            # API 控制器
│   │   └── OrdersController.cs
│   ├── Middleware/             # 自定义中间件
│   │   └── ExceptionMiddleware.cs
│   ├── Filters/                # 过滤器
│   │   └── ValidationFilter.cs
│   └── Program.cs              # 应用入口和配置
│
└── Migrations/                 # EF Core 迁移程序集（独立）
    ├── AppDb/                  # 主数据库迁移
    │   ├── AppDbContextFactory.cs
    │   └── Migrations/
    └── OtherDb/                # 其他数据库（如有）
        ├── OtherDbContextFactory.cs
        └── Migrations/
```

### 后端代码规范

#### 领域层示例

```csharp
// Domain/Entities/Order.cs
public class Order
{
    public Guid Id { get; private set; }
    public string OrderNumber { get; private set; }
    public OrderStatus Status { get; private set; }
    public Address ShippingAddress { get; private set; }
    public DateTime CreatedAt { get; private set; }
    
    private readonly List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();
    
    // EF Core 需要无参构造函数
    protected Order() { }
    
    public Order(string orderNumber, Address shippingAddress)
    {
        Id = Guid.NewGuid();
        OrderNumber = orderNumber;
        ShippingAddress = shippingAddress;
        Status = OrderStatus.Pending;
        CreatedAt = DateTime.UtcNow;
    }
    
    public void AddItem(Product product, int quantity)
    {
        // 业务规则验证
        if (quantity <= 0)
            throw new DomainException("Quantity must be greater than zero");
            
        _items.Add(new OrderItem(Id, product, quantity));
    }
}

// Domain/ValueObjects/Address.cs
public record Address(
    string Street,
    string City,
    string PostalCode,
    string Country
);

// Domain/Interfaces/IOrderRepository.cs
public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(Order order, CancellationToken cancellationToken = default);
    Task UpdateAsync(Order order, CancellationToken cancellationToken = default);
}
```

#### 应用层示例

```csharp
// Application/DTOs/CreateOrderDto.cs
public record CreateOrderDto(
    string OrderNumber,
    string Street,
    string City,
    string PostalCode,
    string Country,
    List<OrderItemDto> Items
);

// Application/Interfaces/IOrderService.cs
public interface IOrderService
{
    Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, CancellationToken cancellationToken = default);
    Task<OrderDto?> GetOrderByIdAsync(Guid id, CancellationToken cancellationToken = default);
}

// Application/Services/OrderService.cs
public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;
    
    public OrderService(IOrderRepository orderRepository, IMapper mapper)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
    }
    
    public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto, CancellationToken cancellationToken = default)
    {
        var address = new Address(dto.Street, dto.City, dto.PostalCode, dto.Country);
        var order = new Order(dto.OrderNumber, address);
        
        foreach (var item in dto.Items)
        {
            // 获取产品信息并添加到订单
            // ...
        }
        
        await _orderRepository.AddAsync(order, cancellationToken);
        return _mapper.Map<OrderDto>(order);
    }
}
```

#### 基础设施层示例

```csharp
// Infrastructure/Persistence/AppDbContext.cs
public class AppDbContext : DbContext
{
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}

// Infrastructure/Persistence/Configurations/OrderConfiguration.cs
public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);
        builder.Property(o => o.OrderNumber).HasMaxLength(50).IsRequired();
        builder.OwnsOne(o => o.ShippingAddress);
        builder.HasMany(o => o.Items).WithOne().HasForeignKey("OrderId");
    }
}

// Infrastructure/Persistence/Repositories/OrderRepository.cs
public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;
    
    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
    }
    
    public async Task AddAsync(Order order, CancellationToken cancellationToken = default)
    {
        await _context.Orders.AddAsync(order, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
```

#### EF Core 迁移管理

独立的迁移程序集，按数据库区分：

```csharp
// Migrations/AppDb/AppDbContextFactory.cs
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        
        // 默认使用 SQLite，生产环境使用 PostgreSQL
        var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING") 
            ?? "Data Source=wayfinder.db";
        
        if (connectionString.Contains("Host="))
        {
            optionsBuilder.UseNpgsql(connectionString);
        }
        else
        {
            optionsBuilder.UseSqlite(connectionString);
        }
        
        return new AppDbContext(optionsBuilder.Options);
    }
}
```

**生成迁移命令**：

```bash
# 为主数据库生成迁移（在 Migrations/AppDb 目录）
dotnet ef migrations add InitialCreate \
  --project src/Migrations/AppDb \
  --startup-project src/API \
  --output-dir Migrations

# 应用迁移
dotnet ef database update \
  --project src/Migrations/AppDb \
  --startup-project src/API
```

### 后端规范要点

#### 架构规则

- **依赖方向**：外层依赖内层，内层不依赖外层
  - API → Application → Domain ← Infrastructure
  - Domain 层不依赖任何外部层
  - Infrastructure 实现 Domain 定义的接口
  
- **领域层 (Domain)**：
  - 实体使用私有设置器，通过方法修改状态
  - 值对象使用 `record` 类型，不可变
  - 聚合根维护一致性边界
  - 业务规则验证在领域层完成
  
- **应用层 (Application)**：
  - 编排业务流程，不包含业务规则
  - 使用 DTO 进行数据传输
  - 事务管理在应用层处理
  
- **基础设施层 (Infrastructure)**：
  - 实现领域层定义的接口（如仓储）
  - EF Core 配置使用 Fluent API
  - 不暴露 EF Core 类型到外层
  
- **API 层 (Presentation)**：
  - 控制器只负责 HTTP 协议处理
  - 使用模型绑定和验证
  - 返回 DTO，不返回领域实体

#### 技术规则

- 使用依赖注入管理服务生命周期（Transient/Scoped/Singleton）
- 使用 async/await 进行异步编程
- 使用记录类型（record）作为 DTO 和值对象
- 配置使用 IOptions<T> 模式
- 使用 CancellationToken 支持操作取消
- EF Core 查询使用 Include/ThenInclude 进行预加载
- 避免 N+1 查询问题

#### 数据库配置

支持 SQLite（开发）和 PostgreSQL（生产）：

```json
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=wayfinder.db"
  }
}

// appsettings.Production.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=wayfinder;Username=postgres;Password=secret"
  }
}
```

```csharp
// Program.cs
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (connectionString.Contains("Host="))
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(connectionString));
}
else
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite(connectionString));
}
```

### 前端代码结构

```
web/
├── components/        # 可复用组件
│   ├── ui/           # 基础 UI 组件
│   └── features/     # 业务组件
├── pages/            # 页面组件
├── stores/           # 全局状态管理
├── services/         # API 调用封装
├── utils/            # 工具函数
└── App.tsx           # 根组件
```

### 前端组件结构

```tsx
// 组件文件命名：PascalCase.tsx
// 位置：src/components/

import { createSignal } from 'solid-js';

interface Props {
  title: string;
}

export function MyComponent(props: Props) {
  const [count, setCount] = createSignal(0);
  
  return (
    <div class="...">
      {/* 使用 TailwindCSS + daisyui 类名 */}
    </div>
  );
}
```

### 样式规范

- 优先使用 daisyui 组件类名（btn, card, modal 等）
- 使用 TailwindCSS 工具类进行微调
- 颜色使用 daisyui 主题变量（primary, secondary, accent 等）
- 响应式设计使用 TailwindCSS 断点前缀（sm:, md:, lg:）

## 项目结构总览

```
MinGo.Wayfinder/
├── server/                # ASP.NET Core 后端项目
│   ├── Domain/            # 领域层（核心业务）
│   │   ├── Entities/      # 领域实体
│   │   ├── ValueObjects/  # 值对象
│   │   ├── Aggregates/    # 聚合根
│   │   ├── Interfaces/    # 领域接口
│   │   └── Events/        # 领域事件
│   │
│   ├── Application/       # 应用层（业务编排）
│   │   ├── Interfaces/    # 应用服务接口
│   │   ├── Services/      # 应用服务实现
│   │   └── DTOs/          # 数据传输对象
│   │
│   ├── Infrastructure/    # 基础设施层（技术实现）
│   │   ├── Persistence/   # EF Core 数据访问
│   │   │   ├── AppDbContext.cs
│   │   │   ├── Repositories/
│   │   │   └── Configurations/
│   │   └── Services/      # 外部服务集成
│   │
│   ├── API/               # Web API 层（HTTP 接口）
│   │   ├── Controllers/   # API 控制器
│   │   ├── Middleware/    # 中间件
│   │   └── Program.cs     # 应用入口
│   │
│   └── Migrations/        # EF Core 迁移程序集（独立）
│       ├── AppDb/         # 主数据库迁移
│       └── OtherDb/       # 其他数据库迁移
│
├── web/                   # SolidJS 前端项目
│   ├── components/        # 前端组件
│   ├── pages/             # 页面
│   ├── services/          # API 调用封装
│   └── App.tsx            # 前端入口
│
├── specs/                 # OpenSpec 最终规格
├── changes/               # OpenSpec 变更提案
│
├── tests/                 # 测试项目
│   ├── Domain.Tests/      # 领域层单元测试
│   ├── Application.Tests/ # 应用层单元测试
│   ├── Infrastructure.Tests/# 基础设施层单元测试
│   ├── API.Tests/         # API 集成测试
│   └── Web.Tests/         # 前端测试
│
├── docs/                  # 文档
├── AGENTS.md             # AI Agent 指南
└── README.md             # 项目说明
```

## 前后端协作

### API 调用规范

前端通过 `web/services/` 目录封装 API 调用：

```typescript
// web/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function fetchWeatherForecasts() {
  const response = await fetch(`${API_BASE_URL}/api/weather`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecasts');
  }
  return response.json();
}
```

### CORS 配置

后端需要配置 CORS 以允许前端跨域访问：

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Vite 默认端口
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ...

app.UseCors();
```

### 开发流程

1. **添加新功能**：
   - 后端：创建 Controller/Endpoint → 添加 Service → 定义 DTO
   - 前端：创建 API 服务 → 创建页面/组件 → 集成数据

2. **调试**：
   - 后端 API 默认运行在 `http://localhost:5000`
   - 前端开发服务器默认运行在 `http://localhost:5173`
   - 使用浏览器开发者工具查看网络请求

## 开发指南

### 添加新功能（完整流程）

以添加"产品管理"功能为例：

#### 1. 领域层 (Domain)

```bash
# 创建领域实体和接口
server/Domain/Entities/Product.cs
server/Domain/Interfaces/IProductRepository.cs
```

```csharp
// Domain/Entities/Product.cs
public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public decimal Price { get; private set; }
    
    protected Product() { }
    
    public Product(string name, decimal price)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Product name is required");
        if (price <= 0)
            throw new DomainException("Price must be greater than zero");
            
        Id = Guid.NewGuid();
        Name = name;
        Price = price;
    }
}

// Domain/Interfaces/IProductRepository.cs
public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Product>> GetAllAsync(CancellationToken cancellationToken = default);
    Task AddAsync(Product product, CancellationToken cancellationToken = default);
}
```

#### 2. 应用层 (Application)

```bash
server/Application/DTOs/ProductDto.cs
server/Application/Interfaces/IProductService.cs
server/Application/Services/ProductService.cs
```

```csharp
// Application/DTOs/ProductDto.cs
public record ProductDto(Guid Id, string Name, decimal Price);
public record CreateProductDto(string Name, decimal Price);

// Application/Services/ProductService.cs
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    
    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }
    
    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto, CancellationToken cancellationToken = default)
    {
        var product = new Product(dto.Name, dto.Price);
        await _productRepository.AddAsync(product, cancellationToken);
        return new ProductDto(product.Id, product.Name, product.Price);
    }
}
```

#### 3. 基础设施层 (Infrastructure)

```bash
server/Infrastructure/Persistence/Configurations/ProductConfiguration.cs
server/Infrastructure/Persistence/Repositories/ProductRepository.cs
```

```csharp
// Infrastructure/Persistence/Configurations/ProductConfiguration.cs
public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Name).HasMaxLength(200).IsRequired();
        builder.Property(p => p.Price).HasPrecision(18, 2);
    }
}

// Infrastructure/Persistence/Repositories/ProductRepository.cs
public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;
    
    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task AddAsync(Product product, CancellationToken cancellationToken = default)
    {
        await _context.Products.AddAsync(product, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
```

#### 4. API 层

```bash
server/API/Controllers/ProductsController.cs
```

```csharp
// API/Controllers/ProductsController.cs
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    
    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }
    
    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto, CancellationToken cancellationToken)
    {
        var product = await _productService.CreateProductAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }
}
```

#### 5. 注册依赖注入

```csharp
// server/API/Program.cs
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
```

#### 6. 生成数据库迁移

```bash
dotnet ef migrations add AddProduct \
  --project server/Migrations/AppDb \
  --startup-project server/API
```

### 添加新页面（前端）

1. 在 `web/pages/` 创建页面组件
2. 在路由配置中注册路由
3. 使用 daisyui 的布局组件（drawer, navbar 等）

### 添加新组件（前端）

1. 判断是 UI 组件还是业务组件
2. 在对应目录创建组件文件
3. 提供清晰的 Props 类型定义
4. 使用 daisyui 组件作为基础（如果适用）

### 状态管理（前端）

- 局部状态：使用 `createSignal`
- 派生状态：使用 `createMemo`
- 全局状态：使用 SolidJS 的 Context 或 createStore
- 异步数据：使用 `createResource`

## 常见问题

### TailwindCSS v4 变化

- 配置文件使用 `app.css` 中的 `@theme` 指令
- 不再使用 `tailwind.config.js`
- 插件通过 CSS 导入

### daisyui 主题

- 默认主题在 CSS 中配置
- 支持暗色模式切换
- 使用 `data-theme` 属性切换主题

## 参考资源

### 后端

- [ASP.NET Core 文档](https://learn.microsoft.com/aspnet/core/)
- [C# 文档](https://learn.microsoft.com/dotnet/csharp/)
- [EF Core 文档](https://learn.microsoft.com/ef/core/)（如果使用）

### 前端

- [SolidJS 文档](https://www.solidjs.com/)
- [TailwindCSS v4 文档](https://tailwindcss.com/)
- [daisyui 文档](https://daisyui.com/)
- [Material Design 3](https://m3.material.io/)

## 设计文档

详细的技术架构和设计理念请查看：

- [前端架构设计](./docs/前端架构设计.md)

## OpenSpec - Spec 驱动开发

本项目使用 [OpenSpec](https://github.com/Fission-AI/OpenSpec) 进行 Spec 驱动开发（SDD），通过 Markdown specs 在编码前对齐人类和 AI。

### 核心概念

- **specs/**：最终规格（Source of Truth），存放已确认的功能规格
- **changes/**：变更提案（Proposals），存放待评审的需求变更
- **WHEN/THEN**：使用场景格式描述需求和变更

### 工作流程

```
explore → propose → apply → sync → archive
```

1. **探索（Explore）**：使用 `/opsx:explore` 探索需求
2. **提案（Propose）**：使用 `/opsx:propose` 在 `changes/` 创建变更提案
3. **应用（Apply）**：使用 `/opsx:apply` 将接受的变更应用到 `specs/`
4. **同步（Sync）**：确保代码实现与 spec 保持同步
5. **归档（Archive）**：使用 `/opsx:archive` 归档已完成的变更

### Slash Commands

- `/opsx:explore` - 探索需求和可能性
- `/opsx:propose` - 创建变更提案
- `/opsx:apply` - 应用变更到 specs
- `/opsx:archive` - 归档已完成的变更

### 目录结构

```
MinGo.Wayfinder/
├── specs/              # 最终规格（Source of Truth）
│   ├── README.md
│   ├── TEMPLATE.md    # Spec 文件模板
│   └── [feature].md   # 功能规格文档
├── changes/           # 变更提案（Proposals）
│   ├── README.md
│   ├── TEMPLATE.md    # 变更提案模板
│   └── [change].md    # 变更提案文档
└── docs/              # 其他文档
```

### AI Agent 职责

当协助开发功能时，AI Agent 应该：

1. **查看 specs/**：了解当前功能的最终规格
2. **查看 changes/**：了解待处理的变更提案
3. **遵循 WHEN/THEN**：按照 spec 中的场景实现功能
4. **提出变更**：如需调整，在 `changes/` 创建提案（使用 TEMPLATE.md）
5. **保持同步**：确保代码实现与 spec 一致
6. **遵循架构**：按照整洁架构分层实现（Domain → Application → Infrastructure → API）

### 需求变更流程

#### 提出变更

1. 在 `changes/` 目录创建变更提案文档（复制 TEMPLATE.md）
2. 使用 WHEN/THEN 格式描述变更
3. 标记状态为 `📋 Proposed`

#### 评审变更

团队评审后更新状态：
- ✅ **Accepted**：接受变更，进入开发
- ❌ **Rejected**：拒绝变更
- 🔄 **Revision Needed**：需要修改

#### 应用变更

变更被接受后：
1. 使用 `/opsx:apply` 将变更应用到 `specs/`
2. 更新相关 spec 文件
3. 开始开发实现

#### 完成变更

开发完成后：
1. 更新变更状态为 `✔️ Completed`
2. 使用 `/opsx:archive` 归档变更
3. 在 `docs/changelog/CHANGELOG.md` 中记录变更

### 变更状态标识

- 📋 **Proposed**：已提出，待评审
- ✅ **Accepted**：已接受，待应用
- 🚧 **In Progress**：正在应用/开发
- ✔️ **Completed**：已完成并归档
- ❌ **Rejected**：已拒绝
- 🔄 **Revision Needed**：需要修改

### Spec 状态标识

- 📝 **Draft**：草稿
- ✅ **Active**：生效中
- 🔄 **Deprecated**：已废弃
- ❌ **Removed**：已移除

### 相关文档

- [OpenSpec 文档](./specs/README.md)
- [变更提案](./changes/README.md)
- [变更日志](./docs/changelog/CHANGELOG.md)
- [OpenSpec GitHub](https://github.com/Fission-AI/OpenSpec)
