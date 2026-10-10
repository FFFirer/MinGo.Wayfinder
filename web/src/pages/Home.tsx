import { type Component } from 'solid-js';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: Component = () => {
  return (
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="md-headline-large text-on-background">
          Material Design 3 组件展示
        </h1>
      </div>

      <section class="space-y-4">
        <h2 class="md-title-large text-on-surface">按钮 (Buttons)</h2>
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
        <h2 class="md-title-large text-on-surface">卡片 (Cards)</h2>
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
        <h2 class="md-title-large text-on-surface">色彩系统 (Colors)</h2>
        <Card variant="outlined">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="space-y-2">
              <div class="h-16 bg-primary rounded-large"></div>
              <p class="md-label-medium text-on-surface">Primary</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 bg-secondary rounded-large"></div>
              <p class="md-label-medium text-on-surface">Secondary</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 bg-tertiary rounded-large"></div>
              <p class="md-label-medium text-on-surface">Tertiary</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 bg-error rounded-large"></div>
              <p class="md-label-medium text-on-surface">Error</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 bg-primary-container rounded-large"></div>
              <p class="md-label-medium text-on-surface">Primary Container</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 bg-secondary-container rounded-large"></div>
              <p class="md-label-medium text-on-surface">Secondary Container</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 bg-tertiary-container rounded-large"></div>
              <p class="md-label-medium text-on-surface">Tertiary Container</p>
            </div>
            <div class="space-y-2">
              <div class="h-16 bg-error-container rounded-large"></div>
              <p class="md-label-medium text-on-surface">Error Container</p>
            </div>
          </div>
        </Card>
      </section>

      <section class="space-y-4">
        <h2 class="md-title-large text-on-surface">排版 (Typography)</h2>
        <Card variant="outlined">
          <div class="space-y-4">
            <div>
              <p class="md-label-medium text-on-surface-variant mb-1">Display</p>
              <p class="md-display-large text-on-surface">Display Large</p>
              <p class="md-display-medium text-on-surface">Display Medium</p>
              <p class="md-display-small text-on-surface">Display Small</p>
            </div>
            <div>
              <p class="md-label-medium text-on-surface-variant mb-1">Headline</p>
              <p class="md-headline-large text-on-surface">Headline Large</p>
              <p class="md-headline-medium text-on-surface">Headline Medium</p>
              <p class="md-headline-small text-on-surface">Headline Small</p>
            </div>
            <div>
              <p class="md-label-medium text-on-surface-variant mb-1">Title</p>
              <p class="md-title-large text-on-surface">Title Large</p>
              <p class="md-title-medium text-on-surface">Title Medium</p>
              <p class="md-title-small text-on-surface">Title Small</p>
            </div>
            <div>
              <p class="md-label-medium text-on-surface-variant mb-1">Body</p>
              <p class="md-body-large text-on-surface">Body Large</p>
              <p class="md-body-medium text-on-surface">Body Medium</p>
              <p class="md-body-small text-on-surface">Body Small</p>
            </div>
            <div>
              <p class="md-label-medium text-on-surface-variant mb-1">Label</p>
              <p class="md-label-large text-on-surface">Label Large</p>
              <p class="md-label-medium text-on-surface">Label Medium</p>
              <p class="md-label-small text-on-surface">Label Small</p>
            </div>
          </div>
        </Card>
      </section>

      <section class="space-y-4">
        <h2 class="md-title-large text-on-surface">形状 (Shapes)</h2>
        <Card variant="outlined">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="space-y-2">
              <div class="h-20 bg-primary rounded-none"></div>
              <p class="md-label-medium text-on-surface">None (0px)</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary rounded-extra-small"></div>
              <p class="md-label-medium text-on-surface">Extra Small (4px)</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary rounded-small"></div>
              <p class="md-label-medium text-on-surface">Small (8px)</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary rounded-medium"></div>
              <p class="md-label-medium text-on-surface">Medium (12px)</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary rounded-large"></div>
              <p class="md-label-medium text-on-surface">Large (16px)</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary rounded-extra-large"></div>
              <p class="md-label-medium text-on-surface">Extra Large (28px)</p>
            </div>
            <div class="space-y-2">
              <div class="h-20 bg-primary rounded-full"></div>
              <p class="md-label-medium text-on-surface">Full (50%)</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
