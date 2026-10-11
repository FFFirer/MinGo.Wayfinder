using Microsoft.EntityFrameworkCore;
using MinGo.Wayfinder.API.Middleware;
using MinGo.Wayfinder.Application.Interfaces;
using MinGo.Wayfinder.Application.Services;
using MinGo.Wayfinder.Domain.Interfaces;
using MinGo.Wayfinder.Infrastructure.Persistence;
using MinGo.Wayfinder.Infrastructure.Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddSimpleConsole(options =>
{
    options.SingleLine = true;
    options.TimestampFormat = "[HH:mm:ss] ";
});

// Add services to the container
builder.Services.AddControllers();

// Configure EF Core with SQLite
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=wayfinder.db";
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString, sqlOptions =>
        sqlOptions.MigrationsAssembly("MinGo.Wayfinder.Migrations")));

// Register application services
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Configure NSwag
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "v1";
    config.Title = "MinGo.Wayfinder API";
    config.Version = "v1";
    config.Description = "Kanban Task Management API";
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/v1/swagger.json";
    });
}

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
