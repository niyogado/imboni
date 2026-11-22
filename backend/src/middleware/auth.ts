import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthRequest, AuthUser } from '../types';

export function authenticate(req: Request, res: Response, next: NextFunction): void | Response {
  const authReq = req as unknown as AuthRequest;
  const authHeader = (authReq.headers as any)['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: { code: 'UNAUTHENTICATED', message: 'Authentication required' },
    });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number;
      email: string;
      role: string;
    };

    authReq.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role as AuthUser['role'],
      firstName: '',
      lastName: '',
    };

    next();
  } catch {
    return res.status(401).json({
      error: { code: 'TOKEN_INVALID', message: 'Invalid or expired token' },
    });
  }
}

export function optionalAuthenticate(req: Request, res: Response, next: NextFunction): void {
  const authReq = req as unknown as AuthRequest;
  const authHeader = (authReq.headers as any)['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number;
      email: string;
      role: string;
    };

    authReq.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role as AuthUser['role'],
      firstName: '',
      lastName: '',
    };
  } catch {
    // No user set, continue as unauthenticated
  }

  next();
}
