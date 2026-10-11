using MinGo.Wayfinder.Domain.Entities;

namespace MinGo.Wayfinder.Domain.Interfaces;

public interface ITaskRepository
{
    Task<IEnumerable<KanbanTask>> GetAllAsync(bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<IEnumerable<KanbanTask>> GetByStatusAsync(Domain.Enums.KanbanTaskStatus status, bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<KanbanTask?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task AddAsync(KanbanTask task, CancellationToken cancellationToken = default);
    Task UpdateAsync(KanbanTask task, CancellationToken cancellationToken = default);
}
