import logger from '../../libs/logger/index.js';
import Application from './Application.js';
import config from '../../libs/config/index.js';
import ErrorHandler from '../../libs/error-handler/ErrorHandler.js';

const errorHandler = new ErrorHandler(logger);

const app = new Application(config.config, logger, errorHandler);

export default app;
