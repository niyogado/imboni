import { prisma } from '../config/database';
import type { Parent, User } from '@prisma/client';

export interface ParentWithDetails extends Parent {
  user?: User | null;
}

export class ParentRepository {
  async findById(id: number): Promise<ParentWithDetails | null> {
    return prisma.parent.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findByPhone(phone: string): Promise<Parent | null> {
    return prisma.parent.findUnique({
      where: { phone },
      include: { user: true },
    });
  }

  async findByEmail(email: string): Promise<Parent | null> {
    return prisma.parent.findUnique({
      where: { email },
      include: { user: true },
    });
  }

  async create(data: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
  }): Promise<Parent> {
    return prisma.parent.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
      },
    });
  }

  async update(id: number, data: Partial<{ firstName: string; lastName: string; phone: string; email: string }>): Promise<Parent> {
    return prisma.parent.update({
      where: { id },
      data,
    });
  }

  async list(): Promise<ParentWithDetails[]> {
    return prisma.parent.findMany({
      include: { user: true },
      orderBy: { firstName: 'asc' },
    });
  }
}

export const parentRepository = new ParentRepository();