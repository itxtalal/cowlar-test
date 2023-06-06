import { Request, Response, NextFunction } from 'express';
import { Result, validationResult, ValidationError } from 'express-validator';

export const validateSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Result = validationResult(req);
  const errorMessages: ValidationError[] = errors.array();

  if (!errorMessages.length) return next();
  else
    return res.status(422).json({
      status: 'FAILED',
      message: 'Invalid request - Schema validation failed',
      errors: errorMessages,
    });
};
