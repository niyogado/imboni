"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentStudentLinkRepository = exports.ParentStudentLinkRepository = void 0;
const database_1 = require("../config/database");
class ParentStudentLinkRepository {
    async findById(id) {
        return database_1.prisma.parentStudentLink.findUnique({
            where: { id },
            include: { parent: true, student: true },
        });
    }
    async findActiveLink(parentId, studentId) {
        return database_1.prisma.parentStudentLink.findFirst({
            where: {
                parentId,
                studentId,
                isActive: true,
            },
            include: { parent: true, student: true },
        });
    }
    async findLinksByParent(parentId) {
        return database_1.prisma.parentStudentLink.findMany({
            where: { parentId, isActive: true },
            include: { parent: true, student: true },
            orderBy: { linkedAt: 'desc' },
        });
    }
    async findLinksByStudent(studentId) {
        return database_1.prisma.parentStudentLink.findMany({
            where: { studentId, isActive: true },
            include: { parent: true, student: true },
            orderBy: { linkedAt: 'desc' },
        });
    }
    async create(data) {
        return database_1.prisma.parentStudentLink.create({
            data: {
                parentId: data.parentId,
                studentId: data.studentId,
                relationship: data.relationship,
                linkedById: data.linkedById,
            },
        });
    }
    async deactivate(id) {
        return database_1.prisma.parentStudentLink.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async countActiveLinksForStudent(studentId) {
        return database_1.prisma.parentStudentLink.count({
            where: { studentId, isActive: true },
        });
    }
}
exports.ParentStudentLinkRepository = ParentStudentLinkRepository;
exports.parentStudentLinkRepository = new ParentStudentLinkRepository();
//# sourceMappingURL=parentStudentLink.repository.js.map