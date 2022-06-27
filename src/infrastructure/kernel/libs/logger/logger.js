import path from 'path';
import {createLogger, format, transports} from 'winston';

const {combine, splat, json, timestamp, prettyPrint, colorize} = format;

export default class Logger {
  constructor(config) {
    this.config = config;
  }

  get() {
    return createLogger({
      silent: this._isSilent(this.config?.enabled),
      level: this.config?.level ?? 'debug',
      format: combine(splat(), timestamp(), json()),
      transports: [
        new transports.Console({format: combine(colorize(), prettyPrint())}),
        new transports.File({filename: path.join(this.config.logsDir, this._getLogFileName())}),
      ],
    });
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
