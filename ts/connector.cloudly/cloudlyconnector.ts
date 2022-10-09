import * as plugins from '../npmci.plugins.js';

import { Npmci } from '../npmci.classes.npmci.js';
import { logger } from '../npmci.logging.js';

/**
 * connects to cloudly
 */
export class CloudlyConnector {
  public npmciRef: Npmci;

  constructor(npmciRefArg: Npmci) {
    this.npmciRef = npmciRefArg;
  }

  public async announceDockerContainer(
    optionsArg: plugins.tsclass.container.IContainer,
    testCloudlyUrlArg?: string
  ) {
    const cloudlyUrl = testCloudlyUrlArg || this.npmciRef.npmciConfig.getConfig().urlCloudly;
    if (!cloudlyUrl) {
      logger.log(
        'warn',
        'no cloudly url provided. Thus we cannot announce the newly built Dockerimage!'
      );
      return;
    }

    const typedrequest =
      new plugins.typedrequest.TypedRequest<plugins.servezoneInterfaces.requests.IRequest_InformAboutNewContainerImage>(
        `https://${cloudlyUrl}/typedrequest`,
        'servezonestandard_InformAboutNewContainerVersion'
      );

    const response = await typedrequest.fire({
      containerImageInfo: optionsArg
    });
  }
}
