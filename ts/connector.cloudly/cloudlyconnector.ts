import * as plugins from '../npmci.plugins';

import { Npmci } from '../npmci.classes.npmci';
import { logger } from '../npmci.logging';

/**
 * connects to cloudly
 */
export class CloudlyConnector {
  public npmciRef: Npmci;

  constructor(npmciRefArg: Npmci) {
    this.npmciRef = npmciRefArg;
  }

  public async announceDockerContainer(
    optionsArg: plugins.servezoneInterfaces.version.IVersionData
  ) {
    const cloudlyUrl = this.npmciRef.npmciConfig.getConfig().urlCloudly;
    if (!cloudlyUrl) {
      logger.log(
        'warn',
        'no cloudly url provided. Thus we cannot announce the newly built Dockerimage!'
      );
      return;
    }

    const typedrequest = new plugins.typedrequest.TypedRequest<plugins.servezoneInterfaces.request.version.IRequest_Any_Cloudly_VersionManager_Update>(
      `https://${cloudlyUrl}/versionmanager`,
      'update'
    );

    const response = await typedrequest.fire(optionsArg);
  }
}
