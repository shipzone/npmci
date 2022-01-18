process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
import { tap, expect } from '@pushrocks/tapbundle';

import * as cloudlyConnectorMod from '../ts/connector.cloudly/cloudlyconnector';

tap.test('should be able to announce a container to cloudly', async () => {
  const cloudlyConnector = new cloudlyConnectorMod.CloudlyConnector(null);
  await cloudlyConnector.announceDockerContainer({
    registryUrl: 'registry.losssless.com',
    tag: 'testcontainer',
    version: 'x.x.x',
    labels: []
  }, 'cloudly.lossless.one')
});

tap.start();