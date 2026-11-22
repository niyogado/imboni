import { Router, Request, Response, NextFunction } from 'express';
import { parentController } from '../controllers/parent.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Create parent - admin/headmaster only
router.post('/', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => parentController.create(req, res, next));

// Get parent by ID
router.get('/:id', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER', 'TEACHER', 'PARENT'), (req: Request, res: Response, next: NextFunction) => parentController.getById(req, res, next));

// List parents
router.get('/', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER', 'TEACHER'), (req: Request, res: Response, next: NextFunction) => parentController.list(req, res, next));

// Update parent
router.put('/:id', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER', 'PARENT'), (req: Request, res: Response, next: NextFunction) => parentController.update(req, res, next));

export default router;
