import { markRepository, type MarkWithDetails } from '../repositories/mark.repository';
import { studentRepository } from '../repositories/student.repository';
import { parentStudentLinkService } from './parentStudentLink.service';
import { auditLogRepository } from '../repositories/auditLog.repository';

export class MarkService {
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
  }, actorId: number): Promise<MarkWithDetails> {
    const student = await studentRepository.findById(data.studentId);
    if (!student) {
      const err: any = new Error('Student not found');
      err.statusCode = 404;
      err.code = 'STUDENT_NOT_FOUND';
      throw err;
    }

    // Save previous version if mark exists and status is changing to published (correction keeps history)
    const existing = await markRepository.findById(0); // placeholder - we check by student+subject+term+year
    // For new marks, just create

    const mark = await markRepository.create({
      studentId: data.studentId,
      subjectId: data.subjectId,
      value: data.value,
      maxValue: data.maxValue,
      term: data.term,
      academicYear: data.academicYear,
      status: data.status,
      recordedById: data.recordedById,
      comment: data.comment,
    });

    await auditLogRepository.create({
      userId: actorId,
      action: 'CREATE_MARK',
      entityType: 'Mark',
      entityId: mark.id,
      newValues: { studentId: data.studentId, subjectId: data.subjectId, value: data.value, status: data.status },
    });

    return markRepository.findById(mark.id) as Promise<MarkWithDetails>;
  }

  async getById(id: number): Promise<MarkWithDetails | null> {
    return markRepository.findById(id);
  }

  async listForParent(studentId: number, parentId: number, filters?: { status?: string; term?: string; academicYear?: string; subjectId?: number }): Promise<MarkWithDetails[]> {
    // Parent can only see published marks of linked children
    await parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);

    const marks = await markRepository.findByStudent(studentId, {
      ...filters,
      status: 'PUBLISHED', // parents only see published
    });

    return marks;
  }

  async listForTeacher(filters?: { status?: string; studentId?: number; subjectId?: number; term?: string; academicYear?: string }): Promise<MarkWithDetails[]> {
    return markRepository.list(filters);
  }

  async update(markId: number, data: { value?: number; maxValue?: number; comment?: string }, actorId: number): Promise<MarkWithDetails> {
    const existing = await markRepository.findById(markId);
    if (!existing) {
      const err: any = new Error('Mark not found');
      err.statusCode = 404;
      err.code = 'MARK_NOT_FOUND';
      throw err;
    }

    // If mark is published, keep history before correcting
    if (existing.status === 'PUBLISHED') {
      await markRepository.createVersion({
        markId: existing.id,
        value: existing.value,
        maxValue: existing.maxValue,
        term: existing.term,
        academicYear: existing.academicYear,
        status: existing.status,
        recordedById: existing.recordedById,
        changeReason: 'Correction of published mark',
      });
      await markRepository.incrementVersion(existing.id);
    }

    const updated = await markRepository.update(markId, data);

    await auditLogRepository.create({
      userId: actorId,
      action: 'UPDATE_MARK',
      entityType: 'Mark',
      entityId: markId,
      oldValues: { value: existing.value, status: existing.status },
      newValues: { value: data.value, status: existing.status },
    });

    return markRepository.findById(markId) as Promise<MarkWithDetails>;
  }

  async submit(markId: number, actorId: number): Promise<MarkWithDetails> {
    const existing = await markRepository.findById(markId);
    if (!existing) {
      const err: any = new Error('Mark not found');
      err.statusCode = 404;
      err.code = 'MARK_NOT_FOUND';
      throw err;
    }

    if (existing.status !== 'DRAFT') {
      const err: any = new Error('Only draft marks can be submitted');
      err.statusCode = 400;
      err.code = 'INVALID_STATUS_TRANSITION';
      throw err;
    }

    await markRepository.update(markId, { status: 'SUBMITTED' });

    await auditLogRepository.create({
      userId: actorId,
      action: 'SUBMIT_MARK',
      entityType: 'Mark',
      entityId: markId,
      oldValues: { status: existing.status },
      newValues: { status: 'SUBMITTED' },
    });

    return markRepository.findById(markId) as Promise<MarkWithDetails>;
  }

  async publish(markId: number, actorId: number): Promise<MarkWithDetails> {
    const existing = await markRepository.findById(markId);
    if (!existing) {
      const err: any = new Error('Mark not found');
      err.statusCode = 404;
      err.code = 'MARK_NOT_FOUND';
      throw err;
    }

    if (existing.status !== 'SUBMITTED') {
      const err: any = new Error('Only submitted marks can be published');
      err.statusCode = 400;
      err.code = 'INVALID_STATUS_TRANSITION';
      throw err;
    }

    const updated = await markRepository.publish(markId, new Date());

    await auditLogRepository.create({
      userId: actorId,
      action: 'PUBLISH_MARK',
      entityType: 'Mark',
      entityId: markId,
      oldValues: { status: existing.status },
      newValues: { status: 'PUBLISHED', publishedAt: updated.publishedAt },
    });

    return markRepository.findById(markId) as Promise<MarkWithDetails>;
  }

  async getVersions(markId: number): Promise<any[]> {
    return markRepository.findById(markId) as any;
  }
}

export const markService = new MarkService();