"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRepository = exports.MarkRepository = void 0;
const database_1 = require("../config/database");
class MarkRepository {
    async findById(id) {
        return database_1.prisma.mark.findUnique({
            where: { id },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                subject: { select: { id: true, name: true, code: true } },
                recordedBy: { select: { id: true, firstName: true, lastName: true, email: true } },
                reviewedBy: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async findByStudent(studentId, filters) {
        return database_1.prisma.mark.findMany({
            where: {
                studentId,
                ...(filters?.status && { status: filters.status }),
                ...(filters?.term && { term: filters.term }),
                ...(filters?.academicYear && { academicYear: filters.academicYear }),
                ...(filters?.subjectId && { subjectId: filters.subjectId }),
            },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                subject: { select: { id: true, name: true, code: true } },
                recordedBy: { select: { id: true, firstName: true, lastName: true, email: true } },
                reviewedBy: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(data) {
        return database_1.prisma.mark.create({
            data: {
                studentId: data.studentId,
                subjectId: data.subjectId,
                value: data.value,
                maxValue: data.maxValue ?? 100,
                term: data.term,
                academicYear: data.academicYear,
                status: data.status,
                recordedById: data.recordedById,
                comment: data.comment,
            },
        });
    }
    async update(id, data) {
        return database_1.prisma.mark.update({
            where: { id },
            data,
        });
    }
    async publish(markId, publishedAt) {
        return database_1.prisma.mark.update({
            where: { id: markId },
            data: {
                status: 'PUBLISHED',
                publishedAt,
            },
        });
    }
    async createVersion(data) {
        return database_1.prisma.markVersion.create({
            data: {
                markId: data.markId,
                value: data.value,
                maxValue: data.maxValue,
                term: data.term,
                academicYear: data.academicYear,
                status: data.status,
                recordedById: data.recordedById,
                changeReason: data.changeReason,
            },
        });
    }
    async incrementVersion(markId) {
        await database_1.prisma.mark.update({
            where: { id: markId },
            data: { version: { increment: 1 } },
        });
    }
    async list(filters) {
        return database_1.prisma.mark.findMany({
            where: {
                ...(filters?.status && { status: filters.status }),
                ...(filters?.studentId && { studentId: filters.studentId }),
                ...(filters?.subjectId && { subjectId: filters.subjectId }),
                ...(filters?.term && { term: filters.term }),
                ...(filters?.academicYear && { academicYear: filters.academicYear }),
            },
            include: {
                student: { select: { id: true, studentNumber: true, firstName: true, lastName: true } },
                subject: { select: { id: true, name: true, code: true } },
                recordedBy: { select: { id: true, firstName: true, lastName: true, email: true } },
                reviewedBy: { select: { id: true, firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.MarkRepository = MarkRepository;
exports.markRepository = new MarkRepository();
//# sourceMappingURL=mark.repository.js.map