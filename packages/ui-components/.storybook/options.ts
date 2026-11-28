import {
  archiveTheme,
  castellaniTheme,
  libraryTheme,
  type DesignTokens,
} from '@lemuel-manske/design-tokens';

type Brand = 'archive' | 'castellani' | 'library';

interface BrandOption {
  value: Brand;

  title: string;
}

const brandOptions: BrandOption[] = [
  { value: 'archive', title: 'OpenArquive' },
  { value: 'castellani', title: 'Castellani' },
  { value: 'library', title: 'Library' },
];

function getBrandTheme(brand: unknown): DesignTokens {
  switch (brand) {
    case 'castellani':
      return castellaniTheme;

    case 'library':
      return libraryTheme;

    default:
      return archiveTheme;
  }
}

export { brandOptions, getBrandTheme };
export type { Brand };
