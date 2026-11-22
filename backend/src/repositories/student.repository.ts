import { prisma } from '../config/database';
import type { Student, User, Class } from '@prisma/client';

export interface StudentWithDetails extends Student {
  class?: { id: number; name: string; level?: string } | null;
  user?: User | null;
}

export class StudentRepository {
  async findById(id: number): Promise<StudentWithDetails | null> {
    return prisma.student.findUnique({
      where: { id },
      include: {
        class: { select: { id: true, name: true, level: true } },
        user: true,
      },
    });
  }

  async findByStudentNumber(studentNumber: string): Promise<Student | null> {
    return prisma.student.findUnique({
      where: { studentNumber },
    });
  }

  async create(data: {
    studentNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    gender?: string;
    classId?: number;
  }): Promise<Student> {
    return prisma.student.create({
      data: {
        studentNumber: data.studentNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        classId: data.classId,
      },
    });
  }

  async update(id: number, data: Partial<{ firstName: string; lastName: string; dateOfBirth: Date; gender: string; classId: number; isActive: boolean }>): Promise<Student> {
    return prisma.student.update({
      where: { id },
      data,
    });
  }

  async list(filters?: { classId?: number; isActive?: boolean }): Promise<StudentWithDetails[]> {
    return prisma.student.findMany({
      where: {
        ...(filters?.classId && { classId: filters.classId }),
        ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
      },
      include: {
        class: { select: { id: true, name: true } },
      },
      orderBy: { studentNumber: 'asc' },
    });
  }
}

export const studentRepository = new StudentRepository();