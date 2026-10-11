using MinGo.Wayfinder.Application.DTOs;

namespace MinGo.Wayfinder.Application.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetAllTasksAsync(bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<IEnumerable<TaskDto>> GetTasksByStatusAsync(Domain.Enums.KanbanTaskStatus status, bool includeDeleted = false, CancellationToken cancellationToken = default);
    Task<TaskDto?> GetTaskByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto dto, CancellationToken cancellationToken = default);
    Task<TaskDto> UpdateTaskAsync(int id, UpdateTaskDto dto, CancellationToken cancellationToken = default);
    Task DeleteTaskAsync(int id, CancellationToken cancellationToken = default);
}
