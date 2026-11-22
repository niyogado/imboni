import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export interface MarkWithDetails extends Mark {
  student: { id: number; studentNumber: string; firstName: string; lastName: string };
  subject: { id: number; name: string; code: string };
  recordedBy: { id: number; firstName: string; lastName: string; email: string };
  reviewedBy?: { id: number; firstName: string; lastName: string } | null;
}

export class MarkRepository {
  async findById(id: number): Promise<MarkWithDetails | null> {
    return prisma.mark.findUnique({
      where: { id },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        subject: { select: { id: true, name: true, code: true } },
        recordedBy: { select: { id: true, firstName: true, lastName: true, email: true } },
        reviewedBy: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async findByStudent(studentId: number, filters?: { status?: string; term?: string; academicYear?: string; subjectId?: number }): Promise<MarkWithDetails[]> {
    return prisma.mark.findMany({
      where: {
        studentId,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.term && { term: filters.term }),
        ...(filters?.academicYear && { academicYear: filters.academicYear }),
        ...(filters?.subjectId && { subjectId: filters.subjectId }),
      },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        subject: { select: { id: true, name: true, code: true } },
        recordedBy: { select: { id: true, firstName: true, lastName: true, email: true } },
        reviewedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: {
    studentId: number;
    subjectId: number;
    value: number;
    maxValue?: number;
    term: string;
    academicYear: string;
    status: string;
    recordedById: number;
    comment?: string;
  }): Promise<Mark> {
    return prisma.mark.create({
      data: {
        studentId: data.studentId,
        subjectId: data.subjectId,
        value: data.value,
        maxValue: data.maxValue ?? 100,
        term: data.term,
        academicYear: data.academicYear,
        status: data.status as any,
        recordedById: data.recordedById,
        comment: data.comment,
      },
    });
  }

  async update(id: number, data: Partial<{ value: number; maxValue: number; term: string; academicYear: string; status: string; comment: string }>): Promise<Mark> {
    return prisma.mark.update({
      where: { id },
      data,
    });
  }

  async publish(markId: number, publishedAt: Date): Promise<Mark> {
    return prisma.mark.update({
      where: { id: markId },
      data: {
        status: 'PUBLISHED' as any,
        publishedAt,
      },
    });
  }

  async createVersion(data: {
    markId: number;
    value: number;
    maxValue: number;
    term: string;
    academicYear: string;
    status: string;
    recordedById: number;
    changeReason?: string;
  }): Promise<MarkVersion> {
    return prisma.markVersion.create({
      data: {
        markId: data.markId,
        value: data.value,
        maxValue: data.maxValue,
        term: data.term,
        academicYear: data.academicYear,
        status: data.status as any,
        recordedById: data.recordedById,
        changeReason: data.changeReason,
      },
    });
  }

  async incrementVersion(markId: number): Promise<void> {
    await prisma.mark.update({
      where: { id: markId },
      data: { version: { increment: 1 } },
    });
  }

  async list(filters?: { status?: string; studentId?: number; subjectId?: number; term?: string; academicYear?: string }): Promise<MarkWithDetails[]> {
    return prisma.mark.findMany({
      where: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.studentId && { studentId: filters.studentId }),
        ...(filters?.subjectId && { subjectId: filters.subjectId }),
        ...(filters?.term && { term: filters.term }),
        ...(filters?.academicYear && { academicYear: filters.academicYear }),
      },
      include: {
        student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
        subject: { select: { id: true, name: true, code: true } },
        recordedBy: { select: { id: true, firstName: true, lastName: true, email: true } },
        reviewedBy: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const markRepository = new MarkRepository();
