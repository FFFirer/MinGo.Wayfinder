import { type Component } from 'solid-js';
import { createKanbanStore } from '../stores/kanbanStore';
import Board from '../components/kanban/Board';

const KanbanBoard: Component = () => {
  const store = createKanbanStore();

  // Expose store globally for MainLayout's [+] button
  (window as any).__kanbanStore = store;

  return <Board store={store} />;
};

export default KanbanBoard;
