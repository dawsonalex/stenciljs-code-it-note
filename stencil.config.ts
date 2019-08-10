import { Config } from '@stencil/core';

export const config: Config = {
	namespace: 'code-it-note',
	devServer: {
		reloadStrategy: 'pageReload',
		openBrowser: false
	},
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
