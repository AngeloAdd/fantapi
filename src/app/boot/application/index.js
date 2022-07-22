import logger from '../../libs/logger/index.js';
import Application from './Application.js';
import config from '../../libs/config/index.js';
import ErrorHandler from '../../libs/error-handler/ErrorHandler.js';
import RoutesLoader from '../../libs/http/routes/RoutesLoader.js';
import routes from '../../libs/http/routes/routes.js';

const errorHandler = new ErrorHandler(logger);
const routesLoader = new RoutesLoader(config.get, routes);

const app = new Application(config.get, logger, routesLoader, errorHandler);

export default app;
