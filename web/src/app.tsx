import { Router, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import MainLayout from './layouts/MainLayout';

const KanbanBoard = lazy(() => import('./pages/KanbanBoard'));

export default function App() {
  return (
    <Router root={MainLayout}>
      <Route path="/" component={KanbanBoard} />
    </Router>
  );
}
