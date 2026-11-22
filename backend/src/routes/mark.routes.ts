import { Router, Request, Response, NextFunction } from 'express';
import { markController } from '../controllers/mark.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Create mark - teacher only
router.post('/', authenticate, authorize('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => markController.create(req, res, next));

// Get mark by ID
router.get('/:id', authenticate, authorize('TEACHER', 'HEADMASTER', 'ADMINISTRATOR', 'PARENT'), (req: Request, res: Response, next: NextFunction) => markController.getById(req, res, next));

// List marks for parent (parent sees only published marks of linked children)
router.get('/students/:studentId', authenticate, authorize('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => markController.listForParent(req, res, next));

// List marks for teacher/staff
router.get('/', authenticate, authorize('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => markController.listForTeacher(req, res, next));

// Update mark (correction keeps history)
router.put('/:id', authenticate, authorize('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => markController.update(req, res, next));

// Submit mark for review
router.post('/:id/submit', authenticate, authorize('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => markController.submit(req, res, next));

// Publish mark
router.post('/:id/publish', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => markController.publish(req, res, next));

export default router;
