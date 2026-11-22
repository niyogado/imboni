import { Router, Request, Response, NextFunction } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Create notification
router.post('/', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR', 'TEACHER'), (req: Request, res: Response, next: NextFunction) => notificationController.create(req, res, next));

// Get notification by ID
router.get('/:id', authenticate, authorize('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => notificationController.getById(req, res, next));

// List notifications for recipient
router.get('/recipient/:recipientId', authenticate, authorize('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => notificationController.listForRecipient(req, res, next));

// Update delivery status
router.patch('/:id/status', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => notificationController.updateDeliveryStatus(req, res, next));

export default router;
