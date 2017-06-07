import * as plugins from './npmci.plugins'
import * as env from './npmci.env'

import { Smartmonitor } from 'smartmonitor'

export let npmciMonitor = new Smartmonitor()

let monitorEnvString: string = process.env.NPMCI_MONITOR

if (monitorEnvString) {
  let npmciMonitorKeys: string[] = monitorEnvString.split('|')
  npmciMonitor.addInstrumental({
    apiKey: process.env.NPMCI_MONITOR
  })
  plugins.beautylog.info('Monitoring activated')
} else {
  plugins.beautylog.warn('Monitoring could not be enabled due to missing API-KEY')
}

npmciMonitor.increment('lossless-ci.builds', 1)
