import { Request, Response, NextFunction } from 'express';
import { permissionRequestService } from '../services/permissionRequest.service';
import { AuthRequest } from '../types';

export class PermissionRequestController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const { studentId, reason, startDate, expectedReturnDate } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const request = await permissionRequestService.create({
        studentId, reason,
        startDate: new Date(startDate),
        expectedReturnDate: new Date(expectedReturnDate),
        requesterId: actorId,
      }, actorId);
      res.status(201).json({ data: request, meta: { action: 'createPermissionRequest' } });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const request = await permissionRequestService.getById(id);
      if (!request) {
        return res.status(404).json({ error: { code: 'PERMISSION_REQUEST_NOT_FOUND', message: 'Permission request not found' } });
      }
      res.json({ data: request, meta: { action: 'getPermissionRequest' } });
    } catch (err) {
      next(err);
    }
  }

  async listForParent(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const studentId = parseInt(req.params.studentId, 10);
      const parentId = parseInt(req.query.parentId as string, 10);
      if (!parentId) {
        return res.status(422).json({ error: { code: 'MISSING_PARAM', message: 'parentId is required' } });
      }
      const requests = await permissionRequestService.listForParent(studentId, parentId);
      res.json({ data: requests, meta: { action: 'listPermissionRequestsForParent' } });
    } catch (err) {
      next(err);
    }
  }

  async listPending(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const requests = await permissionRequestService.listPending();
      res.json({ data: requests, meta: { action: 'listPendingPermissionRequests' } });
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { status, studentId } = req.query;
      const requests = await permissionRequestService.list({
        status: status as string,
        studentId: studentId ? parseInt(studentId as string, 10) : undefined,
      });
      res.json({ data: requests, meta: { action: 'listPermissionRequests' } });
    } catch (err) {
      next(err);
    }
  }

  async approve(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const { decisionReason } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const approved = await permissionRequestService.approve(id, actorId, decisionReason);
      res.json({ data: approved, meta: { action: 'approvePermissionRequest' } });
    } catch (err) {
      next(err);
    }
  }

  async reject(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const { decisionReason } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const rejected = await permissionRequestService.reject(id, actorId, decisionReason);
      res.json({ data: rejected, meta: { action: 'rejectPermissionRequest' } });
    } catch (err) {
      next(err);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const cancelled = await permissionRequestService.cancel(id, actorId);
      res.json({ data: cancelled, meta: { action: 'cancelPermissionRequest' } });
    } catch (err) {
      next(err);
    }
  }
}

export const permissionRequestController = new PermissionRequestController();
