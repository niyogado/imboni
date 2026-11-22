"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markService = exports.MarkService = void 0;
const mark_repository_1 = require("../repositories/mark.repository");
const student_repository_1 = require("../repositories/student.repository");
const parentStudentLink_service_1 = require("./parentStudentLink.service");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class MarkService {
    async create(data, actorId) {
        const student = await student_repository_1.studentRepository.findById(data.studentId);
        if (!student) {
            const err = new Error('Student not found');
            err.statusCode = 404;
            err.code = 'STUDENT_NOT_FOUND';
            throw err;
        }
        // Save previous version if mark exists and status is changing to published (correction keeps history)
        const existing = await mark_repository_1.markRepository.findById(0); // placeholder - we check by student+subject+term+year
        // For new marks, just create
        const mark = await mark_repository_1.markRepository.create({
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
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'CREATE_MARK',
            entityType: 'Mark',
            entityId: mark.id,
            newValues: { studentId: data.studentId, subjectId: data.subjectId, value: data.value, status: data.status },
        });
        return mark_repository_1.markRepository.findById(mark.id);
    }
    async getById(id) {
        return mark_repository_1.markRepository.findById(id);
    }
    async listForParent(studentId, parentId, filters) {
        // Parent can only see published marks of linked children
        await parentStudentLink_service_1.parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);
        const marks = await mark_repository_1.markRepository.findByStudent(studentId, {
            ...filters,
            status: 'PUBLISHED', // parents only see published
        });
        return marks;
    }
    async listForTeacher(filters) {
        return mark_repository_1.markRepository.list(filters);
    }
    async update(markId, data, actorId) {
        const existing = await mark_repository_1.markRepository.findById(markId);
        if (!existing) {
            const err = new Error('Mark not found');
            err.statusCode = 404;
            err.code = 'MARK_NOT_FOUND';
            throw err;
        }
        // If mark is published, keep history before correcting
        if (existing.status === 'PUBLISHED') {
            await mark_repository_1.markRepository.createVersion({
                markId: existing.id,
                value: existing.value,
                maxValue: existing.maxValue,
                term: existing.term,
                academicYear: existing.academicYear,
                status: existing.status,
                recordedById: existing.recordedById,
                changeReason: 'Correction of published mark',
            });
            await mark_repository_1.markRepository.incrementVersion(existing.id);
        }
        const updated = await mark_repository_1.markRepository.update(markId, data);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'UPDATE_MARK',
            entityType: 'Mark',
            entityId: markId,
            oldValues: { value: existing.value, status: existing.status },
            newValues: { value: data.value, status: existing.status },
        });
        return mark_repository_1.markRepository.findById(markId);
    }
    async submit(markId, actorId) {
        const existing = await mark_repository_1.markRepository.findById(markId);
        if (!existing) {
            const err = new Error('Mark not found');
            err.statusCode = 404;
            err.code = 'MARK_NOT_FOUND';
            throw err;
        }
        if (existing.status !== 'DRAFT') {
            const err = new Error('Only draft marks can be submitted');
            err.statusCode = 400;
            err.code = 'INVALID_STATUS_TRANSITION';
            throw err;
        }
        await mark_repository_1.markRepository.update(markId, { status: 'SUBMITTED' });
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'SUBMIT_MARK',
            entityType: 'Mark',
            entityId: markId,
            oldValues: { status: existing.status },
            newValues: { status: 'SUBMITTED' },
        });
        return mark_repository_1.markRepository.findById(markId);
    }
    async publish(markId, actorId) {
        const existing = await mark_repository_1.markRepository.findById(markId);
        if (!existing) {
            const err = new Error('Mark not found');
            err.statusCode = 404;
            err.code = 'MARK_NOT_FOUND';
            throw err;
        }
        if (existing.status !== 'SUBMITTED') {
            const err = new Error('Only submitted marks can be published');
            err.statusCode = 400;
            err.code = 'INVALID_STATUS_TRANSITION';
            throw err;
        }
        const updated = await mark_repository_1.markRepository.publish(markId, new Date());
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'PUBLISH_MARK',
            entityType: 'Mark',
            entityId: markId,
            oldValues: { status: existing.status },
            newValues: { status: 'PUBLISHED', publishedAt: updated.publishedAt },
        });
        return mark_repository_1.markRepository.findById(markId);
    }
    async getVersions(markId) {
        return mark_repository_1.markRepository.findById(markId);
    }
}
exports.MarkService = MarkService;
exports.markService = new MarkService();
//# sourceMappingURL=mark.service.js.map