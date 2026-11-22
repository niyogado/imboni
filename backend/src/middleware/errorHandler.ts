import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../types';

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';

  // Log error details server-side (never to client)
  if (statusCode >= 500) {
    console.error('[ERROR]', {
      message: err.message,
      stack: err.stack,
      code,
    });
  }

  const response: any = {
    error: { code, message },
  };

  if (err.details) {
    response.error.details = err.details;
  }

  // Include stack in non-production only
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.error.stack = err.stack;
  }

  return res.status(statusCode).json(response);
}

export function notFound(_req: Request, res: Response): Response {
  return res.status(404).json({
    error: { code: 'NOT_FOUND', message: 'Resource not found' },
  });
}