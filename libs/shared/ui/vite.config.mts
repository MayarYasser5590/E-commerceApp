import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { resolve } from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/shared/ui',
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Library build configuration
  build: {
    outDir: '../../../dist/libs/shared/ui',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'shared-ui',
      fileName: 'index',
      formats: ['es'] as any,
    },
    rollupOptions: {
      external: [
        '@angular/common',
        '@angular/core',
        '@angular/forms',
        '@angular/platform-browser',
        '@angular/router',
        'rxjs',
        'rxjs/operators',
      ],
    },
  },
  test: {
    name: 'shared-ui',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/shared/ui',
      provider: 'v8' as const,
    },
  },
}));
