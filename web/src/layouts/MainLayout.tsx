import { type Component, type JSX } from 'solid-js';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';
import IconButton from '../components/ui/IconButton';

interface MainLayoutProps {
  children?: JSX.Element;
}

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12h14" /><path d="M12 5v14" />
  </svg>
);

const MainLayout: Component<MainLayoutProps> = (props) => {
  const handleCreateTask = () => {
    const store = (window as any).__kanbanStore;
    store?.openCreatePanel();
  };

  return (
    <div class="min-h-screen bg-background flex flex-col">
      <header class="navbar bg-surface shadow-sm px-4 flex-shrink-0">
        <div class="navbar-start">
          <a href="/" class="btn btn-ghost md-title-large text-primary no-underline">
            Wayfinder
          </a>
        </div>
        <div class="navbar-end gap-1">
          <IconButton
            variant="filledTonal"
            onClick={handleCreateTask}
            title="新建任务"
          >
            <PlusIcon />
          </IconButton>
          <ThemeSwitcher />
        </div>
      </header>
      <main class="flex-1 overflow-hidden">{props.children}</main>
    </div>
  );
};

export default MainLayout;
