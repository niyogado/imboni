import { Request, Response, NextFunction } from 'express';
import { incidentService } from '../services/incident.service';
import { AuthRequest } from '../types';

export class IncidentController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const { studentId, title, description, category, date, responsibleStaffId, status } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const incident = await incidentService.create({
        studentId, title, description, category,
        date: new Date(date), responsibleStaffId,
        status: status || 'RECORDED',
      }, actorId);
      res.status(201).json({ data: incident, meta: { action: 'createIncident' } });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const incident = await incidentService.getById(id);
      if (!incident) {
        return res.status(404).json({ error: { code: 'INCIDENT_NOT_FOUND', message: 'Incident not found' } });
      }
      res.json({ data: incident, meta: { action: 'getIncident' } });
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
      const incidents = await incidentService.listForParent(studentId, parentId);
      res.json({ data: incidents, meta: { action: 'listIncidentsForParent' } });
    } catch (err) {
      next(err);
    }
  }

  async listForStaff(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { status, studentId, category } = req.query;
      const incidents = await incidentService.listForStaff({
        status: status as string,
        studentId: studentId ? parseInt(studentId as string, 10) : undefined,
        category: category as string,
      });
      res.json({ data: incidents, meta: { action: 'listIncidentsForStaff' } });
    } catch (err) {
      next(err);
    }
  }

  async review(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const reviewed = await incidentService.review(id, actorId);
      res.json({ data: reviewed, meta: { action: 'reviewIncident' } });
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
      const approved = await incidentService.approve(id, actorId, decisionReason);
      res.json({ data: approved, meta: { action: 'approveIncident' } });
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
      const rejected = await incidentService.reject(id, actorId, decisionReason);
      res.json({ data: rejected, meta: { action: 'rejectIncident' } });
    } catch (err) {
      next(err);
    }
  }
}

export const incidentController = new IncidentController();
