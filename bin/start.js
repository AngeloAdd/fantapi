import webServer from '../src/app/boot/index.js';
import gracefulShutdown from '../src/app/libs/utils/graceful-shutdown.js';
import manageDb from '../src/app/boot/services/database/index.js';
import {signals} from '../src/app/libs/utils/constants.js';

async function start() {
  process.on('uncaughtException', (error) => {
    webServer.app.errorHandler.handleError(error);
  });

  try {
    // handle programmer errors
    process.on('unhandledRejection', (error) => {
      throw error;
    });

    Object.keys(signals).forEach((signal) => {
      process.on(signal, gracefulShutdown(webServer)(0));
    });

    webServer.app.errorHandler.once(
      webServer.app.errorHandler.getEventName(),
      gracefulShutdown(webServer)(1),
    );

    await webServer.start();
    try {
      await manageDb.start();
      webServer.app.registerDatabase(manageDb);
    } catch (onStartException) {
      webServer.app.errorHandler.handleError(onStartException);
    }
  } catch (err) {
    webServer.app.logger.fatal(err, 'Impossible to start server, exiting process...');
    process.exit(1);
  }
}

start().catch((error) => {
  webServer.app.logger.fatal(error);
  process.exit(1);
});
