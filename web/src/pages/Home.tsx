import { type Component, createSignal } from 'solid-js';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: Component = () => {
  const [isDark, setIsDark] = createSignal(false);

  const toggleTheme = () => {
    setIsDark(!isDark());
    document.documentElement.setAttribute(
      'data-theme',
      isDark() ? 'dark' : 'light'
    );
  };

  return (
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-4xl font-bold text-on-background">
          Material Design 3 组件展示
        </h1>
        <Button variant="outlined" onClick={toggleTheme}>
          {isDark() ? '浅色模式' : '深色模式'}
        </Button>
      </div>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-on-surface">按钮 (Buttons)</h2>
        <Card variant="outlined">
          <div class="flex flex-wrap gap-4">
            <Button variant="filled">Filled</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="filled" disabled>
              Disabled
            </Button>
          </div>
        </Card>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-on-surface">卡片 (Cards)</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="elevated">
            <h3 class="card-title text-on-surface">Elevated Card</h3>
            <p class="text-on-surface-variant">
              带有阴影效果的卡片，适用于需要突出显示的内容。
            </p>
          </Card>
          <Card variant="filled">
            <h3 class="card-title text-on-surface">Filled Card</h3>
            <p class="text-on-surface-variant">
              使用背景色填充的卡片，适用于分组相关内容。
            </p>
          </Card>
          <Card variant="outlined">
            <h3 class="card-title text-on-surface">Outlined Card</h3>
            <p class="text-on-surface-variant">
              带有边框的卡片，适用于需要明确边界的内容。
            </p>
          </Card>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-on-surface">色彩系统 (Colors)</h2>
        <Card variant="outlined">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-primary"></div>
              <p class="text-sm text-on-surface">Primary</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-secondary"></div>
              <p class="text-sm text-on-surface">Secondary</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-tertiary"></div>
              <p class="text-sm text-on-surface">Tertiary</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-error"></div>
              <p class="text-sm text-on-surface">Error</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-primary-container"></div>
              <p class="text-sm text-on-surface">Primary Container</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-secondary-container"></div>
              <p class="text-sm text-on-surface">Secondary Container</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-tertiary-container"></div>
              <p class="text-sm text-on-surface">Tertiary Container</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 rounded-lg bg-error-container"></div>
              <p class="text-sm text-on-surface">Error Container</p>
            </div>
          </div>
        </Card>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-on-surface">排版 (Typography)</h2>
        <Card variant="outlined">
          <div class="space-y-3">
            <p class="text-5xl font-bold text-on-surface">Display Large</p>
            <p class="text-4xl font-bold text-on-surface">Headline Large</p>
            <p class="text-3xl font-semibold text-on-surface">Title Large</p>
            <p class="text-xl text-on-surface">Body Large</p>
            <p class="text-base text-on-surface">Body Medium</p>
            <p class="text-sm text-on-surface">Label Medium</p>
            <p class="text-xs text-on-surface">Label Small</p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
