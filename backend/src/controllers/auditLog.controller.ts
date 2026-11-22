import { Request, Response, NextFunction } from 'express';
import { auditLogService } from '../services/auditLog.service';

export class AuditLogController {
  async list(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { userId, action, entityType, limit } = req.query;
      const logs = await auditLogService.list({
        userId: userId ? parseInt(userId as string, 10) : undefined,
        action: action as string,
        entityType: entityType as string,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      res.json({ data: logs, meta: { action: 'listAuditLogs' } });
    } catch (err) {
      next(err);
    }
  }
}

export const auditLogController = new AuditLogController();