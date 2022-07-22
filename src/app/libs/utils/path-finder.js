import {fileURLToPath, URL} from 'url';
import path from 'path';

export function getProjectDir() {
  return fileURLToPath(new URL(path.join('..', '..', '..', '..'), import.meta.url));
}

export const getSrcDir = () => path.join(getProjectDir(), 'src');

export const getAppDir = () => path.join(getSrcDir(), 'app');

export const getLibsPath = () => path.join(getAppDir(), 'libs');

export const getConfigPath = () => path.join(getLibsPath(), path.join('config'));

export const getLogsDir = () => path.join(getProjectDir(), 'logs');

export const getModulesDir = () => path.join(getSrcDir(), 'modules');
