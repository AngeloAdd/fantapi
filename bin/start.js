import WebServer from '../src/infrastructure/kernel/WebServer.js';
import config from '../src/infrastructure/kernel/config.js';

const webServer = new WebServer(config);

webServer.start().catch(error => {
  webServer.logger.fatal('An error occurred, impossible to start web server', error);

  webServer.db.close(() => {
    webServer.server.close(() => {
      process.exit(1);
    });
  });

  setTimeout(() => {
    process.exit(1);
  }, 30000).unref();
});
