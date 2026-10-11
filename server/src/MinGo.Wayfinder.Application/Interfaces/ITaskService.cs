using MinGo.Wayfinder.Application.DTOs;

namespace MinGo.Wayfinder.Application.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetAllTasksAsync(bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<IEnumerable<TaskDto>> GetTasksByStatusAsync(Domain.Enums.KanbanTaskStatus status, bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<TaskDto?> GetTaskByUuidAsync(Guid uuid, CancellationToken cancellationToken = default);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto dto, CancellationToken cancellationToken = default);
    Task<TaskDto> UpdateTaskAsync(Guid uuid, UpdateTaskDto dto, CancellationToken cancellationToken = default);
    Task DeleteTaskAsync(Guid uuid, CancellationToken cancellationToken = default);
}
