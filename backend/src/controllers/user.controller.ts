import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { AuthRequest } from '../types';

export class UserController {
  async list(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const users = await userService.list();
      res.json({ data: users, meta: { action: 'listUsers' } });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await userService.getById(id);
      if (!user) {
        return res.status(404).json({ error: { code: 'USER_NOT_FOUND', message: 'User not found' } });
      }
      res.json({ data: user, meta: { action: 'getUser' } });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const { email, phone, firstName, lastName, isActive } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const updated = await userService.update(id, { email, phone, firstName, lastName, isActive }, actorId);
      res.json({ data: updated, meta: { action: 'updateUser' } });
    } catch (err) {
      next(err);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const deactivated = await userService.deactivate(id, actorId);
      res.json({ data: deactivated, meta: { action: 'deactivateUser' } });
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
