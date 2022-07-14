import path from 'path';
import pino from 'pino';

class Logger {
  constructor(config) {
    this.config = config;
    this.date = new Date();
    this.fileLogger = this.setLogger();
  }

  setLogger() {
    const prettified = {levelFirst: true, level: this.config.level, stream: pino.destination(1)};
    const filesystem = {
      level: this.config.logStoredLevel,
      sync: true,
      stream: pino.destination({
        dest: path.join(this.config?.logsDir ?? 'logs', this.getLogFileName()),
        sync: true,
        append: true,
      }),
    };

    return pino(
      {
        enabled: this.config.enabled,
        base: undefined,
        level: this.config?.level ?? 'trace',
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
          level: (label) => ({level: label.toUpperCase()}),
        },
      },
      pino.multistream([prettified, filesystem]),
    );
  }

  get() {
    return this.fileLogger;
  }

  getLogFileName() {
    const addZeroIfSingleDigit = (val) => (/^\d$/.test(val) ? `0${val}` : val);
    const day = this.date.getDate().toString();
    const month = (this.date.getMonth() + 1).toString();
    const year = this.date.getFullYear();

    return `${addZeroIfSingleDigit(day)}_${addZeroIfSingleDigit(month)}_${year}.log`;
  }
}

export default Logger;
