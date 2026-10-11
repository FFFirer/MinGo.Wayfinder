using MinGo.Wayfinder.Domain.Enums;

namespace MinGo.Wayfinder.Domain.Entities;

public class KanbanTask
{
    public int Id { get; private set; }
    public Guid Uuid { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public KanbanTaskStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    public bool IsDeleted { get; private set; }

    protected KanbanTask() { }

    public KanbanTask(string title, string? description = null)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title is required", nameof(title));

        if (title.Length > 200)
            throw new ArgumentException("Title cannot exceed 200 characters", nameof(title));

        Uuid = Guid.NewGuid();
        Title = title;
        Description = description;
        Status = KanbanTaskStatus.Todo;
        IsDeleted = false;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = CreatedAt;
    }

    public void Update(string title, string? description, KanbanTaskStatus status)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title is required", nameof(title));

        if (title.Length > 200)
            throw new ArgumentException("Title cannot exceed 200 characters", nameof(title));

        Title = title;
        Description = description;
        Status = status;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Delete()
    {
        if (IsDeleted)
            throw new InvalidOperationException("Task is already deleted");

        IsDeleted = true;
        UpdatedAt = DateTime.UtcNow;
    }
}
