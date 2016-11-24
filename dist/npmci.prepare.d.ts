/// <reference types="q" />
import 'typings-global';
import * as plugins from './npmci.plugins';
/**
 * defines possible prepare services
 */
export declare type TPrepService = 'npm' | 'docker' | 'docker-gitlab' | 'ssh';
/**
 * the main exported prepare function
 * @param servieArg describes the service to prepare
 */
export declare let prepare: (serviceArg: TPrepService) => plugins.q.Promise<{}>;
