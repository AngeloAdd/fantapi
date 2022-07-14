import ManageDB from './ManageDB.js';
import logger from '../../../libs/logger/index.js';
import config from '../../../libs/config/index.js';

const manageDb = new ManageDB(config.database, logger);

export default manageDb;
