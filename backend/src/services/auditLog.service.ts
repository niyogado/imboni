import { auditLogRepository, type AuditLogWithUser } from '../repositories/auditLog.repository';

export class AuditLogService {
  async log(data: {
    userId?: number;
    action: string;
    entityType: string;
    entityId?: number;
    oldValues?: any;
    newValues?: any;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<any> {
    return auditLogRepository.create(data);
  }

  async list(filters?: { userId?: number; action?: string; entityType?: string; limit?: number }): Promise<AuditLogWithUser[]> {
    return auditLogRepository.list(filters);
  }
}

export const auditLogService = new AuditLogService();