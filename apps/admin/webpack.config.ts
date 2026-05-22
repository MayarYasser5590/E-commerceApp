import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default async (webpackConfig) => {
  const federatedConfig = await withModuleFederation(config, { dts: false });
  const updatedConfig = federatedConfig(webpackConfig);

  return {
    ...updatedConfig,
    output: {
      ...updatedConfig.output,
      publicPath: 'http://localhost:4201/',
      scriptType: 'module',
    },
  };
};
