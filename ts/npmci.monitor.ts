import * as plugins from './npmci.plugins'
import * as env from './npmci.env'

import { Smartmonitor } from 'smartmonitor'

export let npmciMonitor = new Smartmonitor()

if(process.env.SMARTMONITOR) {
  npmciMonitor.addInstrumental({
    apiKey: process.env.SMARTMONITOR
  })
  plugins.beautylog.info('Monitoring activated')
} else {
  plugins.beautylog.warn('Monitoring could not be enabled due to missing API-KEY')
}

npmciMonitor.increment('lossless-ci.builds', 1)
