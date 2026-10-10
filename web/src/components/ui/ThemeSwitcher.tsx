import { type Component, For } from 'solid-js';
import { useTheme, type ThemeMode } from '../../theme/useTheme';

const themeOptions: { mode: ThemeMode; label: string; icon: Component }[] = [
  {
    mode: 'light',
    label: '浅色模式',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    mode: 'dark',
    label: '深色模式',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    mode: 'system',
    label: '跟随系统',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const ThemeSwitcher: Component = () => {
  const { themeMode, setThemeMode } = useTheme();
  let detailsRef: HTMLDetailsElement | undefined;

  const getCurrentIcon = () => {
    const current = themeOptions.find((opt) => opt.mode === themeMode());
    return current?.icon() ?? themeOptions[0].icon();
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    if (detailsRef) {
      detailsRef.removeAttribute('open');
    }
  };

  return (
    <details ref={detailsRef} class="dropdown dropdown-end">
      <summary class="btn btn-ghost btn-circle" aria-label="切换主题">
        {getCurrentIcon()}
      </summary>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <For each={themeOptions}>
          {(option) => (
            <li>
              <button
                type="button"
                class={themeMode() === option.mode ? 'active' : ''}
                onClick={() => handleThemeChange(option.mode)}
              >
                {option.icon()}
                <span>{option.label}</span>
              </button>
            </li>
          )}
        </For>
      </ul>
    </details>
  );
};

export default ThemeSwitcher;
