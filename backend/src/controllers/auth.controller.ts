import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { AuthRequest, AuthUser } from '../types';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { email, phone, password, firstName, lastName, roleName } = req.body;
      const { user, token } = await authService.register({
        email,
        phone,
        password,
        firstName,
        lastName,
        roleName,
      });
      res.status(201).json({
        data: { user: { id: user.id, email: user.email, role: user.role.name }, token },
        meta: { action: 'register' },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login({
        email,
        password,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });
      res.json({
        data: { user: { id: user.id, email: user.email, role: user.role.name }, token },
        meta: { action: 'login' },
      });
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      if (!authReq.user) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const user = await authService.getProfile(authReq.user.id);
      if (!user) {
        return res.status(404).json({ error: { code: 'USER_NOT_FOUND', message: 'User not found' } });
      }
      res.json({
        data: { user: { id: user.id, email: user.email, role: user.role.name, firstName: user.firstName, lastName: user.lastName } },
        meta: { action: 'getProfile' },
      });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
