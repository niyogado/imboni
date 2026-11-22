"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogRepository = exports.AuditLogRepository = void 0;
const database_1 = require("../config/database");
class AuditLogRepository {
    async create(data) {
        return database_1.prisma.auditLog.create({
            data: {
                userId: data.userId,
                action: data.action,
                entityType: data.entityType,
                entityId: data.entityId,
                oldValues: data.oldValues,
                newValues: data.newValues,
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
            },
        });
    }
    async list(filters) {
        return database_1.prisma.auditLog.findMany({
            where: {
                ...(filters?.userId && { userId: filters.userId }),
                ...(filters?.action && { action: filters.action }),
                ...(filters?.entityType && { entityType: filters.entityType }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        role: { select: { name: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: filters?.limit ?? 100,
        });
    }
}
exports.AuditLogRepository = AuditLogRepository;
exports.auditLogRepository = new AuditLogRepository();
//# sourceMappingURL=auditLog.repository.js.map