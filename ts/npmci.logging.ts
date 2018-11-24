import * as plugins from './npmci.plugins';

export const logger = new plugins.smartlog.Smartlog({
  logContext: {
    company: 'Some Company',
    companyunit: 'Some Unit',
    containerName: 'Some ContainerName',
    environment: 'test',
    runtime: 'node',
    zone: 'Some Zone'
  }
});

logger.addLogDestination(new plugins.smartlogDestinationLocal.DestinationLocal());
