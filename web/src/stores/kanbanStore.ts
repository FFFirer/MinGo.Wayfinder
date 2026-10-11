import { createStore } from 'solid-js/store';
import { type Task, type TaskStatus } from '../types/kanban';
import { tasksApi } from '../services/tasks';

export type PanelMode = 'view' | 'edit' | 'create';

interface KanbanState {
  tasks: Task[];
  selectedTaskUuid: string | null;
  panelMode: PanelMode | null;
  activeTab: TaskStatus;
  loading: boolean;
  error: string | null;
}

export function createKanbanStore() {
  const [state, setState] = createStore<KanbanState>({
    tasks: [],
    selectedTaskUuid: null,
    panelMode: null,
    activeTab: 'todo',
    loading: true,
    error: null,
  });

  const loadTasks = async () => {
    setState('loading', true);
    setState('error', null);
    try {
      const tasks = await tasksApi.getAll();
      setState('tasks', tasks);
    } catch (err) {
      setState('error', err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setState('loading', false);
    }
  };

  const tasksByStatus = (status: TaskStatus): Task[] =>
    state.tasks.filter(t => t.status === status);

  const selectedTask = (): Task | undefined =>
    state.tasks.find(t => t.uuid === state.selectedTaskUuid);

  const createTask = async (title: string, description: string) => {
    setState('error', null);
    try {
      const newTask = await tasksApi.create({ title, description });
      setState('tasks', tasks => [...tasks, newTask]);
      setState('selectedTaskUuid', newTask.uuid);
      setState('panelMode', 'view');
    } catch (err) {
      setState('error', err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const updateTask = async (uuid: string, partial: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
    const task = state.tasks.find(t => t.uuid === uuid);
    if (!task) return;

    setState('error', null);
    try {
      const updatedTask = await tasksApi.update(uuid, {
        title: partial.title ?? task.title,
        description: partial.description ?? task.description,
        status: partial.status ?? task.status,
      });
      setState('tasks', tasks =>
        tasks.map(t => t.uuid === uuid ? updatedTask : t)
      );
    } catch (err) {
      setState('error', err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const deleteTask = async (uuid: string) => {
    setState('error', null);
    try {
      await tasksApi.delete(uuid);
      setState('tasks', tasks => tasks.filter(t => t.uuid !== uuid));
      setState('selectedTaskUuid', null);
      setState('panelMode', null);
    } catch (err) {
      setState('error', err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  const changeTaskStatus = (uuid: string, newStatus: TaskStatus) => {
    updateTask(uuid, { status: newStatus });
  };

  const selectTask = (uuid: string) => {
    setState('selectedTaskUuid', uuid);
    setState('panelMode', 'view');
  };

  const openCreatePanel = () => {
    setState('selectedTaskUuid', null);
    setState('panelMode', 'create');
  };

  const enterEditMode = () => {
    setState('panelMode', 'edit');
  };

  const closePanel = () => {
    setState('selectedTaskUuid', null);
    setState('panelMode', null);
  };

  const setActiveTab = (status: TaskStatus) => {
    setState('activeTab', status);
  };

  loadTasks();

  return {
    get state() { return state; },
    tasksByStatus,
    selectedTask,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    selectTask,
    openCreatePanel,
    enterEditMode,
    closePanel,
    setActiveTab,
    loadTasks,
  };
}

export type KanbanStore = ReturnType<typeof createKanbanStore>;
