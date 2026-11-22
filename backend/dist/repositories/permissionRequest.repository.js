"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionRequestRepository = exports.PermissionRequestRepository = void 0;
const database_1 = require("../config/database");
class PermissionRequestRepository {
    async findById(id) {
        return database_1.prisma.permissionRequest.findUnique({
            where: { id },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                requester: { select: { id: true, firstName: true, lastName: true, email: true } },
                decidedBy: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async findByStudent(studentId) {
        return database_1.prisma.permissionRequest.findMany({
            where: { studentId },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                requester: { select: { id: true, firstName: true, lastName: true, email: true } },
                decidedBy: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByStatus(status) {
        return database_1.prisma.permissionRequest.findMany({
            where: { status: status },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                requester: { select: { id: true, firstName: true, lastName: true, email: true } },
                decidedBy: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async create(data) {
        return database_1.prisma.permissionRequest.create({
            data: {
                studentId: data.studentId,
                reason: data.reason,
                startDate: data.startDate,
                expectedReturnDate: data.expectedReturnDate,
                requesterId: data.requesterId,
                status: data.status,
            },
        });
    }
    async updateStatus(id, status, decidedById, decisionReason) {
        return database_1.prisma.permissionRequest.update({
            where: { id },
            data: {
                status: status,
                decidedById,
                decidedAt: new Date(),
                decisionReason,
            },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
            },
        });
    }
    async cancel(id) {
        return database_1.prisma.permissionRequest.update({
            where: { id },
            data: {
                status: 'CANCELLED',
                cancelledAt: new Date(),
            },
        });
    }
    async list(filters) {
        return database_1.prisma.permissionRequest.findMany({
            where: {
                ...(filters?.status && { status: filters.status }),
                ...(filters?.studentId && { studentId: filters.studentId }),
            },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                requester: { select: { id: true, firstName: true, lastName: true, email: true } },
                decidedBy: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.PermissionRequestRepository = PermissionRequestRepository;
exports.permissionRequestRepository = new PermissionRequestRepository();
//# sourceMappingURL=permissionRequest.repository.js.map