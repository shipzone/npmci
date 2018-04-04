import * as plugins from './mod.plugins';

let npmciCflare = new plugins.cflare.CflareAccount();

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async argvArg => {
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[1];
    switch (action) {
      default:
        plugins.beautylog.error(`>>npmci cloudflare ...<< action >>${action}<< not supported`);
        process.exit(1);
    }
  } else {
    plugins.beautylog.log(
      `>>npmci cloudflare ...<< cli arguments invalid... Please read the documentation.`
    );
    process.exit(1);
  }
};

export let purge = async argvArg => {
  npmciCflare.auth({
    email: '',
    key: ''
  });
  npmciCflare.purgeZone(argvArg._[1]);
};
