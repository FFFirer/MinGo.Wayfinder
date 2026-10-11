using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MinGo.Wayfinder.Infrastructure.Persistence;

namespace MinGo.Wayfinder.Migrations.AppDb;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING")
            ?? "Data Source=wayfinder.db";

        optionsBuilder.UseSqlite(connectionString);

        return new AppDbContext(optionsBuilder.Options);
    }
}
