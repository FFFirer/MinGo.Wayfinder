import { createSignal, createEffect, onCleanup } from 'solid-js';

export type ThemeMode = 'light' | 'dark' | 'system';
export type EffectiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme-mode';

function getSystemTheme(): EffectiveTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getEffectiveTheme(mode: ThemeMode): EffectiveTheme {
  if (mode === 'system') {
    return getSystemTheme();
  }
  return mode;
}

function readStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch (e) {
    // localStorage 不可用（隐私模式等）
  }
  return 'system';
}

function applyTheme(theme: EffectiveTheme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function useTheme() {
  const [themeMode, setThemeMode] = createSignal<ThemeMode>(readStoredTheme());
  const [effectiveTheme, setEffectiveTheme] = createSignal<EffectiveTheme>(
    getEffectiveTheme(themeMode())
  );

  // 应用主题到 DOM
  createEffect(() => {
    const effective = getEffectiveTheme(themeMode());
    setEffectiveTheme(effective);
    applyTheme(effective);
  });

  // 持久化到 localStorage
  createEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, themeMode());
    } catch (e) {
      // localStorage 不可用
    }
  });

  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (themeMode() === 'system') {
      setEffectiveTheme(e.matches ? 'dark' : 'light');
    }
  };

  mediaQuery.addEventListener('change', handleSystemThemeChange);
  onCleanup(() => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  });

  return {
    themeMode,
    effectiveTheme,
    setThemeMode,
  };
}
