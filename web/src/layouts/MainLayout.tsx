import { type Component, type JSX } from 'solid-js';

interface MainLayoutProps {
  children: JSX.Element;
}

const MainLayout: Component<MainLayoutProps> = (props) => {
  return (
    <div class="min-h-screen bg-background">
      <header class="navbar bg-surface shadow-sm">
        <div class="navbar-start">
          <a href="/" class="btn btn-ghost text-xl text-primary">
            Wayfinder
          </a>
        </div>
        <div class="navbar-end">
          <button class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </header>
      <main class="container mx-auto px-4 py-8">{props.children}</main>
    </div>
  );
};

export default MainLayout;
