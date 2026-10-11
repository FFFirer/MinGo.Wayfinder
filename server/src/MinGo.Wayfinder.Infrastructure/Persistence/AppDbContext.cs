using Microsoft.EntityFrameworkCore;
using MinGo.Wayfinder.Domain.Entities;

namespace MinGo.Wayfinder.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public DbSet<KanbanTask> Tasks => Set<KanbanTask>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlite(options =>
                options.MigrationsAssembly("MinGo.Wayfinder.Migrations"));
        }
    }
}
