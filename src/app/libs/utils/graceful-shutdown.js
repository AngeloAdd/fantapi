import {processExitCode} from './constants.js';
import logger from '../logger/index.js';

export default (server) => (code) => async (reason) => {
  try {
    logger.info(`Exiting process with reason: ${reason?.stack ?? reason}`);

    logger.trace('Closing database...');
    server.app.database?.close();
    logger.trace('Database closed!');

    logger.trace('Closing node server...');
    // eslint-disable-next-line no-process-exit
    await server.close(() => process.exit(code));
    // eslint-disable-next-line no-process-exit
    setTimeout(() => process.exit(code));
  } catch (err) {
    logger.error('An error occurred while closing server, forcing exit...', {error: err.stack});
    // eslint-disable-next-line no-process-exit
    process.exit(processExitCode.FAIL);
  }
};
