import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: ['node_modules', 'packages/template/*'],
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/test-utils/setup.ts',
      coverage: {
        thresholds: {
          global: {
            statements: 80,
            branches: 50,
            functions: 50,
            lines: 50,
          },
        },
      },
    },
  })
);
