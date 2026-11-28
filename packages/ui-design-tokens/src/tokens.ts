import type { Weight } from './types';

interface DesignTokens {
  color: {
    background: string;
    backdrop: string;
    surface: string;
    'surface-muted': string;
    'surface-inverse': string;
    border: string;

    /** Documentary separators, independent of control borders. */
    divider: string;

    'text-primary': string;
    'text-secondary': string;
    'text-muted': string;
    'accent-primary': string;
    'accent-secondary': string;
    'accent-tertiary': string;
    'glass-surface': string;
    'glass-border': string;
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
    'focus-width': string;
    'focus-offset': string;
    'invalid-width': string;
    'disabled-opacity': string;
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

  /** Foundation line heights shared by default text and controls. */
  leading: {
    body: string;
    control: string;
    heading: string;
    display: string;
  };

  /** Foundation letter spacing for body text and headings. */
  tracking: {
    body: string;
    heading: string;
    display: string;
  };

  /** Component decisions that may differ independently from shared foundations. */
  component: {
    'button-radius': string;
    'button-weight': string;
    'input-radius': string;
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
    backdrop: 'rgb(0 0 0 / 45%)',
    surface: '#EFEBE0',
    'surface-muted': '#E5E8DD',
    'surface-inverse': '#34312C',
    border: '#858577',
    divider: '#C8C8B9',
    'text-primary': '#252B27',
    'text-secondary': '#596057',
    'text-muted': '#6B6358',
    'accent-primary': '#176872',
    'accent-secondary': '#62612A',
    'accent-tertiary': '#625690',
    'glass-surface': 'rgb(255 255 255 / 45%)',
    'glass-border': 'rgb(37 79 70 / 18%)',
  },

  action: {
    primary: '#254F46',
    'primary-hover': '#193E36',
    'primary-foreground': '#F6F3EB',
    secondary: 'transparent',
    'secondary-hover': '#E5E8DD',
    'secondary-foreground': '#254F46',
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
    focus: '#254F46',
    'focus-width': '2px',
    'focus-offset': '3px',
    'invalid-width': '2px',
    'disabled-opacity': '0.45',
    danger: '#9A3324',
    'danger-foreground': '#F6F3EB',
    success: '#254F46',
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

  leading: {
    body: '1.5',
    control: '1.25',
    heading: '1.2',
    display: '1.1',
  },

  tracking: {
    body: 'normal',
    heading: 'normal',
    display: '-0.025em',
  },

  component: {
    'button-radius': 'var(--ui-radius-small)',
    'button-weight': 'var(--ui-weight-medium)',
    'input-radius': 'var(--ui-radius-small)',
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
    divider: '#C8D4CF',
    'text-primary': '#193a32',
    'text-secondary': '#405b52',
    'surface-inverse': '#285146',
    'surface-muted': '#e4eee9',
    'accent-primary': '#176872',
    'accent-secondary': '#62612A',
    'accent-tertiary': '#625690',
    'glass-surface': 'rgb(255 255 255 / 70%)',
    'glass-border': 'rgb(25 58 50 / 18%)',
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

const castellaniTheme = {
  ...archiveTheme,

  color: {
    background: '#08090b',
    backdrop: 'rgb(8 9 11 / 82%)',
    surface: '#0d0e10',
    'surface-muted': '#131316',
    'surface-inverse': '#f2f3f5',
    border: 'rgb(255 255 255 / 9%)',
    divider: 'rgb(255 255 255 / 17%)',
    'text-primary': '#f2f3f5',
    'text-secondary': '#9aa0a8',
    'text-muted': '#62666d',
    'accent-primary': '#9AE0EB',
    'accent-secondary': '#CDC988',
    'accent-tertiary': '#DACEFF',
    'glass-surface': 'rgb(255 255 255 / 5%)',
    'glass-border': 'rgb(255 255 255 / 10%)',
  },

  action: {
    primary: '#ffffff',
    'primary-hover': '#d4d6da',
    'primary-foreground': '#08090b',
    secondary: 'transparent',
    'secondary-hover': 'rgb(255 255 255 / 5%)',
    'secondary-foreground': '#f2f3f5',
    danger: '#ff6961',
    'danger-hover': '#ff8a84',
    'danger-foreground': '#08090b',
    success: '#30d158',
    'success-hover': '#4ade6b',
    'success-foreground': '#08090b',
    warning: '#ffd60a',
    'warning-hover': '#ffdd3d',
    'warning-foreground': '#08090b',
    info: '#64d2ff',
    'info-hover': '#8cdeff',
    'info-foreground': '#08090b',
  },

  state: {
    ...archiveTheme.state,
    focus: '#ffffff',
    danger: '#ff6961',
    'danger-foreground': '#08090b',
    success: '#30d158',
    'success-foreground': '#08090b',
    warning: '#ffd60a',
    'warning-foreground': '#08090b',
    info: '#64d2ff',
    'info-foreground': '#08090b',
  },

  font: {
    body: '"Geist", system-ui, sans-serif',
    display: '"Mona Sans", "Geist", system-ui, sans-serif',
    mono: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },

  text: {
    small: 'clamp(0.75rem, 2vw, 0.875rem)',
    medium: 'clamp(0.875rem, 2.5vw, 1rem)',
    large: 'clamp(1.125rem, 3.5vw, 1.25rem)',
    'heading-small': 'clamp(1.25rem, 4vw, 1.5rem)',
    'heading-medium': 'clamp(1.5rem, 5vw, 2rem)',
    'heading-large': 'clamp(1.875rem, 6vw, 2.5rem)',
    display: 'clamp(2.25rem, 8vw, 3.5rem)',
  },

  control: {
    small: '2.25rem',
    medium: '2.75rem',
    large: '3rem',
  },

  leading: {
    body: '1.5',
    control: '1.375',
    heading: '1.2',
    display: '1.1',
  },

  tracking: {
    body: '0.02em',
    heading: '-0.02em',
    display: '-0.03em',
  },

  component: {
    'button-radius': 'var(--ui-radius-full)',
    'button-weight': 'var(--ui-weight-medium)',
    'input-radius': 'var(--ui-radius-full)',
  },

  radius: {
    none: '0',
    small: '0.5rem',
    medium: '1rem',
    large: '1.25rem',
    full: '9999px',
  },

  motion: {
    'duration-fast': '120ms',
    'duration-normal': '240ms',
    'duration-slow': '320ms',
    'easing-standard': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'easing-emphasized': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const satisfies DesignTokens;

export { archiveTheme, castellaniTheme, libraryTheme, type DesignTokens };
