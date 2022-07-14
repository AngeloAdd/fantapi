import config from '../config/index.js';
import Logger from './Logger.js';

export default new Logger(config.logging).get();
