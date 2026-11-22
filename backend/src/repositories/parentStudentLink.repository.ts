import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export interface ParentStudentLinkWithDetails extends ParentStudentLink {
  parent: Parent;
  student: Student;
  isActive: boolean;
}

export class ParentStudentLinkRepository {
  async findById(id: number): Promise<ParentStudentLinkWithDetails | null> {
    return prisma.parentStudentLink.findUnique({
      where: { id },
      include: { parent: true, student: true },
    });
  }

  async findActiveLink(parentId: number, studentId: number): Promise<ParentStudentLinkWithDetails | null> {
    return prisma.parentStudentLink.findFirst({
      where: {
        parentId,
        studentId,
        isActive: true,
      },
      include: { parent: true, student: true },
    });
  }

  async findLinksByParent(parentId: number): Promise<ParentStudentLinkWithDetails[]> {
    return prisma.parentStudentLink.findMany({
      where: { parentId, isActive: true },
      include: { parent: true, student: true },
      orderBy: { linkedAt: 'desc' },
    });
  }

  async findLinksByStudent(studentId: number): Promise<ParentStudentLinkWithDetails[]> {
    return prisma.parentStudentLink.findMany({
      where: { studentId, isActive: true },
      include: { parent: true, student: true },
      orderBy: { linkedAt: 'desc' },
    });
  }

  async create(data: {
    parentId: number;
    studentId: number;
    relationship?: string;
    linkedById?: number;
  }): Promise<ParentStudentLink> {
    return prisma.parentStudentLink.create({
      data: {
        parentId: data.parentId,
        studentId: data.studentId,
        relationship: data.relationship,
        linkedById: data.linkedById,
      },
    });
  }

  async deactivate(id: number): Promise<ParentStudentLink> {
    return prisma.parentStudentLink.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async countActiveLinksForStudent(studentId: number): Promise<number> {
    return prisma.parentStudentLink.count({
      where: { studentId, isActive: true },
    });
  }
}

export const parentStudentLinkRepository = new ParentStudentLinkRepository();
