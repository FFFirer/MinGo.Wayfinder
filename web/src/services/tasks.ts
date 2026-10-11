import { httpClient } from './httpClient';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/kanban';

export const tasksApi = {
  getAll: (): Promise<Task[]> => {
    return httpClient<Task[]>('/api/tasks');
  },

  getByUuid: (uuid: string): Promise<Task> => {
    return httpClient<Task>(`/api/tasks/${uuid}`);
  },

  create: (dto: CreateTaskDto): Promise<Task> => {
    return httpClient<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  update: (uuid: string, dto: UpdateTaskDto): Promise<Task> => {
    return httpClient<Task>(`/api/tasks/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  },

  delete: (uuid: string): Promise<void> => {
    return httpClient<void>(`/api/tasks/${uuid}`, {
      method: 'DELETE',
    });
  },
};
