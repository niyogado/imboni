import { parentRepository, type ParentWithDetails } from '../repositories/parent.repository';
import { auditLogRepository } from '../repositories/auditLog.repository';

export class ParentService {
  async create(data: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
  }, actorId: number): Promise<ParentWithDetails> {
    const existing = await parentRepository.findByPhone(data.phone);
    if (existing) {
      const err: any = new Error('Phone already registered');
      err.statusCode = 409;
      err.code = 'PARENT_PHONE_EXISTS';
      throw err;
    }

    const parent = await parentRepository.create(data);

    await auditLogRepository.create({
      userId: actorId,
      action: 'CREATE_PARENT',
      entityType: 'Parent',
      entityId: parent.id,
      newValues: { phone: parent.phone, firstName: parent.firstName, lastName: parent.lastName },
    });

    return parent as ParentWithDetails;
  }

  async getById(id: number): Promise<ParentWithDetails | null> {
    return parentRepository.findById(id);
  }

  async list(): Promise<ParentWithDetails[]> {
    return parentRepository.list() as Promise<ParentWithDetails[]>;
  }

  async update(id: number, data: { firstName?: string; lastName?: string; phone?: string; email?: string }, actorId: number): Promise<ParentWithDetails> {
    const existing = await parentRepository.findById(id);
    if (!existing) {
      const err: any = new Error('Parent not found');
      err.statusCode = 404;
      err.code = 'PARENT_NOT_FOUND';
      throw err;
    }

    const oldValues = { ...existing };
    const updated = await parentRepository.update(id, data);

    await auditLogRepository.create({
      userId: actorId,
      action: 'UPDATE_PARENT',
      entityType: 'Parent',
      entityId: id,
      oldValues,
      newValues: { ...updated },
    });

    return updated as ParentWithDetails;
  }
}

export const parentService = new ParentService();