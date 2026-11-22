import { Router, Request, Response, NextFunction } from 'express';
import { permissionRequestController } from '../controllers/permissionRequest.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Create permission request
router.post('/', authenticate, authorize('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.create(req, res, next));

// Get permission request by ID
router.get('/:id', authenticate, authorize('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.getById(req, res, next));

// List permission requests for parent (linked children only)
router.get('/students/:studentId', authenticate, authorize('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.listForParent(req, res, next));

// List pending requests (for headmaster approval)
router.get('/pending', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.listPending(req, res, next));

// List all permission requests
router.get('/', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR', 'TEACHER'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.list(req, res, next));

// Approve - headmaster only
router.post('/:id/approve', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.approve(req, res, next));

// Reject - headmaster only
router.post('/:id/reject', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.reject(req, res, next));

// Cancel - requester can cancel while pending
router.post('/:id/cancel', authenticate, authorize('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => permissionRequestController.cancel(req, res, next));

export default router;
