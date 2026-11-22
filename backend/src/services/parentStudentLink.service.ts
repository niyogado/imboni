import { parentStudentLinkRepository, type ParentStudentLinkWithDetails } from '../repositories/parentStudentLink.repository';
import { parentRepository } from '../repositories/parent.repository';
import { studentRepository } from '../repositories/student.repository';
import { auditLogRepository } from '../repositories/auditLog.repository';

/**
 * Parent–Child Link Service
 * Business rules: a parent may only access students linked to them via an active link.
 * Verification happens on every access, not just at login.
 */
export class ParentStudentLinkService {
  async link(data: {
    parentId: number;
    studentId: number;
    relationship?: string;
    linkedById: number;
  }): Promise<ParentStudentLinkWithDetails> {
    const parent = await parentRepository.findById(data.parentId);
    if (!parent) {
      const err: any = new Error('Parent not found');
      err.statusCode = 404;
      err.code = 'PARENT_NOT_FOUND';
      throw err;
    }

    const student = await studentRepository.findById(data.studentId);
    if (!student) {
      const err: any = new Error('Student not found');
      err.statusCode = 404;
      err.code = 'STUDENT_NOT_FOUND';
      throw err;
    }

    const existing = await parentStudentLinkRepository.findActiveLink(data.parentId, data.studentId);
    if (existing) {
      const err: any = new Error('Active link already exists');
      err.statusCode = 409;
      err.code = 'LINK_EXISTS';
      throw err;
    }

    const link = await parentStudentLinkRepository.create({
      parentId: data.parentId,
      studentId: data.studentId,
      relationship: data.relationship,
      linkedById: data.linkedById,
    });

    await auditLogRepository.create({
      userId: data.linkedById,
      action: 'CREATE_PARENT_STUDENT_LINK',
      entityType: 'ParentStudentLink',
      entityId: link.id,
      newValues: { parentId: data.parentId, studentId: data.studentId, relationship: data.relationship },
    });

    return parentStudentLinkRepository.findById(link.id) as Promise<ParentStudentLinkWithDetails>;
  }

  async unlink(linkId: number, actorId: number): Promise<void> {
    const link = await parentStudentLinkRepository.findById(linkId);
    if (!link) {
      const err: any = new Error('Link not found');
      err.statusCode = 404;
      err.code = 'LINK_NOT_FOUND';
      throw err;
    }

    const oldValues = { ...link, isActive: true };
    await parentStudentLinkRepository.deactivate(linkId);

    await auditLogRepository.create({
      userId: actorId,
      action: 'REMOVE_PARENT_STUDENT_LINK',
      entityType: 'ParentStudentLink',
      entityId: linkId,
      oldValues,
      newValues: { isActive: false },
    });
  }

  /**
   * Verify that a parent is linked to a student via an active link.
   * Returns the link if authorized, throws 403 otherwise.
   * This is the server-side parent–child check enforced on every endpoint.
   */
  async verifyParentCanAccessStudent(parentId: number, studentId: number): Promise<ParentStudentLinkWithDetails> {
    const link = await parentStudentLinkRepository.findActiveLink(parentId, studentId);
    if (!link) {
      await auditLogRepository.create({
        action: 'IDOR_ATTEMPT',
        entityType: 'ParentStudentLink',
        newValues: { parentId, studentId, reason: 'parent_not_linked_to_student' },
      });
      const err: any = new Error('Forbidden: you can only access your own linked children');
      err.statusCode = 403;
      err.code = 'PARENT_NOT_LINKED';
      throw err;
    }
    return link;
  }

  async getLinkedStudents(parentId: number): Promise<ParentStudentLinkWithDetails[]> {
    return parentStudentLinkRepository.findLinksByParent(parentId);
  }

  async getLinkedParents(studentId: number): Promise<ParentStudentLinkWithDetails[]> {
    return parentStudentLinkRepository.findLinksByStudent(studentId);
  }

  async countActiveGuardians(studentId: number): Promise<number> {
    return parentStudentLinkRepository.countActiveLinksForStudent(studentId);
  }
}

export const parentStudentLinkService = new ParentStudentLinkService();