import webServer from '../src/app/boot/index.js';
import gracefulShutdown from '../src/app/libs/utils/graceful-shutdown.js';
import manageDb from '../src/app/boot/services/database/index.js';
import {signals} from '../src/app/libs/utils/constants.js';

async function start() {
  try {
    await webServer.start();
    try {
      await manageDb.start();
      webServer.app.registerDatabase(manageDb);
    } catch (onStartException) {
      webServer.app.errorHandler.handleError(onStartException);
    }

    // handle programmer errors
    process.on('unhandledRejection', (error) => {
      throw error;
    });

    process.on('uncaughtException', (error) => {
      webServer.app.errorHandler.handleError(error);
    });

    Object.keys(signals).forEach((signal) => {
      process.on(signal, gracefulShutdown(webServer)(0));
    });

    webServer.app.errorHandler.once(
      webServer.app.errorHandler.getEventName(),
      gracefulShutdown(webServer)(1),
    );
  } catch (err) {
    webServer.app.logger.error(err, 'Impossible to start server, exiting process...');
    process.exit(1);
  }
}

start();
