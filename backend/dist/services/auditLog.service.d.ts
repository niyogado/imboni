import { type AuditLogWithUser } from '../repositories/auditLog.repository';
export declare class AuditLogService {
    log(data: {
        userId?: number;
        action: string;
        entityType: string;
        entityId?: number;
        oldValues?: any;
        newValues?: any;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<any>;
    list(filters?: {
        userId?: number;
        action?: string;
        entityType?: string;
        limit?: number;
    }): Promise<AuditLogWithUser[]>;
}
export declare const auditLogService: AuditLogService;
//# sourceMappingURL=auditLog.service.d.ts.map