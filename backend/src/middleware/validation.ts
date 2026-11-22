import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../types';

export function validateRequest(req: Request, res: Response, next: NextFunction): void | Response {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((err) => ({
      field: err.type === 'field' ? (err.path as string) : 'unknown',
      message: err.msg,
    }));
    const apiError: ApiError = new Error('Validation failed');
    apiError.statusCode = 422;
    apiError.code = 'VALIDATION_ERROR';
    apiError.details = details;
    return next(apiError);
  }
  next();
}