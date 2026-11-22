import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler, notFound } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import studentRoutes from './routes/student.routes';
import parentRoutes from './routes/parent.routes';
import parentStudentLinkRoutes from './routes/parentStudentLink.routes';
import markRoutes from './routes/mark.routes';
import incidentRoutes from './routes/incident.routes';
import permissionRequestRoutes from './routes/permissionRequest.routes';
import notificationRoutes from './routes/notification.routes';
import auditLogRoutes from './routes/auditLog.routes';

export function createApp(): Application {
  const app = express();

  // Trust proxy (important behind reverse proxy)
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet());
  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    })
  );

  // Body parsing
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Logging
  app.use(morgan('combined'));

  // Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'imboni-backend', env: config.nodeEnv });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/students', studentRoutes);
  app.use('/api/parents', parentRoutes);
  app.use('/api/parent-student-links', parentStudentLinkRoutes);
  app.use('/api/marks', markRoutes);
  app.use('/api/incidents', incidentRoutes);
  app.use('/api/permission-requests', permissionRequestRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/audit-logs', auditLogRoutes);

  // 404 handler
  app.use(notFound);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}