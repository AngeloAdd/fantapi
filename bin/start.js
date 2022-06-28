import webServer from '../src/infrastructure/kernel/index.js';

webServer.start().catch(error => {
  webServer.logger.fatal('An error occurred, impossible to start web server', error);

  webServer.dbConnection.close(() => {
    webServer.server.close(() => {
      process.exit(1);
    });
  });

  setTimeout(() => {
    process.exit(1);
  }, 30000).unref();
});
