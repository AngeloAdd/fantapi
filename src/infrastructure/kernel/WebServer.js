import http from 'http';
import Logger from './libs/logger/logger.js';
import DbConnection from './DbConnection.js';
import Application from './Application.js';

export default class WebServer {
  server;

  constructor(config) {
    this.config = config;
    this.logger = new Logger(config.get('logging')).get();
    this.db = new DbConnection(config.get('database'));
    this.app = new Application(config, this.logger).create();
  }

  async boot() {
    this.server = http.createServer(this.app);
    this.server.listen(this.config.get('port'), () => {
      return `Listening for connection on port ${this.server.address().port}...`;
    });
  }

  async start() {
    await this.db.connect();
    await this.boot();
  }
}
