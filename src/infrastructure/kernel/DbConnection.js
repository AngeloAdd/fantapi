import {Sequelize} from 'sequelize';

export default class DbConnection {
  db;

  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
  }

  async connect() {
    this.db = new Sequelize(this.config.name, this.config.user, this.config.password, {
      host: this.config.host,
      port: this.config.port,
      dialect: this.config.dialect,
    });

    try {
      await this.db.authenticate();
      return this.db;
    } catch (err) {
      this.logger.error('Db couldn\'t start', err);
    }
  }

  close(cb) {
    this.db.close(cb);
  }
}
