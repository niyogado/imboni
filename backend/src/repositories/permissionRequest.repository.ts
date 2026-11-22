import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export interface PermissionRequestWithDetails extends PermissionRequest {
  student: { id: number; studentNumber: string; firstName: string; lastName: string };
  requester: { id: number; firstName: string; lastName: string; email: string };
  decidedBy?: { id: number; firstName: string; lastName: string } | null;
}

export class PermissionRequestRepository {
  async findById(id: number): Promise<PermissionRequestWithDetails | null> {
    return prisma.permissionRequest.findUnique({
      where: { id },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        requester: { select: { id: true, firstName: true, lastName: true, email: true } },
        decidedBy: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async findByStudent(studentId: number): Promise<PermissionRequestWithDetails[]> {
    return prisma.permissionRequest.findMany({
      where: { studentId },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        requester: { select: { id: true, firstName: true, lastName: true, email: true } },
        decidedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStatus(status: string): Promise<PermissionRequestWithDetails[]> {
    return prisma.permissionRequest.findMany({
      where: { status: status as any },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        requester: { select: { id: true, firstName: true, lastName: true, email: true } },
        decidedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(data: {
    studentId: number;
    reason: string;
    startDate: Date;
    expectedReturnDate: Date;
    requesterId: number;
    status: string;
  }): Promise<PermissionRequest> {
    return prisma.permissionRequest.create({
      data: {
        studentId: data.studentId,
        reason: data.reason,
        startDate: data.startDate,
        expectedReturnDate: data.expectedReturnDate,
        requesterId: data.requesterId,
        status: data.status as any,
      },
    });
  }

  async updateStatus(
    id: number,
    status: string,
    decidedById: number,
    decisionReason?: string
  ): Promise<PermissionRequest> {
    return prisma.permissionRequest.update({
      where: { id },
      data: {
        status: status as any,
        decidedById,
        decidedAt: new Date(),
        decisionReason,
      },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
      },
    });
  }

  async cancel(id: number): Promise<PermissionRequest> {
    return prisma.permissionRequest.update({
      where: { id },
      data: {
        status: 'CANCELLED' as any,
        cancelledAt: new Date(),
      },
    });
  }

  async list(filters?: { status?: string; studentId?: number }): Promise<PermissionRequestWithDetails[]> {
    return prisma.permissionRequest.findMany({
      where: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.studentId && { studentId: filters.studentId }),
      },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        requester: { select: { id: true, firstName: true, lastName: true, email: true } },
        decidedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const permissionRequestRepository = new PermissionRequestRepository();
