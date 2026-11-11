import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const reactConfig = defineConfig({
  plugins: [react()],
});

const SRC = 'src';
const INDEX = 'index.ts';

/**
 * @param {{
 *   entry?: string,
 *   fileName: string,
 *   external?: string[]
 * }} options
 */
function createLibraryConfig({
  entry = resolve(process.cwd(), SRC, INDEX),
  fileName,
  external = [],
}) {
  return defineConfig({
    build: {
      lib: {
        entry,
        formats: ['es'],
        fileName,
        cssFileName: fileName,
      },
      rollupOptions: {
        external,
      },
    },
  });
}

export { reactConfig, createLibraryConfig };
