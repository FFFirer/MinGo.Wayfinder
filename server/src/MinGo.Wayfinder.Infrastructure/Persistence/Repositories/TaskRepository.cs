using Microsoft.EntityFrameworkCore;
using MinGo.Wayfinder.Domain.Entities;
using MinGo.Wayfinder.Domain.Interfaces;

namespace MinGo.Wayfinder.Infrastructure.Persistence.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<KanbanTask>> GetAllAsync(bool includeDeleted = false, CancellationToken cancellationToken = default)
    {
        var query = _context.Tasks.AsQueryable();

        if (!includeDeleted)
        {
            query = query.IgnoreQueryFilters().Where(t => !t.IsDeleted);
        }
        else
        {
            query = query.IgnoreQueryFilters();
        }

        return await query.OrderByDescending(t => t.CreatedAt).ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<KanbanTask>> GetByStatusAsync(Domain.Enums.KanbanTaskStatus status, bool includeDeleted = false, CancellationToken cancellationToken = default)
    {
        var query = _context.Tasks.AsQueryable();

        if (!includeDeleted)
        {
            query = query.IgnoreQueryFilters().Where(t => !t.IsDeleted);
        }
        else
        {
            query = query.IgnoreQueryFilters();
        }

        return await query
            .Where(t => t.Status == status)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<KanbanTask?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Tasks
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
    }

    public async Task<KanbanTask?> GetByUuidAsync(Guid uuid, CancellationToken cancellationToken = default)
    {
        return await _context.Tasks
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(t => t.Uuid == uuid, cancellationToken);
    }

    public async Task AddAsync(KanbanTask task, CancellationToken cancellationToken = default)
    {
        await _context.Tasks.AddAsync(task, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(KanbanTask task, CancellationToken cancellationToken = default)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
