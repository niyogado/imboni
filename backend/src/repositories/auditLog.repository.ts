import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export interface AuditLogWithUser extends AuditLog {
  user?: { id: number; email: string; firstName: string; lastName: string; role: { name: string } } | null;
}

export class AuditLogRepository {
  async create(data: {
    userId?: number;
    action: string;
    entityType: string;
    entityId?: number;
    oldValues?: any;
    newValues?: any;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<AuditLog> {
    return prisma.auditLog.create({
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

  async list(filters?: { userId?: number; action?: string; entityType?: string; limit?: number }): Promise<AuditLogWithUser[]> {
    return prisma.auditLog.findMany({
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

export const auditLogRepository = new AuditLogRepository();
