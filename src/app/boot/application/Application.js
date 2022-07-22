import cors from 'cors';
import express from 'express';
import {pinoHttp} from 'pino-http';
import helmet from 'helmet';
import handleNotFoundMiddleware from '../../libs/http/middlewares/handleNotFound.middleware.js';
import handleErrorMiddleware from '../../libs/http/middlewares/handleError.middleware.js';

export default class Application {
  constructor(config, logger, routesLoader, errorHandler) {
    this.config = config;
    this.logger = logger;
    this.routesLoader = routesLoader;
    this.errorHandler = errorHandler;
    this.appServices = {};
  }

  async expressApp() {
    const expressApp = express();
    expressApp.locals.errorHandler = this.errorHandler;
    expressApp.locals.logger = this.logger;
    expressApp.use(helmet());
    expressApp.use(cors());
    expressApp.use(express.json());
    expressApp.use(
      pinoHttp({
        logger: this.logger,
        useLevel: 'debug',
      }),
    );
    this.routesLoader.load(expressApp);
    expressApp.use(handleNotFoundMiddleware);
    expressApp.use(handleErrorMiddleware(this.errorHandler));
    return expressApp;
  }

  registerDatabase(database) {
    this.appServices.database = database;
    return this;
  }
}
