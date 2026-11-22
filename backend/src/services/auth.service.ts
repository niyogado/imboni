import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { prisma } from '../config/database';
import { userRepository, type UserWithRole } from '../repositories/user.repository';
import { roleRepository } from '../repositories/role.repository';
import { auditLogRepository } from '../repositories/auditLog.repository';
import { AuthUser } from '../types';

export class AuthService {
  async register(data: {
    email: string;
    phone?: string;
    password: string;
    firstName: string;
    lastName: string;
    roleName: string;
  }): Promise<{ user: UserWithRole; token: string }> {
    const saltRounds = config.bcryptSaltRounds;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const role = await roleRepository.findByName(data.roleName);
    if (!role) {
      const err: any = new Error('Role not found');
      err.statusCode = 400;
      err.code = 'INVALID_ROLE';
      throw err;
    }

    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      const err: any = new Error('Email already registered');
      err.statusCode = 409;
      err.code = 'EMAIL_EXISTS';
      throw err;
    }

    const user = await userRepository.create({
      email: data.email,
      phone: data.phone,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      roleId: role.id,
    });

    const token = this.generateToken(user);

    await auditLogRepository.create({
      userId: user.id,
      action: 'REGISTER',
      entityType: 'User',
      entityId: user.id,
      newValues: { email: user.email, role: role.name },
    });

    return { user, token };
  }

  async login(data: {
    email: string;
    password: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<{ user: UserWithRole; token: string }> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      await auditLogRepository.create({
        action: 'LOGIN_FAILED',
        entityType: 'User',
        newValues: { email: data.email, reason: 'user_not_found' },
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      });
      const err: any = new Error('Invalid credentials');
      err.statusCode = 401;
      err.code = 'INVALID_CREDENTIALS';
      throw err;
    }

    if (!user.isActive) {
      const err: any = new Error('Account deactivated');
      err.statusCode = 403;
      err.code = 'ACCOUNT_INACTIVE';
      throw err;
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      await auditLogRepository.create({
        userId: user.id,
        action: 'LOGIN_FAILED',
        entityType: 'User',
        entityId: user.id,
        newValues: { reason: 'invalid_password' },
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      });
      const err: any = new Error('Invalid credentials');
      err.statusCode = 401;
      err.code = 'INVALID_CREDENTIALS';
      throw err;
    }

    await userRepository.updateLastLogin(user.id);

    const token = this.generateToken(user);

    await auditLogRepository.create({
      userId: user.id,
      action: 'LOGIN',
      entityType: 'User',
      entityId: user.id,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    });

    return { user, token };
  }

  private generateToken(user: UserWithRole): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role.name,
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  }

  async getProfile(userId: number): Promise<UserWithRole | null> {
    return userRepository.findById(userId);
  }
}

export const authService = new AuthService();