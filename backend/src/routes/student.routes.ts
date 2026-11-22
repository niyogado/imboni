import { Router, Request, Response, NextFunction } from 'express';
import { studentController } from '../controllers/student.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Create student - staff only
router.post('/', authenticate, authorize('ADMINISTRATOR', 'TEACHER', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => studentController.create(req, res, next));

// Get student by ID
router.get('/:id', authenticate, authorize('ADMINISTRATOR', 'TEACHER', 'HEADMASTER', 'PARENT'), (req: Request, res: Response, next: NextFunction) => studentController.getById(req, res, next));

// List students
router.get('/', authenticate, authorize('ADMINISTRATOR', 'TEACHER', 'HEADMASTER', 'PARENT'), (req: Request, res: Response, next: NextFunction) => studentController.list(req, res, next));

// Update student
router.put('/:id', authenticate, authorize('ADMINISTRATOR', 'TEACHER', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => studentController.update(req, res, next));

export default router;
