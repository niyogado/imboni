import { Request, Response, NextFunction } from 'express';
import { parentService } from '../services/parent.service';
import { AuthRequest } from '../types';

export class ParentController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const { firstName, lastName, phone, email } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const parent = await parentService.create({ firstName, lastName, phone, email }, actorId);
      res.status(201).json({ data: parent, meta: { action: 'createParent' } });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const parent = await parentService.getById(id);
      if (!parent) {
        return res.status(404).json({ error: { code: 'PARENT_NOT_FOUND', message: 'Parent not found' } });
      }
      res.json({ data: parent, meta: { action: 'getParent' } });
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const parents = await parentService.list();
      res.json({ data: parents, meta: { action: 'listParents' } });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const { firstName, lastName, phone, email } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const updated = await parentService.update(id, { firstName, lastName, phone, email }, actorId);
      res.json({ data: updated, meta: { action: 'updateParent' } });
    } catch (err) {
      next(err);
    }
  }
}

export const parentController = new ParentController();
