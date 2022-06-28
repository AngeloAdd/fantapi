import express from 'express';

export default class Application {
  constructor(config, logger, dbConnection) {
    this.config = config;
    this.logger = logger;
    this.dbConnection = dbConnection;
  }

  create() {
    return express();
  }
}
