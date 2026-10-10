import { createStore } from 'solid-js/store';
import { type Task, type TaskStatus } from '../types/kanban';

export type PanelMode = 'view' | 'edit' | 'create';

interface KanbanState {
  tasks: Task[];
  selectedTaskId: string | null;
  panelMode: PanelMode | null;
  activeTab: TaskStatus;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: '设计数据库 Schema',
    description: '根据需求文档设计数据库表结构，包括用户表、任务表、项目表等核心表的字段定义和关联关系。',
    status: 'done',
    createdAt: '2026-10-08',
  },
  {
    id: '2',
    title: '实现用户认证模块',
    description: '基于 JWT 实现用户登录、注册、Token 刷新等功能。',
    status: 'in_progress',
    createdAt: '2026-10-09',
  },
  {
    id: '3',
    title: '编写 API 文档',
    description: '使用 OpenAPI 规范编写 RESTful API 接口文档。',
    status: 'todo',
    createdAt: '2026-10-10',
  },
  {
    id: '4',
    title: '前端看板页面开发',
    description: '实现 Kanban 看板视图，包含任务卡片、状态切换、详情面板等交互功能。',
    status: 'in_progress',
    createdAt: '2026-10-10',
  },
  {
    id: '5',
    title: '代码审查：订单模块',
    description: '审查订单模块的代码质量、性能优化建议和安全性检查。',
    status: 'review',
    createdAt: '2026-10-11',
  },
  {
    id: '6',
    title: '部署测试环境',
    description: '配置 CI/CD 流水线，将应用部署到测试服务器。',
    status: 'todo',
    createdAt: '2026-10-11',
  },
];

export function createKanbanStore() {
  const [state, setState] = createStore<KanbanState>({
    tasks: initialTasks,
    selectedTaskId: null,
    panelMode: null,
    activeTab: 'todo',
  });

  const tasksByStatus = (status: TaskStatus): Task[] =>
    state.tasks.filter(t => t.status === status);

  const selectedTask = (): Task | undefined =>
    state.tasks.find(t => t.id === state.selectedTaskId);

  const createTask = (title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setState('tasks', tasks => [...tasks, newTask]);
    setState('selectedTaskId', newTask.id);
    setState('panelMode', 'view');
  };

  const updateTask = (id: string, partial: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
    setState('tasks', tasks =>
      tasks.map(t => t.id === id ? { ...t, ...partial } : t)
    );
  };

  const deleteTask = (id: string) => {
    setState('tasks', tasks => tasks.filter(t => t.id !== id));
    setState('selectedTaskId', null);
    setState('panelMode', null);
  };

  const changeTaskStatus = (id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus });
  };

  const selectTask = (id: string) => {
    setState('selectedTaskId', id);
    setState('panelMode', 'view');
  };

  const openCreatePanel = () => {
    setState('selectedTaskId', null);
    setState('panelMode', 'create');
  };

  const enterEditMode = () => {
    setState('panelMode', 'edit');
  };

  const closePanel = () => {
    setState('selectedTaskId', null);
    setState('panelMode', null);
  };

  const setActiveTab = (status: TaskStatus) => {
    setState('activeTab', status);
  };

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
  };
}

export type KanbanStore = ReturnType<typeof createKanbanStore>;
