import http from 'http';

class Kernel {
  constructor(app) {
    this.app = app;
  }

  async makeServer() {
    const expressApp = await this.app.expressApp();
    return http.createServer(expressApp);
  }

  async start() {
    this.nodeServer = await this.makeServer();
    this.nodeServer.listen(this.app.config.port, () => {
      this.app.logger.trace(
        `Process with pid "${process.pid}" listening for connection port "${
          this.nodeServer.address().port
        }"...`,
      );
    });
    return this.nodeServer;
  }

  async close(cb) {
    return this.nodeServer.close(cb);
  }
}

export default Kernel;
