using MinGo.Wayfinder.Domain.Enums;

namespace MinGo.Wayfinder.Application.DTOs;

public record TaskDto(
    int Id,
    string Title,
    string? Description,
    KanbanTaskStatus Status,
    long CreatedAt,
    long UpdatedAt,
    bool IsDeleted
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
