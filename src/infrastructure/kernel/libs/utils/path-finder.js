import {fileURLToPath, URL} from 'url';
import path from 'path';

export const getProjectDir = () => fileURLToPath(new URL(path.join('..', '..', '..', '..', '..'), import.meta.url));

export const getSrcDir = () => path.join(getProjectDir(), 'src');

export const getConfigPath = () => path.join(getSrcDir(), path.join('config', 'config.js'));

export const getLogsDir = () => path.join(getProjectDir(), 'logs');
