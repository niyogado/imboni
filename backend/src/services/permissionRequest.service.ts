import { permissionRequestRepository, type PermissionRequestWithDetails } from '../repositories/permissionRequest.repository';
import { studentRepository } from '../repositories/student.repository';
import { parentStudentLinkService } from './parentStudentLink.service';
import { auditLogRepository } from '../repositories/auditLog.repository';

export class PermissionRequestService {
  async create(data: {
    studentId: number;
    reason: string;
    startDate: Date;
    expectedReturnDate: Date;
    requesterId: number;
  }, actorId: number): Promise<PermissionRequestWithDetails> {
    // Validate: end date must not precede start date
    if (data.expectedReturnDate < data.startDate) {
      const err: any = new Error('Expected return date must not precede start date');
      err.statusCode = 422;
      err.code = 'INVALID_DATE_RANGE';
      throw err;
    }

    const student = await studentRepository.findById(data.studentId);
    if (!student) {
      const err: any = new Error('Student not found');
      err.statusCode = 404;
      err.code = 'STUDENT_NOT_FOUND';
      throw err;
    }

    const request = await permissionRequestRepository.create({
      studentId: data.studentId,
      reason: data.reason,
      startDate: data.startDate,
      expectedReturnDate: data.expectedReturnDate,
      requesterId: data.requesterId,
      status: 'PENDING',
    });

    await auditLogRepository.create({
      userId: actorId,
      action: 'CREATE_PERMISSION_REQUEST',
      entityType: 'PermissionRequest',
      entityId: request.id,
      newValues: { studentId: data.studentId, reason: data.reason, status: 'PENDING' },
    });

    return permissionRequestRepository.findById(request.id) as Promise<PermissionRequestWithDetails>;
  }

  async getById(id: number): Promise<PermissionRequestWithDetails | null> {
    return permissionRequestRepository.findById(id);
  }

  async listForParent(studentId: number, parentId: number): Promise<PermissionRequestWithDetails[]> {
    // Parent can only see permission status for linked children
    await parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);

    return permissionRequestRepository.findByStudent(studentId);
  }

  async listPending(): Promise<PermissionRequestWithDetails[]> {
    return permissionRequestRepository.findByStatus('PENDING');
  }

  async list(filters?: { status?: string; studentId?: number }): Promise<PermissionRequestWithDetails[]> {
    return permissionRequestRepository.list(filters);
  }

  async approve(id: number, actorId: number, decisionReason?: string): Promise<PermissionRequestWithDetails> {
    const existing = await permissionRequestRepository.findById(id);
    if (!existing) {
      const err: any = new Error('Permission request not found');
      err.statusCode = 404;
      err.code = 'PERMISSION_REQUEST_NOT_FOUND';
      throw err;
    }

    if (existing.status !== 'PENDING') {
      const err: any = new Error('Only pending requests can be approved');
      err.statusCode = 400;
      err.code = 'INVALID_STATUS_TRANSITION';
      throw err;
    }

    const updated = await permissionRequestRepository.updateStatus(id, 'APPROVED', actorId, decisionReason);

    await auditLogRepository.create({
      userId: actorId,
      action: 'APPROVE_PERMISSION_REQUEST',
      entityType: 'PermissionRequest',
      entityId: id,
      oldValues: { status: existing.status },
      newValues: { status: 'APPROVED', decisionReason },
    });

    return permissionRequestRepository.findById(id) as Promise<PermissionRequestWithDetails>;
  }

  async reject(id: number, actorId: number, decisionReason?: string): Promise<PermissionRequestWithDetails> {
    const existing = await permissionRequestRepository.findById(id);
    if (!existing) {
      const err: any = new Error('Permission request not found');
      err.statusCode = 404;
      err.code = 'PERMISSION_REQUEST_NOT_FOUND';
      throw err;
    }

    if (existing.status !== 'PENDING') {
      const err: any = new Error('Only pending requests can be rejected');
      err.statusCode = 400;
      err.code = 'INVALID_STATUS_TRANSITION';
      throw err;
    }

    const updated = await permissionRequestRepository.updateStatus(id, 'REJECTED', actorId, decisionReason);

    await auditLogRepository.create({
      userId: actorId,
      action: 'REJECT_PERMISSION_REQUEST',
      entityType: 'PermissionRequest',
      entityId: id,
      oldValues: { status: existing.status },
      newValues: { status: 'REJECTED', decisionReason },
    });

    return permissionRequestRepository.findById(id) as Promise<PermissionRequestWithDetails>;
  }

  async cancel(id: number, actorId: number): Promise<PermissionRequestWithDetails> {
    const existing = await permissionRequestRepository.findById(id);
    if (!existing) {
      const err: any = new Error('Permission request not found');
      err.statusCode = 404;
      err.code = 'PERMISSION_REQUEST_NOT_FOUND';
      throw err;
    }

    if (existing.status !== 'PENDING') {
      const err: any = new Error('Only pending requests can be cancelled');
      err.statusCode = 400;
      err.code = 'INVALID_STATUS_TRANSITION';
      throw err;
    }

    const updated = await permissionRequestRepository.cancel(id);

    await auditLogRepository.create({
      userId: actorId,
      action: 'CANCEL_PERMISSION_REQUEST',
      entityType: 'PermissionRequest',
      entityId: id,
      oldValues: { status: existing.status },
      newValues: { status: 'CANCELLED' },
    });

    return permissionRequestRepository.findById(id) as Promise<PermissionRequestWithDetails>;
  }
}

export const permissionRequestService = new PermissionRequestService();