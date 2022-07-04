import path from 'path';
import config from '../config/index.js';
import pino from 'pino';

class Logger {
  constructor(config) {
    this.config = config;
    this.fileLogger = this._setLoggerStream();
  }

  _setLoggerStream() {
    const prettified = {levelFirst: true, level: this.config.level, stream: pino.destination(1)};
    const filesystem = {
      level: this.config.logStoredLevel,
      sync: true,
      stream: pino.destination({
        dest: path.join(this.config?.logsDir ?? 'logs', this._getLogFileName()),
        sync: true,
        append: true,
      }),
    };

    return pino(
      {
        enabled: this.config.enabled,
        base: undefined,
        level: 'ciao',
        customLevels: {
          ciao: 25,
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
          level: (label) => {
            return {level: label.toUpperCase()};
          },
        },
      },
      pino.multistream([prettified, filesystem]),
    );
  }

  _setLoggerWithTransport() {
    return pino(
      {
        timestamp: pino.stdTimeFunctions.isoTime,
        level: 'debug',
        base: undefined,
        levels: {
          ciao: 25,
        },
      },
      pino.transport({
        levels: {ciao: 25},
        targets: [
          {
            target: 'pino/file',
            options: {
              level: 'ciao',
              destination: path.join(this.config?.logsDir ?? 'logs', this._getLogFileName()),
              mkdir: true,
            },
          },
          {
            target: 'pino/file',
            options: {
              level: 'ciao',
              levelFirst: true,
              colorize: true,
              destination: 1,
            },
          },
        ],
      }),
    );
  }

  get() {
    return this.fileLogger;
  }

  _getLogFileName = () => {
    const addZeroIfSingleDigit = (val) => (/^\d$/.test(val) ? `0${val}` : val);
    const day = new Date().getDate().toString();
    const month = (new Date().getMonth() + 1).toString();
    const year = new Date().getFullYear();

    return `${addZeroIfSingleDigit(day)}_${addZeroIfSingleDigit(month)}_${year}.log`;
  };

  _isSilent = (enabled) => !(enabled ?? true);
}

export default new Logger(config.logging).get();
