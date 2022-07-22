import config from './config.js';

export default {
  get: config.get(),
  logging: config.get('logging'),
  database: config.get('database'),
};
