import type { DesignTokens } from './tokens';

/** Partial token values at every group level, retaining the exact DesignTokens shape. */
type PartialTokens<T> = {
  [Key in keyof T]?: T[Key] extends object ? PartialTokens<T[Key]> : T[Key];
};

/** Explicit changes applied to a complete base theme by createTheme. */
type ThemeOverrides = PartialTokens<DesignTokens>;

function mergeTokens<T extends object>(base: T, overrides: PartialTokens<T>): T {
  const result = { ...base };

  for (const key of Object.keys(base) as (keyof T)[]) {
    const original = base[key];
    const override = overrides[key];

    if (original !== null && typeof original === 'object') {
      result[key] = mergeTokens(original, override ?? {}) as T[keyof T];
    } else if (override !== undefined) {
      result[key] = override as T[keyof T];
    }
  }

  return result;
}

/**
 * Creates a complete theme by merging documented token overrides into an explicit base.
 * Groups are copied recursively; neither input is mutated or shared with the result.
 */
function createTheme(base: DesignTokens, overrides: ThemeOverrides): DesignTokens {
  return mergeTokens(base, overrides);
}

export { createTheme, type ThemeOverrides };
