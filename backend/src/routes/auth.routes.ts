import { Router, Request, Response, NextFunction } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { body } from 'express-validator';

const router = Router();

// Public: register
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name required'),
    body('lastName').notEmpty().withMessage('Last name required'),
    body('roleName').notEmpty().withMessage('Role required'),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => authController.register(req, res, next)
);

// Public: login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next)
);

// Protected: get profile
router.get('/me', authenticate, (req: Request, res: Response, next: NextFunction) => authController.getProfile(req, res, next));

export default router;