import { NextFunction, Request, RequestHandler, Response } from 'express';
import { CustomError } from './Errors';
import logger from '../logger';

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = `${req.method} ${req.url} ${req.headers.origin} ${
    err.status
  } ${err.description ?? err}`;

  logger.error(message);

  res.status(err.status ?? 500).json({
    msg:
      err.message ??
      'Something went wrong when trying to process your request. Please try again.',
    status: 'FAILED',
  });
};

const RequestErrorHandler = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default errorHandler;
export { RequestErrorHandler };
