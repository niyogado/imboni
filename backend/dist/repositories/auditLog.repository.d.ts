export interface AuditLogWithUser extends AuditLog {
    user?: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: {
            name: string;
        };
    } | null;
}
export declare class AuditLogRepository {
    create(data: {
        userId?: number;
        action: string;
        entityType: string;
        entityId?: number;
        oldValues?: any;
        newValues?: any;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<AuditLog>;
    list(filters?: {
        userId?: number;
        action?: string;
        entityType?: string;
        limit?: number;
    }): Promise<AuditLogWithUser[]>;
}
export declare const auditLogRepository: AuditLogRepository;
//# sourceMappingURL=auditLog.repository.d.ts.map