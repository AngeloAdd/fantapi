import config from './config.js';

export default {
  config: config.get(),
  logging: config.get('logging'),
  database: config.get('database'),
};
