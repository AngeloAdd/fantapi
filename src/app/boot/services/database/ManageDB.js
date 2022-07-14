import {Sequelize} from 'sequelize';

export default class ManageDB {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
    this.dbConnection = new Sequelize(this.config.name, this.config.user, this.config.password, {
      host: this.config.host,
      port: this.config.port,
      dialect: this.config.dialect,
      logging: this.logger.trace.bind(this.logger),
    });
  }

  async start() {
    return this.dbConnection.authenticate();
  }

  async close() {
    return this.dbConnection.close();
  }
}
