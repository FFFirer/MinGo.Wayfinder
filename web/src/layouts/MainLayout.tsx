import { type Component, type JSX } from 'solid-js';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';

interface MainLayoutProps {
  children: JSX.Element;
}

const MainLayout: Component<MainLayoutProps> = (props) => {
  return (
    <div class="min-h-screen bg-background">
      <header class="navbar bg-surface shadow-sm">
        <div class="navbar-start">
          <a href="/" class="btn btn-ghost md-title-large text-primary">
            Wayfinder
          </a>
        </div>
        <div class="navbar-end">
          <ThemeSwitcher />
        </div>
      </header>
      <main class="container mx-auto px-4 py-8">{props.children}</main>
    </div>
  );
};

export default MainLayout;
