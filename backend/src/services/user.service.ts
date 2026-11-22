import { userRepository, type UserWithRole } from '../repositories/user.repository';
import { roleRepository } from '../repositories/role.repository';
import { auditLogRepository } from '../repositories/auditLog.repository';

export class UserService {
  async list(): Promise<UserWithRole[]> {
    return userRepository.list();
  }

  async getById(id: number): Promise<UserWithRole | null> {
    return userRepository.findById(id);
  }

  async update(id: number, data: { email?: string; phone?: string; firstName?: string; lastName?: string; isActive?: boolean }, actorId: number): Promise<UserWithRole> {
    const existing = await userRepository.findById(id);
    if (!existing) {
      const err: any = new Error('User not found');
      err.statusCode = 404;
      err.code = 'USER_NOT_FOUND';
      throw err;
    }

    const oldValues = { ...existing };
    const updated = await userRepository.update(id, data);

    await auditLogRepository.create({
      userId: actorId,
      action: 'UPDATE_USER',
      entityType: 'User',
      entityId: id,
      oldValues,
      newValues: { ...updated },
    });

    return updated;
  }

  async deactivate(id: number, actorId: number): Promise<UserWithRole> {
    const existing = await userRepository.findById(id);
    if (!existing) {
      const err: any = new Error('User not found');
      err.statusCode = 404;
      err.code = 'USER_NOT_FOUND';
      throw err;
    }

    const deactivated = await userRepository.deactivate(id);

    await auditLogRepository.create({
      userId: actorId,
      action: 'DEACTIVATE_USER',
      entityType: 'User',
      entityId: id,
      oldValues: { isActive: true },
      newValues: { isActive: false },
    });

    return deactivated;
  }
}

export const userService = new UserService();