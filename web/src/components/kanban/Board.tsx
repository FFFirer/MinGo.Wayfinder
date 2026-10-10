import { type Component, For, createSignal, onMount, onCleanup, Show } from 'solid-js';
import { COLUMNS } from '../../types/kanban';
import { type KanbanStore } from '../../stores/kanbanStore';
import Column from './Column';
import TaskDetailPanel from './TaskDetailPanel';

interface BoardProps {
  store: KanbanStore;
}

const Board: Component<BoardProps> = (props) => {
  const [isMobile, setIsMobile] = createSignal(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    onCleanup(() => window.removeEventListener('resize', checkMobile));
  });

  return (
    <div class="kanban-board-wrapper">
      <Show when={!isMobile()}>
        {/* Desktop: horizontal columns */}
        <div class="kanban-board-desktop">
          <For each={COLUMNS}>
            {col => <Column column={col} store={props.store} />}
          </For>
        </div>
      </Show>

      <Show when={isMobile()}>
        {/* Mobile: tab-based */}
        <div class="kanban-board-mobile">
          <div class="kanban-tabs" role="tablist">
            <For each={COLUMNS}>
              {col => (
                <button
                  type="button"
                  role="tab"
                  class="kanban-tab"
                  classList={{ active: props.store.state.activeTab === col.key }}
                  onClick={() => props.store.setActiveTab(col.key)}
                >
                  <span>{col.label}</span>
                  <span class="md-label-small text-on-surface-variant/60">
                    {props.store.tasksByStatus(col.key).length}
                  </span>
                </button>
              )}
            </For>
          </div>
          <div class="kanban-mobile-content">
            <For each={COLUMNS}>
              {col => (
                <Show when={props.store.state.activeTab === col.key}>
                  <Column column={col} store={props.store} />
                </Show>
              )}
            </For>
          </div>
        </div>
      </Show>

      <TaskDetailPanel store={props.store} isMobile={isMobile()} />
    </div>
  );
};

export default Board;
