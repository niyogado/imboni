"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incidentRepository = exports.IncidentRepository = void 0;
const database_1 = require("../config/database");
class IncidentRepository {
    async findById(id) {
        return database_1.prisma.incident.findUnique({
            where: { id },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                responsibleStaff: { select: { id: true, firstName: true, lastName: true, email: true } },
                reviewedBy: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async findByStudent(studentId, filters) {
        return database_1.prisma.incident.findMany({
            where: {
                studentId,
                ...(filters?.status && { status: filters.status }),
            },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                responsibleStaff: { select: { id: true, firstName: true, lastName: true, email: true } },
                reviewedBy: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { date: 'desc' },
        });
    }
    async create(data) {
        return database_1.prisma.incident.create({
            data: {
                studentId: data.studentId,
                title: data.title,
                description: data.description,
                category: data.category,
                date: data.date,
                responsibleStaffId: data.responsibleStaffId,
                status: data.status,
            },
        });
    }
    async update(id, data) {
        return database_1.prisma.incident.update({
            where: { id },
            data,
        });
    }
    async approve(incidentId, reviewedById, decisionReason) {
        return database_1.prisma.incident.update({
            where: { id: incidentId },
            data: {
                status: 'APPROVED',
                reviewedById,
                reviewedAt: new Date(),
                decisionReason,
            },
        });
    }
    async reject(incidentId, reviewedById, decisionReason) {
        return database_1.prisma.incident.update({
            where: { id: incidentId },
            data: {
                status: 'REJECTED',
                reviewedById,
                reviewedAt: new Date(),
                decisionReason,
            },
        });
    }
    async createVersion(data) {
        return database_1.prisma.incidentVersion.create({
            data: {
                incidentId: data.incidentId,
                title: data.title,
                description: data.description,
                category: data.category,
                date: data.date,
                status: data.status,
                reviewedById: data.reviewedById,
                reviewedAt: data.reviewedAt,
                decisionReason: data.decisionReason,
                changeReason: data.changeReason,
            },
        });
    }
    async incrementVersion(incidentId) {
        await database_1.prisma.incident.update({
            where: { id: incidentId },
            data: { version: { increment: 1 } },
        });
    }
    async list(filters) {
        return database_1.prisma.incident.findMany({
            where: {
                ...(filters?.status && { status: filters.status }),
                ...(filters?.studentId && { studentId: filters.studentId }),
                ...(filters?.category && { category: filters.category }),
            },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                responsibleStaff: { select: { id: true, firstName: true, lastName: true, email: true } },
                reviewedBy: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.IncidentRepository = IncidentRepository;
exports.incidentRepository = new IncidentRepository();
//# sourceMappingURL=incident.repository.js.map