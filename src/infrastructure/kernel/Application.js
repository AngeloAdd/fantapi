import express from 'express';

export default class Application {
  constructor(config) {
    this.config = config;
  }

  create() {
    return express();
  }
}
