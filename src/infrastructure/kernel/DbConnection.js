export default class DbConnection {
  constructor(config) {
    this.config = config;
  }

  async connect() {
    return 'connected';
  }
}
