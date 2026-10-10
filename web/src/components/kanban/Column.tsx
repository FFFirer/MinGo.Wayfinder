import { type Component, For } from 'solid-js';
import { type ColumnDef } from '../../types/kanban';
import { type KanbanStore } from '../../stores/kanbanStore';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: ColumnDef;
  store: KanbanStore;
}

const Column: Component<ColumnProps> = (props) => {
  const tasks = () => props.store.tasksByStatus(props.column.key);

  return (
    <div class="kanban-column">
      <div class="kanban-column-header">
        <div class="flex items-center gap-2">
          <span
            class="w-2.5 h-2.5 rounded-full"
            style={{ 'background-color': props.column.color }}
          />
          <h2 class="md-title-medium text-on-surface">{props.column.label}</h2>
        </div>
        <span class="md-label-medium text-on-surface-variant bg-surface-container-high rounded-full px-2 py-0.5 min-w-[24px] text-center">
          {tasks().length}
        </span>
      </div>

      <div class="kanban-column-body">
        <For each={tasks()}>
          {task => <TaskCard task={task} store={props.store} />}
        </For>
        {tasks().length === 0 && (
          <div class="text-center py-8">
            <p class="md-body-medium text-on-surface-variant/50">暂无任务</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
