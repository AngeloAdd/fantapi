import http from 'http';

export default class WebServer {
  server;

  constructor(config, logger, dbConnection, app) {
    this.config = config;
    this.logger = logger;
    this.dbConnection = dbConnection;
    this.app = app;
  }

  async boot() {
    this.server = http.createServer(this.app);
    this.server.listen(this.config.get('port'), () => {
      return `Listening for connection on port ${this.server.address().port}...`;
    });
  }

  async start() {
    await this.dbConnection.connect();
    await this.boot();
  }
}
