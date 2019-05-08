import { logger } from './npmci.logging';
import * as plugins from './npmci.plugins';
import * as env from './npmci.env';

import { Analytics } from '@pushrocks/smartanalytics';

export let npmciAnalytics = new Analytics({
  apiEndPoint: 'https://pubapi.lossless.one/analytics',
  projectId: 'gitzone',
  appName: 'npmci'
});

export let run = async () => {
  npmciAnalytics
    .recordEvent('npmToolExecution', {
      host: env.repo.host,
      user: env.repo.user,
      repo: env.repo.repo
    })
    .catch(err => {
      logger.log('warn', 'Lossless Analytics API not available...');
    });
};
