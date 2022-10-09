process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
import { tap, expect } from '@pushrocks/tapbundle';

import * as cloudlyConnectorMod from '../ts/connector.cloudly/cloudlyconnector.js';

tap.test('should be able to announce a container to cloudly', async () => {
  const cloudlyConnector = new cloudlyConnectorMod.CloudlyConnector(null);
  await cloudlyConnector.announceDockerContainer({
    registryUrl: 'registry.losssless.com',
    tag: 'testcontainer',
    version: 'x.x.x',
    labels: []
  }, 'cloudly.lossless.one')
});

tap.test('should close the program despite socket timeout', async (toolsArg) => {
  // TODO: remove when unreffed timeouts in webrequest have been solved.
  toolsArg.delayFor(0).then(() => {
    process.exit();
  })
})

tap.start();