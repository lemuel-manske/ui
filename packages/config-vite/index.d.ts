import type { UserConfig } from 'vite';

interface LibraryOptions {
  /** The entry point for the library. */
  entry?: string;

  /** The name of the library. */
  fileName: string;

  /** The external dependencies that should not be bundled into the library. */
  external?: string[];
}

declare const reactConfig: UserConfig;

declare function createLibraryConfig(options: LibraryOptions): UserConfig;

export { reactConfig, createLibraryConfig, type LibraryOptions };
