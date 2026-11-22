import { Router, Request, Response, NextFunction } from 'express';
import { parentStudentLinkController } from '../controllers/parentStudentLink.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Create parent-student link - admin/headmaster only
router.post('/', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => parentStudentLinkController.link(req, res, next));

// Remove link - admin/headmaster only
router.delete('/:linkId', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER'), (req: Request, res: Response, next: NextFunction) => parentStudentLinkController.unlink(req, res, next));

// Get linked students for a parent
router.get('/parents/:parentId/students', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER', 'TEACHER', 'PARENT'), (req: Request, res: Response, next: NextFunction) => parentStudentLinkController.getLinkedStudents(req, res, next));

// Verify parent can access student
router.get('/verify/:parentId/students/:studentId', authenticate, authorize('ADMINISTRATOR', 'HEADMASTER', 'TEACHER', 'PARENT'), (req: Request, res: Response, next: NextFunction) => parentStudentLinkController.verifyAccess(req, res, next));

export default router;
