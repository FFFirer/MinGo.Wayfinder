using Microsoft.AspNetCore.Mvc;
using MinGo.Wayfinder.Application.DTOs;
using MinGo.Wayfinder.Application.Interfaces;
using MinGo.Wayfinder.Domain.Enums;

namespace MinGo.Wayfinder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll(
        [FromQuery] bool includeDeleted = false,
        [FromQuery] KanbanTaskStatus? status = null,
        CancellationToken cancellationToken = default)
    {
        IEnumerable<TaskDto> tasks;

        if (status.HasValue)
        {
            tasks = await _taskService.GetTasksByStatusAsync(status.Value, includeDeleted, cancellationToken);
        }
        else
        {
            tasks = await _taskService.GetAllTasksAsync(includeDeleted, cancellationToken);
        }

        return Ok(tasks);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TaskDto>> GetById(int id, CancellationToken cancellationToken = default)
    {
        var task = await _taskService.GetTaskByIdAsync(id, cancellationToken);
        return task == null ? NotFound() : Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> Create([FromBody] CreateTaskDto dto, CancellationToken cancellationToken = default)
    {
        var task = await _taskService.CreateTaskAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TaskDto>> Update(int id, [FromBody] UpdateTaskDto dto, CancellationToken cancellationToken = default)
    {
        var task = await _taskService.UpdateTaskAsync(id, dto, cancellationToken);
        return Ok(task);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken = default)
    {
        await _taskService.DeleteTaskAsync(id, cancellationToken);
        return NoContent();
    }
}
