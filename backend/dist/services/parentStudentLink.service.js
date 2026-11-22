"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentStudentLinkService = exports.ParentStudentLinkService = void 0;
const parentStudentLink_repository_1 = require("../repositories/parentStudentLink.repository");
const parent_repository_1 = require("../repositories/parent.repository");
const student_repository_1 = require("../repositories/student.repository");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
/**
 * Parent–Child Link Service
 * Business rules: a parent may only access students linked to them via an active link.
 * Verification happens on every access, not just at login.
 */
class ParentStudentLinkService {
    async link(data) {
        const parent = await parent_repository_1.parentRepository.findById(data.parentId);
        if (!parent) {
            const err = new Error('Parent not found');
            err.statusCode = 404;
            err.code = 'PARENT_NOT_FOUND';
            throw err;
        }
        const student = await student_repository_1.studentRepository.findById(data.studentId);
        if (!student) {
            const err = new Error('Student not found');
            err.statusCode = 404;
            err.code = 'STUDENT_NOT_FOUND';
            throw err;
        }
        const existing = await parentStudentLink_repository_1.parentStudentLinkRepository.findActiveLink(data.parentId, data.studentId);
        if (existing) {
            const err = new Error('Active link already exists');
            err.statusCode = 409;
            err.code = 'LINK_EXISTS';
            throw err;
        }
        const link = await parentStudentLink_repository_1.parentStudentLinkRepository.create({
            parentId: data.parentId,
            studentId: data.studentId,
            relationship: data.relationship,
            linkedById: data.linkedById,
        });
        await auditLog_repository_1.auditLogRepository.create({
            userId: data.linkedById,
            action: 'CREATE_PARENT_STUDENT_LINK',
            entityType: 'ParentStudentLink',
            entityId: link.id,
            newValues: { parentId: data.parentId, studentId: data.studentId, relationship: data.relationship },
        });
        return parentStudentLink_repository_1.parentStudentLinkRepository.findById(link.id);
    }
    async unlink(linkId, actorId) {
        const link = await parentStudentLink_repository_1.parentStudentLinkRepository.findById(linkId);
        if (!link) {
            const err = new Error('Link not found');
            err.statusCode = 404;
            err.code = 'LINK_NOT_FOUND';
            throw err;
        }
        const oldValues = { ...link, isActive: true };
        await parentStudentLink_repository_1.parentStudentLinkRepository.deactivate(linkId);
        await auditLog_repository_1.auditLogRepository.create({
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
    async verifyParentCanAccessStudent(parentId, studentId) {
        const link = await parentStudentLink_repository_1.parentStudentLinkRepository.findActiveLink(parentId, studentId);
        if (!link) {
            await auditLog_repository_1.auditLogRepository.create({
                action: 'IDOR_ATTEMPT',
                entityType: 'ParentStudentLink',
                newValues: { parentId, studentId, reason: 'parent_not_linked_to_student' },
            });
            const err = new Error('Forbidden: you can only access your own linked children');
            err.statusCode = 403;
            err.code = 'PARENT_NOT_LINKED';
            throw err;
        }
        return link;
    }
    async getLinkedStudents(parentId) {
        return parentStudentLink_repository_1.parentStudentLinkRepository.findLinksByParent(parentId);
    }
    async getLinkedParents(studentId) {
        return parentStudentLink_repository_1.parentStudentLinkRepository.findLinksByStudent(studentId);
    }
    async countActiveGuardians(studentId) {
        return parentStudentLink_repository_1.parentStudentLinkRepository.countActiveLinksForStudent(studentId);
    }
}
exports.ParentStudentLinkService = ParentStudentLinkService;
exports.parentStudentLinkService = new ParentStudentLinkService();
//# sourceMappingURL=parentStudentLink.service.js.map