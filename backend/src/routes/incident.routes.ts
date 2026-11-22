import { Router, Request, Response, NextFunction } from 'express';
import { incidentController } from '../controllers/incident.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Create incident - staff only
router.post('/', authenticate, authorize('TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => incidentController.create(req, res, next));

// Get incident by ID
router.get('/:id', authenticate, authorize('TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR', 'PARENT'), (req: Request, res: Response, next: NextFunction) => incidentController.getById(req, res, next));

// List incidents for parent (parent sees only approved incidents of linked children)
router.get('/students/:studentId', authenticate, authorize('PARENT', 'TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => incidentController.listForParent(req, res, next));

// List incidents for staff
router.get('/', authenticate, authorize('TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => incidentController.listForStaff(req, res, next));

// Review incident
router.post('/:id/review', authenticate, authorize('DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => incidentController.review(req, res, next));

// Approve incident - headmaster/admin only
router.post('/:id/approve', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => incidentController.approve(req, res, next));

// Reject incident - headmaster/admin only
router.post('/:id/reject', authenticate, authorize('HEADMASTER', 'ADMINISTRATOR'), (req: Request, res: Response, next: NextFunction) => incidentController.reject(req, res, next));

export default router;
