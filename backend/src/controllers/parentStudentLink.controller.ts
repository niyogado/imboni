import { Request, Response, NextFunction } from 'express';
import { parentStudentLinkService } from '../services/parentStudentLink.service';
import { AuthRequest } from '../types';

export class ParentStudentLinkController {
  async link(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const { parentId, studentId, relationship } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const link = await parentStudentLinkService.link({ parentId, studentId, relationship, linkedById: actorId });
      res.status(201).json({ data: link, meta: { action: 'linkParentStudent' } });
    } catch (err) {
      next(err);
    }
  }

  async unlink(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const linkId = parseInt(req.params.linkId, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      await parentStudentLinkService.unlink(linkId, actorId);
      res.json({ data: { linkId }, meta: { action: 'unlinkParentStudent' } });
    } catch (err) {
      next(err);
    }
  }

  async getLinkedStudents(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const parentId = parseInt(req.params.parentId, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const links = await parentStudentLinkService.getLinkedStudents(parentId);
      res.json({ data: links, meta: { action: 'getLinkedStudents' } });
    } catch (err) {
      next(err);
    }
  }

  async verifyAccess(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const parentId = parseInt(req.params.parentId, 10);
      const studentId = parseInt(req.params.studentId, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const link = await parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);
      res.json({ data: { linked: true, link }, meta: { action: 'verifyParentAccess' } });
    } catch (err) {
      next(err);
    }
  }
}

export const parentStudentLinkController = new ParentStudentLinkController();
