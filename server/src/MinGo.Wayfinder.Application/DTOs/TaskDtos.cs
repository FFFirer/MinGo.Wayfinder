using MinGo.Wayfinder.Domain.Enums;

namespace MinGo.Wayfinder.Application.DTOs;

public record TaskDto(
    Guid Uuid,
    int Id,
    string Title,
    string? Description,
    KanbanTaskStatus Status,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record CreateTaskDto(
    string Title,
    string? Description,
    KanbanTaskStatus Status = KanbanTaskStatus.Todo
);

public record UpdateTaskDto(
    string Title,
    string? Description,
    KanbanTaskStatus Status
);
