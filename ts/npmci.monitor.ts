import * as plugins from './npmci.plugins'
import * as env from './npmci.env'

import { Analytics } from 'smartanalytics'

export let npmciAnalytics = new Analytics({
  apiEndPoint: 'https://pubapi-1.lossless.one/analytics',
  projectId: 'gitzone',
  appName: 'npmci'
})

npmciAnalytics.recordEvent('npmToolExecution', {
  
}).catch(err => {
  plugins.beautylog.warn('Lossless Analytics API not available...')
})