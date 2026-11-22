import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export class RoleRepository {
  async findByName(name: string): Promise<Role | null> {
    return prisma.role.findUnique({
      where: { name: name as any },
    });
  }

  async findById(id: number): Promise<Role | null> {
    return prisma.role.findUnique({
      where: { id },
    });
  }

  async list(): Promise<Role[]> {
    return prisma.role.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(data: { name: string; description?: string }): Promise<Role> {
    return prisma.role.create({
      data: {
        name: data.name as any,
        description: data.description,
      },
    });
  }
}

export const roleRepository = new RoleRepository();
