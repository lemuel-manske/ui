import type { Weight } from './enums';

interface DesignTokens {
  color: {
    background: string;
    surface: string;
    'surface-muted': string;
    'surface-inverse': string;
    border: string;
    'text-primary': string;
    'text-secondary': string;
    'text-muted': string;
  };

  action: {
    primary: string;
    'primary-hover': string;
    'primary-foreground': string;
    secondary: string;
    'secondary-hover': string;
    'secondary-foreground': string;
    danger: string;
    'danger-hover': string;
    'danger-foreground': string;
    success: string;
    'success-hover': string;
    'success-foreground': string;
    warning: string;
    'warning-hover': string;
    'warning-foreground': string;
    info: string;
    'info-hover': string;
    'info-foreground': string;
  };

  state: {
    focus: string;
    danger: string;
    'danger-foreground': string;
    success: string;
    'success-foreground': string;
    warning: string;
    'warning-foreground': string;
    info: string;
    'info-foreground': string;
  };

  font: {
    body: string;
    display: string;
    mono: string;
  };

  text: {
    small: string;
    medium: string;
    large: string;
    'heading-small': string;
    'heading-medium': string;
    'heading-large': string;
    display: string;
  };

  weight: Record<Weight, number>;

  space: Record<4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 96, string>;

  control: {
    small: string;
    medium: string;
    large: string;
  };

  border: {
    width: string;
  };

  radius: {
    none: string;
    small: string;
    medium: string;
    large: string;
    full: string;
  };

  motion: {
    'duration-fast': string;
    'duration-normal': string;
    'duration-slow': string;
    'easing-standard': string;
    'easing-emphasized': string;
  };
}

const archiveTheme = {
  color: {
    background: '#F6F3EB',
    surface: '#EEE9DF',
    'surface-muted': '#E7E0D3',
    'surface-inverse': '#34312C',
    border: '#625C53',
    'text-primary': '#211F1B',
    'text-secondary': '#625C53',
    'text-muted': '#6B6358',
  },

  action: {
    primary: '#211F1B',
    'primary-hover': '#34312C',
    'primary-foreground': '#F6F3EB',
    secondary: 'transparent',
    'secondary-hover': '#E7E0D3',
    'secondary-foreground': '#211F1B',
    danger: '#9A3324',
    'danger-hover': '#7E281C',
    'danger-foreground': '#FFFFFF',
    success: '#2F5D3A',
    'success-hover': '#254A2E',
    'success-foreground': '#FFFFFF',
    warning: '#805000',
    'warning-hover': '#664000',
    'warning-foreground': '#FFFFFF',
    info: '#245E83',
    'info-hover': '#1C4A68',
    'info-foreground': '#FFFFFF',
  },

  state: {
    focus: '#211F1B',
    danger: '#9A3324',
    'danger-foreground': '#F6F3EB',
    success: '#2F5D3A',
    'success-foreground': '#F6F3EB',
    warning: '#805000',
    'warning-foreground': '#FFFFFF',
    info: '#245E83',
    'info-foreground': '#FFFFFF',
  },

  font: {
    body: '"EB Garamond", Georgia, serif',
    display: '"Cormorant Garamond", Georgia, serif',
    mono: '"IBM Plex Mono", monospace',
  },

  text: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem',
    'heading-small': '1.40625rem',
    'heading-medium': '1.96875rem',
    'heading-large': '2.8125rem',
    display: 'clamp(2.8125rem, 2rem + 3vw, 4.5rem)',
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  space: {
    4: '0.25rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    24: '1.5rem',
    32: '2rem',
    48: '3rem',
    64: '4rem',
    96: '6rem',
  },

  control: {
    small: '2.75rem',
    medium: '3rem',
    large: '3.25rem',
  },

  border: {
    width: '1px',
  },

  radius: {
    none: '0',
    small: '2px',
    medium: '4px',
    large: '8px',
    full: '9999px',
  },

  motion: {
    'duration-fast': '120ms',
    'duration-normal': '200ms',
    'duration-slow': '350ms',
    'easing-standard': 'cubic-bezier(0.2, 0, 0, 1)',
    'easing-emphasized': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
} as const satisfies DesignTokens;

const libraryTheme = {
  ...archiveTheme,

  color: {
    ...archiveTheme.color,
    background: '#ffffff',
    border: '#405b52',
    'text-primary': '#193a32',
    'text-secondary': '#405b52',
    'surface-inverse': '#285146',
    'surface-muted': '#e4eee9',
  },

  action: {
    ...archiveTheme.action,
    primary: '#193a32',
    'primary-hover': '#285146',
    'primary-foreground': '#ffffff',
    secondary: 'transparent',
    'secondary-hover': '#e4eee9',
    'secondary-foreground': '#193a32',
  },

  state: {
    ...archiveTheme.state,
    focus: '#193a32',
    'danger-foreground': '#ffffff',
    'success-foreground': '#ffffff',
  },

  font: {
    ...archiveTheme.font,
    body: 'system-ui, sans-serif',
  },
} as const satisfies DesignTokens;

export { archiveTheme, libraryTheme, type DesignTokens };
