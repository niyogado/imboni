import { Router, Request, Response, NextFunction } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// All users list - admin/headmaster only
router.get('/', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => userController.list(req, res, next));

// Get user by ID
router.get('/:id', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER', 'TEACHER'), (req: Request, res: Response, next: NextFunction) => userController.getById(req, res, next));

// Update user
router.put('/:id', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => userController.update(req, res, next));

// Deactivate user - admin only
router.delete('/:id', authenticate, authorize('ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => userController.deactivate(req, res, next));

export default router;
