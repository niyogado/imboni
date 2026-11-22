import { Router, Request, Response, NextFunction } from 'express';
import { auditLogController } from '../controllers/auditLog.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// List audit logs - admin/headmaster only
router.get('/', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => auditLogController.list(req, res, next));

export default router;
