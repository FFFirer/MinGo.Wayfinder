using MinGo.Wayfinder.Application.DTOs;
using MinGo.Wayfinder.Application.Interfaces;
using MinGo.Wayfinder.Domain.Entities;
using MinGo.Wayfinder.Domain.Interfaces;

namespace MinGo.Wayfinder.Application.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<IEnumerable<TaskDto>> GetAllTasksAsync(bool includeDeleted = false, CancellationToken cancellationToken = default)
    {
        var tasks = await _taskRepository.GetAllAsync(includeDeleted, cancellationToken);
        return tasks.Select(MapToDto);
    }

    public async Task<IEnumerable<TaskDto>> GetTasksByStatusAsync(Domain.Enums.KanbanTaskStatus status, bool includeDeleted = false, CancellationToken cancellationToken = default)
    {
        var tasks = await _taskRepository.GetByStatusAsync(status, includeDeleted, cancellationToken);
        return tasks.Select(MapToDto);
    }

    public async Task<TaskDto?> GetTaskByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var task = await _taskRepository.GetByIdAsync(id, cancellationToken);
        return task == null || task.IsDeleted ? null : MapToDto(task);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto, CancellationToken cancellationToken = default)
    {
        var task = new KanbanTask(dto.Title, dto.Description);
        await _taskRepository.AddAsync(task, cancellationToken);
        return MapToDto(task);
    }

    public async Task<TaskDto> UpdateTaskAsync(int id, UpdateTaskDto dto, CancellationToken cancellationToken = default)
    {
        var task = await _taskRepository.GetByIdAsync(id, cancellationToken);
        if (task == null || task.IsDeleted)
            throw new KeyNotFoundException($"Task with id {id} not found");

        task.Update(dto.Title, dto.Description, dto.Status);
        await _taskRepository.UpdateAsync(task, cancellationToken);
        return MapToDto(task);
    }

    public async Task DeleteTaskAsync(int id, CancellationToken cancellationToken = default)
    {
        var task = await _taskRepository.GetByIdAsync(id, cancellationToken);
        if (task == null || task.IsDeleted)
            throw new KeyNotFoundException($"Task with id {id} not found");

        task.Delete();
        await _taskRepository.UpdateAsync(task, cancellationToken);
    }

    private static TaskDto MapToDto(KanbanTask task)
    {
        return new TaskDto(
            task.Id,
            task.Title,
            task.Description,
            task.Status,
            task.CreatedAt,
            task.UpdatedAt,
            task.IsDeleted
        );
    }
}
