import { Request, Response, NextFunction } from 'express';
import { AuthRequest, AuthUser } from '../types';

export function authorize(...allowedRoles: AuthUser['role'][]) {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const authReq = req as unknown as AuthRequest;

    if (!authReq.user) {
      return res.status(401).json({
        error: { code: 'UNAUTHENTICATED', message: 'Authentication required' },
      });
    }

    if (!allowedRoles.includes(authReq.user.role)) {
      return res.status(403).json({
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
      });
    }

    next();
  };
}

export function requireRole(role: AuthUser['role']) {
  return authorize(role);
}
