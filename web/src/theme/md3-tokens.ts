import {
  argbFromHex,
  themeFromSourceColor,
  type Theme,
} from '@material/material-color-utilities';

export interface MD3ColorScheme {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
}

function argbToHex(argb: number): string {
  const hex = argb.toString(16).padStart(8, '0');
  return `#${hex.slice(2)}`;
}

function extractColorScheme(theme: Theme, isDark: boolean): MD3ColorScheme {
  const scheme = theme.schemes[isDark ? 'dark' : 'light'];
  return {
    primary: argbToHex(scheme.primary),
    onPrimary: argbToHex(scheme.onPrimary),
    primaryContainer: argbToHex(scheme.primaryContainer),
    onPrimaryContainer: argbToHex(scheme.onPrimaryContainer),
    secondary: argbToHex(scheme.secondary),
    onSecondary: argbToHex(scheme.onSecondary),
    secondaryContainer: argbToHex(scheme.secondaryContainer),
    onSecondaryContainer: argbToHex(scheme.onSecondaryContainer),
    tertiary: argbToHex(scheme.tertiary),
    onTertiary: argbToHex(scheme.onTertiary),
    tertiaryContainer: argbToHex(scheme.tertiaryContainer),
    onTertiaryContainer: argbToHex(scheme.onTertiaryContainer),
    error: argbToHex(scheme.error),
    onError: argbToHex(scheme.onError),
    errorContainer: argbToHex(scheme.errorContainer),
    onErrorContainer: argbToHex(scheme.onErrorContainer),
    background: argbToHex(scheme.background),
    onBackground: argbToHex(scheme.onBackground),
    surface: argbToHex(scheme.surface),
    onSurface: argbToHex(scheme.onSurface),
    surfaceVariant: argbToHex(scheme.surfaceVariant),
    onSurfaceVariant: argbToHex(scheme.onSurfaceVariant),
    outline: argbToHex(scheme.outline),
    outlineVariant: argbToHex(scheme.outlineVariant),
    shadow: argbToHex(scheme.shadow),
    scrim: argbToHex(scheme.scrim),
    inverseSurface: argbToHex(scheme.inverseSurface),
    inverseOnSurface: argbToHex(scheme.inverseOnSurface),
    inversePrimary: argbToHex(scheme.inversePrimary),
  };
}

export interface MD3Theme {
  light: MD3ColorScheme;
  dark: MD3ColorScheme;
}

export function generateMD3Theme(sourceColor: string): MD3Theme {
  const argb = argbFromHex(sourceColor);
  const theme = themeFromSourceColor(argb);
  
  return {
    light: extractColorScheme(theme, false),
    dark: extractColorScheme(theme, true),
  };
}

export function generateCSSVariables(theme: MD3Theme): string {
  const lightVars = Object.entries(theme.light)
    .map(([key, value]) => `  --md-${camelToKebab(key)}: ${value};`)
    .join('\n');
  
  const darkVars = Object.entries(theme.dark)
    .map(([key, value]) => `  --md-${camelToKebab(key)}: ${value};`)
    .join('\n');
  
  return `:root {\n${lightVars}\n}\n\n[data-theme="dark"] {\n${darkVars}\n}`;
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

// Default theme with Material Design 3 primary blue
export const defaultMD3Theme = generateMD3Theme('#6750A4');
