import 'dotenv/config';
import WebServer from './WebServer.js';
import config from './config.js';
import Logger from './libs/logger/logger.js';
import DbConnection from './DbConnection.js';
import Application from './Application.js';

const logger = new Logger(config.get('logging')).get();
const dbConnection = new DbConnection(config.get('database'), logger);
const app = new Application(config, logger, dbConnection).create();

export default new WebServer(config, logger, dbConnection, app);
