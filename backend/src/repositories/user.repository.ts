import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export interface UserWithRole extends User {
  role: Role;
}

export class UserRepository {
  async findByEmail(email: string): Promise<UserWithRole | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  async findById(id: number): Promise<UserWithRole | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  async create(data: {
    email: string;
    phone?: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    roleId: number;
  }): Promise<UserWithRole> {
    return prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.roleId,
      },
      include: { role: true },
    });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  async update(id: number, data: Partial<{ email: string; phone: string; firstName: string; lastName: string; isActive: boolean }>): Promise<UserWithRole> {
    return prisma.user.update({
      where: { id },
      data,
      include: { role: true },
    });
  }

  async deactivate(id: number): Promise<UserWithRole> {
    return prisma.user.update({
      where: { id },
      data: { isActive: false },
      include: { role: true },
    });
  }

  async list(): Promise<UserWithRole[]> {
    return prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const userRepository = new UserRepository();
