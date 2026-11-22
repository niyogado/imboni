"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionRequestService = exports.PermissionRequestService = void 0;
const permissionRequest_repository_1 = require("../repositories/permissionRequest.repository");
const student_repository_1 = require("../repositories/student.repository");
const parentStudentLink_service_1 = require("./parentStudentLink.service");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class PermissionRequestService {
    async create(data, actorId) {
        // Validate: end date must not precede start date
        if (data.expectedReturnDate < data.startDate) {
            const err = new Error('Expected return date must not precede start date');
            err.statusCode = 422;
            err.code = 'INVALID_DATE_RANGE';
            throw err;
        }
        const student = await student_repository_1.studentRepository.findById(data.studentId);
        if (!student) {
            const err = new Error('Student not found');
            err.statusCode = 404;
            err.code = 'STUDENT_NOT_FOUND';
            throw err;
        }
        const request = await permissionRequest_repository_1.permissionRequestRepository.create({
            studentId: data.studentId,
            reason: data.reason,
            startDate: data.startDate,
            expectedReturnDate: data.expectedReturnDate,
            requesterId: data.requesterId,
            status: 'PENDING',
        });
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'CREATE_PERMISSION_REQUEST',
            entityType: 'PermissionRequest',
            entityId: request.id,
            newValues: { studentId: data.studentId, reason: data.reason, status: 'PENDING' },
        });
        return permissionRequest_repository_1.permissionRequestRepository.findById(request.id);
    }
    async getById(id) {
        return permissionRequest_repository_1.permissionRequestRepository.findById(id);
    }
    async listForParent(studentId, parentId) {
        // Parent can only see permission status for linked children
        await parentStudentLink_service_1.parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);
        return permissionRequest_repository_1.permissionRequestRepository.findByStudent(studentId);
    }
    async listPending() {
        return permissionRequest_repository_1.permissionRequestRepository.findByStatus('PENDING');
    }
    async list(filters) {
        return permissionRequest_repository_1.permissionRequestRepository.list(filters);
    }
    async approve(id, actorId, decisionReason) {
        const existing = await permissionRequest_repository_1.permissionRequestRepository.findById(id);
        if (!existing) {
            const err = new Error('Permission request not found');
            err.statusCode = 404;
            err.code = 'PERMISSION_REQUEST_NOT_FOUND';
            throw err;
        }
        if (existing.status !== 'PENDING') {
            const err = new Error('Only pending requests can be approved');
            err.statusCode = 400;
            err.code = 'INVALID_STATUS_TRANSITION';
            throw err;
        }
        const updated = await permissionRequest_repository_1.permissionRequestRepository.updateStatus(id, 'APPROVED', actorId, decisionReason);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'APPROVE_PERMISSION_REQUEST',
            entityType: 'PermissionRequest',
            entityId: id,
            oldValues: { status: existing.status },
            newValues: { status: 'APPROVED', decisionReason },
        });
        return permissionRequest_repository_1.permissionRequestRepository.findById(id);
    }
    async reject(id, actorId, decisionReason) {
        const existing = await permissionRequest_repository_1.permissionRequestRepository.findById(id);
        if (!existing) {
            const err = new Error('Permission request not found');
            err.statusCode = 404;
            err.code = 'PERMISSION_REQUEST_NOT_FOUND';
            throw err;
        }
        if (existing.status !== 'PENDING') {
            const err = new Error('Only pending requests can be rejected');
            err.statusCode = 400;
            err.code = 'INVALID_STATUS_TRANSITION';
            throw err;
        }
        const updated = await permissionRequest_repository_1.permissionRequestRepository.updateStatus(id, 'REJECTED', actorId, decisionReason);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'REJECT_PERMISSION_REQUEST',
            entityType: 'PermissionRequest',
            entityId: id,
            oldValues: { status: existing.status },
            newValues: { status: 'REJECTED', decisionReason },
        });
        return permissionRequest_repository_1.permissionRequestRepository.findById(id);
    }
    async cancel(id, actorId) {
        const existing = await permissionRequest_repository_1.permissionRequestRepository.findById(id);
        if (!existing) {
            const err = new Error('Permission request not found');
            err.statusCode = 404;
            err.code = 'PERMISSION_REQUEST_NOT_FOUND';
            throw err;
        }
        if (existing.status !== 'PENDING') {
            const err = new Error('Only pending requests can be cancelled');
            err.statusCode = 400;
            err.code = 'INVALID_STATUS_TRANSITION';
            throw err;
        }
        const updated = await permissionRequest_repository_1.permissionRequestRepository.cancel(id);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'CANCEL_PERMISSION_REQUEST',
            entityType: 'PermissionRequest',
            entityId: id,
            oldValues: { status: existing.status },
            newValues: { status: 'CANCELLED' },
        });
        return permissionRequest_repository_1.permissionRequestRepository.findById(id);
    }
}
exports.PermissionRequestService = PermissionRequestService;
exports.permissionRequestService = new PermissionRequestService();
//# sourceMappingURL=permissionRequest.service.js.map