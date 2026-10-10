import { type Component } from 'solid-js';
import { type Task, type TaskStatus, COLUMNS, STATUS_MAP } from '../../types/kanban';
import { type KanbanStore } from '../../stores/kanbanStore';
import Chip from '../ui/Chip';
import IconButton from '../ui/IconButton';
import Menu from '../ui/Menu';

interface TaskCardProps {
  task: Task;
  store: KanbanStore;
}

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MoreVertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const TaskCard: Component<TaskCardProps> = (props) => {
  const statusDef = () => STATUS_MAP[props.task.status];

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-card-action]')) return;
    props.store.selectTask(props.task.id);
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    props.store.changeTaskStatus(props.task.id, newStatus);
  };

  const handleDelete = () => {
    props.store.deleteTask(props.task.id);
  };

  const handleEdit = () => {
    props.store.selectTask(props.task.id);
    props.store.enterEditMode();
  };

  return (
    <div
      class="kanban-card"
      onClick={handleClick}
    >
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex-1 min-w-0">
          <span class="inline-block px-1.5 py-0.5 mr-2 rounded-extra-small bg-surface-container-high text-on-surface md-label-medium font-mono select-all cursor-text">#{props.task.id}</span>
          <h3 class="md-title-medium text-on-surface inline line-clamp-2">
            {props.task.title}
          </h3>
        </div>
        <div data-card-action>
          <Menu anchor="bottom end" trigger={
            <IconButton size="small" title="更多操作">
              <MoreVertIcon />
            </IconButton>
          }>
            <Menu.Item
              label="编辑"
              onClick={handleEdit}
              icon={() => (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              )}
            />
            <Menu.Divider />
            <Menu.Item
              label="删除"
              onClick={handleDelete}
              icon={() => (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              )}
            />
          </Menu>
        </div>
      </div>

      {props.task.description && (
        <p class="md-body-medium text-on-surface-variant line-clamp-2 mb-3">
          {props.task.description}
        </p>
      )}

      <div data-card-action>
        <Menu anchor="bottom start" trigger={
          <Chip
            label={statusDef().label}
            clickable
            trailingIcon={<ChevronDownIcon />}
          />
        }>
          {COLUMNS.map(col => (
            <Menu.Item
              label={col.label}
              selected={col.key === props.task.status}
              onClick={() => handleStatusChange(col.key)}
            />
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default TaskCard;
