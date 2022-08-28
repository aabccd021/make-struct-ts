import path from 'path';
import { defineConfig } from 'vitest/config';

export const config = {
  test: {
    maxConcurrency: 1000,
    testTimeout: 10000,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'make-struct-ts',
    },
  },
};

export default defineConfig(config);
