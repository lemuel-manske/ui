import { createLibraryConfig } from '@lemuel-manske/config-vite';

const config = createLibraryConfig({
  fileName: 'utils',
  external: ['react', 'react/jsx-runtime'],
});

export default config;
