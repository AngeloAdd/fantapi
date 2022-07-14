import cors from 'cors';
import express from 'express';
import {pinoHttp} from 'pino-http';
import handleNotFoundMiddleware from '../../libs/http/middlewares/handleNotFound.middleware.js';
import handleErrorMiddleware from '../../libs/http/middlewares/handleError.middleware.js';

export default class Application {
  constructor(config, logger, errorHandler) {
    this.config = config;
    this.logger = logger;
    this.errorHandler = errorHandler;
    this.appServices = {};
  }

  async expressApp() {
    const expressApp = express();
    expressApp.locals.errorHandler = this.errorHandler;
    expressApp.use(cors());
    expressApp.use(express.json());
    expressApp.use(
      pinoHttp({
        logger: this.logger,
        useLevel: 'debug',
      }),
    );
    expressApp.get('/favicon.ico', (req, res) => res.status(204));
    expressApp.get('/', (req, res) => res.json(['ok']));
    expressApp.use(handleNotFoundMiddleware);
    expressApp.use(handleErrorMiddleware(this.errorHandler));
    return expressApp;
  }

  registerDatabase(database) {
    this.appServices.database = database;
    return this;
  }
}
