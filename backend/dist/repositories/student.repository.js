"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRepository = exports.StudentRepository = void 0;
const database_1 = require("../config/database");
class StudentRepository {
    async findById(id) {
        return database_1.prisma.student.findUnique({
            where: { id },
            include: {
                class: { select: { id: true, name: true, level: true } },
                user: true,
            },
        });
    }
    async findByStudentNumber(studentNumber) {
        return database_1.prisma.student.findUnique({
            where: { studentNumber },
        });
    }
    async create(data) {
        return database_1.prisma.student.create({
            data: {
                studentNumber: data.studentNumber,
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                classId: data.classId,
            },
        });
    }
    async update(id, data) {
        return database_1.prisma.student.update({
            where: { id },
            data,
        });
    }
    async list(filters) {
        return database_1.prisma.student.findMany({
            where: {
                ...(filters?.classId && { classId: filters.classId }),
                ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
            },
            include: {
                class: { select: { id: true, name: true } },
            },
            orderBy: { studentNumber: 'asc' },
        });
    }
}
exports.StudentRepository = StudentRepository;
exports.studentRepository = new StudentRepository();
//# sourceMappingURL=student.repository.js.map