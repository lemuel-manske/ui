import { defineConfig, globalIgnores } from 'eslint/config';

import nodeConfig from '@lkmliz/config-eslint/node';

const config = defineConfig(globalIgnores(['packages/**']), nodeConfig);

export default config;
