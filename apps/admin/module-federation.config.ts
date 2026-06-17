import { ModuleFederationConfig } from '@nx/module-federation';

const sharedSingletonVersions = new Map([
  ['@angular/common', '~21.0.0'],
  ['@angular/core', '~21.0.0'],
  ['@angular/forms', '~21.0.0'],
  ['@angular/platform-browser', '~21.0.0'],
  ['@angular/router', '~21.0.0'],
  ['rxjs', '~7.8.0'],
]);

const config: ModuleFederationConfig = {
  name: 'admin',
  exposes: {
    './Routes': 'apps/admin/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (libraryName.startsWith('@shop-workspace/')) {
      // return false;
      return {
  ...sharedConfig,
  singleton: false,
  requiredVersion: 'auto',
};
    }

    const requiredVersion = sharedSingletonVersions.get(libraryName);
    if (requiredVersion) {
      return {
        ...sharedConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion,
      };
    }

    return sharedConfig;
  },
};

export default config;
