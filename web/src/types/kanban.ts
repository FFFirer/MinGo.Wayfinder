export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface ColumnDef {
  key: TaskStatus;
  label: string;
  color: string;
}

export const COLUMNS: ColumnDef[] = [
  { key: 'todo', label: '待办', color: 'var(--md-secondary)' },
  { key: 'in_progress', label: '进行中', color: 'var(--md-primary)' },
  { key: 'review', label: '审核', color: 'var(--md-tertiary)' },
  { key: 'done', label: '已完成', color: 'var(--md-primary)' },
];

export const STATUS_MAP: Record<TaskStatus, ColumnDef> = Object.fromEntries(
  COLUMNS.map(col => [col.key, col])
) as Record<TaskStatus, ColumnDef>;
