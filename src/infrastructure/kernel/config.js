import convict from 'convict';
import {getLogsDir, getProjectDir} from './libs/utils/path-finder.js';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['live', 'staging', 'local', 'test'],
    default: 'local',
    env: 'NODE_ENV',
  },
  baseDir: {
    doc: 'base directory of the application.',
    format: String,
    default: getProjectDir(),
  },
  url: {
    doc: 'Base url of the api',
    format: String,
    default: 'http://localhost',
    env: 'API_URL',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: '*',
    default: '127.0.0.1',
    env: 'API_IP',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8000,
    env: 'PORT',
    arg: 'port',
  },
  api: {
    apiName: {
      doc: 'The api name.',
      format: String,
      default: 'express',
      env: 'API_NAME',
    },
    apiVersion: {
      doc: 'Api version.',
      format: String,
      default: '1.0.0',
      env: 'API_VERSION',
    },
  },
  database: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: 'localhost',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5435,
      env: 'DB_PORT',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'express',
      env: 'DB_NAME',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'root',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'password',
      env: 'DB_PASSWORD',
    },
    dialect: {
      doc: 'SQL dialect',
      format: String,
      default: 'postgres',
      env: 'DB_DIALECT',
    },
  },
  logging: {
    enabled: {
      doc: 'Enable logging',
      format: Boolean,
      default: 'true',
      env: 'LOG_ENABLED',
    },
    level: {
      doc: 'Determine level of logging',
      format: String,
      default: 'debug',
      env: 'LOG_LEVEL',
    },
    logsDir: {
      doc: 'directory to store logs',
      format: String,
      default: getLogsDir(),
    },
  },
});

// Load environment dependent configuration
// const env = config.get('env');
// config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});

export default config;
