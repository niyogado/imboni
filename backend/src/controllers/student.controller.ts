import { Request, Response, NextFunction } from 'express';
import { studentService } from '../services/student.service';
import { AuthRequest } from '../types';

export class StudentController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const { studentNumber, firstName, lastName, dateOfBirth, gender, classId } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const student = await studentService.create({
        studentNumber,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        classId,
      }, actorId);
      res.status(201).json({ data: student, meta: { action: 'createStudent' } });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const student = await studentService.getById(id);
      if (!student) {
        return res.status(404).json({ error: { code: 'STUDENT_NOT_FOUND', message: 'Student not found' } });
      }
      res.json({ data: student, meta: { action: 'getStudent' } });
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const students = await studentService.list();
      res.json({ data: students, meta: { action: 'listStudents' } });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const id = parseInt(req.params.id, 10);
      const { firstName, lastName, dateOfBirth, gender, classId, isActive } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const updated = await studentService.update(id, {
        firstName, lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender, classId, isActive,
      }, actorId);
      res.json({ data: updated, meta: { action: 'updateStudent' } });
    } catch (err) {
      next(err);
    }
  }
}

export const studentController = new StudentController();
