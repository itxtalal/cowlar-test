import * as winston from 'winston';

const { printf, combine, timestamp } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

var logger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp({ format: 'DD-MM-YYYY HH-mm-ss' }), logFormat),
});

export default logger;
