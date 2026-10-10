import { Router, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import MainLayout from './layouts/MainLayout';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  return (
    <Router root={MainLayout}>
      <Route path="/" component={Home} />
    </Router>
  );
}
