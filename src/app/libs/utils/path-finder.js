import {fileURLToPath, URL} from 'url';
import path from 'path';

export function getProjectDir() {
  return fileURLToPath(new URL(path.join('..', '..', '..', '..'), import.meta.url));
}

export const getSrcDir = () => path.join(getProjectDir(), 'src');

export const getInfrastructureDir = () => path.join(getSrcDir(), 'infrastructure');

export const getConfigPath = () => path.join(getSrcDir(), path.join('config', 'config.js'));

export const getLogsDir = () => path.join(getProjectDir(), 'logs');
