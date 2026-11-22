import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export interface IncidentWithDetails extends Incident {
  student: { id: number; studentNumber: string; firstName: string; lastName: string };
  responsibleStaff: { id: number; firstName: string; lastName: string; email: string };
  reviewedBy?: { id: number; firstName: string; lastName: string } | null;
}

export class IncidentRepository {
  async findById(id: number): Promise<IncidentWithDetails | null> {
    return prisma.incident.findUnique({
      where: { id },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        responsibleStaff: { select: { id: true, firstName: true, lastName: true, email: true } },
        reviewedBy: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async findByStudent(studentId: number, filters?: { status?: string }): Promise<IncidentWithDetails[]> {
    return prisma.incident.findMany({
      where: {
        studentId,
        ...(filters?.status && { status: filters.status }),
      },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        responsibleStaff: { select: { id: true, firstName: true, lastName: true, email: true } },
        reviewedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { date: 'desc' },
    });
  }

  async create(data: {
    studentId: number;
    title: string;
    description: string;
    category: string;
    date: Date;
    responsibleStaffId: number;
    status: string;
  }): Promise<Incident> {
    return prisma.incident.create({
      data: {
        studentId: data.studentId,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        responsibleStaffId: data.responsibleStaffId,
        status: data.status as any,
      },
    });
  }

  async update(id: number, data: Partial<{ title: string; description: string; category: string; date: Date; status: string; decisionReason: string }>): Promise<Incident> {
    return prisma.incident.update({
      where: { id },
      data,
    });
  }

  async approve(incidentId: number, reviewedById: number, decisionReason?: string): Promise<Incident> {
    return prisma.incident.update({
      where: { id: incidentId },
      data: {
        status: 'APPROVED' as any,
        reviewedById,
        reviewedAt: new Date(),
        decisionReason,
      },
    });
  }

  async reject(incidentId: number, reviewedById: number, decisionReason?: string): Promise<Incident> {
    return prisma.incident.update({
      where: { id: incidentId },
      data: {
        status: 'REJECTED' as any,
        reviewedById,
        reviewedAt: new Date(),
        decisionReason,
      },
    });
  }

  async createVersion(data: {
    incidentId: number;
    title: string;
    description: string;
    category: string;
    date: Date;
    status: string;
    reviewedById?: number;
    reviewedAt?: Date;
    decisionReason?: string;
    changeReason?: string;
  }): Promise<IncidentVersion> {
    return prisma.incidentVersion.create({
      data: {
        incidentId: data.incidentId,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        status: data.status as any,
        reviewedById: data.reviewedById,
        reviewedAt: data.reviewedAt,
        decisionReason: data.decisionReason,
        changeReason: data.changeReason,
      },
    });
  }

  async incrementVersion(incidentId: number): Promise<void> {
    await prisma.incident.update({
      where: { id: incidentId },
      data: { version: { increment: 1 } },
    });
  }

  async list(filters?: { status?: string; studentId?: number; category?: string }): Promise<IncidentWithDetails[]> {
    return prisma.incident.findMany({
      where: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.studentId && { studentId: filters.studentId }),
        ...(filters?.category && { category: filters.category }),
      },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        responsibleStaff: { select: { id: true, firstName: true, lastName: true, email: true } },
        reviewedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const incidentRepository = new IncidentRepository();
