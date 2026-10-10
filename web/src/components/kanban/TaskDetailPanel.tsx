import { type Component, createSignal, createEffect, on, Show, For } from 'solid-js';
import { COLUMNS, STATUS_MAP, type TaskStatus } from '../../types/kanban';
import { type KanbanStore } from '../../stores/kanbanStore';
import IconButton from '../ui/IconButton';
import Button from '../ui/Button';
import TextField from '../ui/TextField';
import Chip from '../ui/Chip';
import Menu from '../ui/Menu';

interface TaskDetailPanelProps {
  store: KanbanStore;
  isMobile: boolean;
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const TaskDetailPanel: Component<TaskDetailPanelProps> = (props) => {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [status, setStatus] = createSignal<TaskStatus>('todo');

  const isOpen = () => props.store.state.panelMode !== null;
  const isCreate = () => props.store.state.panelMode === 'create';
  const isEdit = () => props.store.state.panelMode === 'edit';
  const isView = () => props.store.state.panelMode === 'view';

  createEffect(on(() => props.store.state.panelMode, (mode) => {
    if (mode === 'create') {
      setTitle('');
      setDescription('');
      setStatus('todo');
    } else if (mode) {
      const task = props.store.selectedTask();
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      }
    }
  }));

  const handleSave = () => {
    const t = title().trim();
    if (!t) return;

    if (isCreate()) {
      props.store.createTask(t, description().trim());
    } else if (isEdit()) {
      const task = props.store.selectedTask();
      if (task) {
        props.store.updateTask(task.id, {
          title: t,
          description: description().trim(),
          status: status(),
        });
        props.store.enterEditMode();
        // Switch back to view after save
        props.store.selectTask(task.id);
      }
    }
  };

  const handleDelete = () => {
    const task = props.store.selectedTask();
    if (task) {
      props.store.deleteTask(task.id);
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.store.closePanel();
    }
  };

  const panelClass = () => {
    if (props.isMobile) {
      return 'kanban-panel-mobile';
    }
    return 'kanban-panel-desktop';
  };

  return (
    <Show when={isOpen()}>
      <div
        class={`kanban-panel-backdrop ${isOpen() ? 'open' : ''}`}
        onClick={handleBackdropClick}
      >
        <div class={`kanban-panel ${panelClass()}`} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div class="kanban-panel-header">
            <div class="flex items-center gap-2">
              <Show when={props.isMobile && isView()}>
                <IconButton onClick={() => props.store.closePanel()} title="返回">
                  <BackIcon />
                </IconButton>
              </Show>
              <h2 class="md-title-large text-on-surface">
                {isCreate() ? '新建任务' : isEdit() ? '编辑任务' : '任务详情'}
              </h2>
            </div>
            <div class="flex items-center gap-1">
              <Show when={isView() && !props.isMobile}>
                <IconButton onClick={() => props.store.enterEditMode()} title="编辑">
                  <EditIcon />
                </IconButton>
              </Show>
              <IconButton onClick={() => props.store.closePanel()} title="关闭">
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          {/* Content */}
          <div class="kanban-panel-content">
            <Show when={isView()}>
              {(() => {
                const task = () => props.store.selectedTask();
                return (
                  <Show when={task()}>
                    <div class="space-y-5">
                      <div>
                        <h3 class="md-headline-small text-on-surface mb-2">{task()!.title}</h3>
                        <div class="flex items-center gap-2">
                          <Chip
                            label={STATUS_MAP[task()!.status].label}
                            variant="tonal"
                          />
                          <span class="md-body-small text-on-surface-variant">
                            创建于 {task()!.createdAt}
                          </span>
                        </div>
                      </div>

                      <Show when={task()!.description}>
                        <div>
                          <h4 class="md-label-large text-on-surface-variant mb-2">描述</h4>
                          <p class="md-body-large text-on-surface whitespace-pre-wrap">
                            {task()!.description}
                          </p>
                        </div>
                      </Show>

                      <Show when={props.isMobile}>
                        <div class="pt-4 border-t border-outline-variant">
                          <Button
                            variant="outlined"
                            onClick={() => props.store.enterEditMode()}
                            class="w-full"
                          >
                            <EditIcon /> 编辑
                          </Button>
                        </div>
                      </Show>
                    </div>
                  </Show>
                );
              })()}
            </Show>

            <Show when={isEdit() || isCreate()}>
              <div class="space-y-5">
                <TextField
                  label="标题"
                  value={title()}
                  onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                  required
                  placeholder="输入任务标题"
                />

                <div>
                  <label class="md-body-small text-on-surface-variant mb-1.5 block">状态</label>
                  <Menu anchor="bottom start" trigger={
                    <Chip
                      label={STATUS_MAP[status()].label}
                      clickable
                      trailingIcon={<ChevronDownIcon />}
                    />
                  }>
                    <For each={COLUMNS}>
                      {col => (
                        <Menu.Item
                          label={col.label}
                          selected={col.key === status()}
                          onClick={() => setStatus(col.key)}
                        />
                      )}
                    </For>
                  </Menu>
                </div>

                <TextField
                  label="描述"
                  value={description()}
                  onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                  multiline
                  rows={6}
                  placeholder="输入任务描述（可选）"
                />
              </div>
            </Show>
          </div>

          {/* Footer */}
          <Show when={isEdit() || isCreate()}>
            <div class="kanban-panel-footer">
              <Show when={isEdit()}>
                <Button variant="text" onClick={handleDelete} class="text-error">
                  <DeleteIcon /> 删除
                </Button>
              </Show>
              <div class="flex-1" />
              <Button variant="text" onClick={() => props.store.closePanel()}>
                取消
              </Button>
              <Button variant="filled" onClick={handleSave}>
                {isCreate() ? '创建' : '保存'}
              </Button>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
};

export default TaskDetailPanel;
