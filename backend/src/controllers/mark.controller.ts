import { Request, Response, NextFunction } from 'express';
import { markService } from '../services/mark.service';
import { AuthRequest } from '../types';

export class MarkController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const { studentId, subjectId, value, maxValue, term, academicYear, status, comment } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const mark = await markService.create({
        studentId, subjectId, value, maxValue, term, academicYear,
        status: status || 'DRAFT', recordedById: actorId, comment,
      }, actorId);
      res.status(201).json({ data: mark, meta: { action: 'createMark' } });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const mark = await markService.getById(id);
      if (!mark) {
        return res.status(404).json({ error: { code: 'MARK_NOT_FOUND', message: 'Mark not found' } });
      }
      res.json({ data: mark, meta: { action: 'getMark' } });
    } catch (err) {
      next(err);
    }
  }

  async listForParent(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const studentId = parseInt(req.params.studentId, 10);
      const parentId = parseInt(req.query.parentId as string, 10);
      const { status, term, academicYear, subjectId } = req.query;
      if (!parentId) {
        return res.status(422).json({ error: { code: 'MISSING_PARAM', message: 'parentId is required' } });
      }
      const marks = await markService.listForParent(studentId, parentId, {
        status: status as string,
        term: term as string,
        academicYear: academicYear as string,
        subjectId: subjectId ? parseInt(subjectId as string, 10) : undefined,
      });
      res.json({ data: marks, meta: { action: 'listMarksForParent' } });
    } catch (err) {
      next(err);
    }
  }

  async listForTeacher(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { status, studentId, subjectId, term, academicYear } = req.query;
      const marks = await markService.listForTeacher({
        status: status as string,
        studentId: studentId ? parseInt(studentId as string, 10) : undefined,
        subjectId: subjectId ? parseInt(subjectId as string, 10) : undefined,
        term: term as string,
        academicYear: academicYear as string,
      });
      res.json({ data: marks, meta: { action: 'listMarksForTeacher' } });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const { value, maxValue, comment } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const updated = await markService.update(id, { value, maxValue, comment }, actorId);
      res.json({ data: updated, meta: { action: 'updateMark' } });
    } catch (err) {
      next(err);
    }
  }

  async submit(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const submitted = await markService.submit(id, actorId);
      res.json({ data: submitted, meta: { action: 'submitMark' } });
    } catch (err) {
      next(err);
    }
  }

  async publish(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const published = await markService.publish(id, actorId);
      res.json({ data: published, meta: { action: 'publishMark' } });
    } catch (err) {
      next(err);
    }
  }
}

export const markController = new MarkController();
