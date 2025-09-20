import pino from 'pino';
import pinoHttp from 'pino-http';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    : undefined
});

export const httpLogger = pinoHttp({
  logger,
  autoLogging: true,
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode
      };
    },
    err(err) {
      return {
        type: err.name,
        message: err.message,
        stack: err.stack
      };
    }
  },
  customSuccessMessage: function (_req, res) {
    const status = res?.statusCode ?? 200;
    if (status >= 500) return 'request errored';
    if (status >= 400) return 'request failed';
    return 'request completed';
  },
  customErrorMessage: function (req, res, error) {
    // consume arguments to satisfy linting, we don't need them for the message
    void req;
    void res;
    void error;
    return 'request errored';
  },
  customLogLevel: function (_req, res, err) {
    const status = res?.statusCode ?? 200;
    if (err || status >= 500) return 'error';
    if (status >= 400) return 'warn';
    return 'info';
  }
});


