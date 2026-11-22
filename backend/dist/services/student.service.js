"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = exports.StudentService = void 0;
const student_repository_1 = require("../repositories/student.repository");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class StudentService {
    async create(data, actorId) {
        const existing = await student_repository_1.studentRepository.findByStudentNumber(data.studentNumber);
        if (existing) {
            const err = new Error('Student number already exists');
            err.statusCode = 409;
            err.code = 'STUDENT_EXISTS';
            throw err;
        }
        const student = await student_repository_1.studentRepository.create(data);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'CREATE_STUDENT',
            entityType: 'Student',
            entityId: student.id,
            newValues: { studentNumber: student.studentNumber, firstName: student.firstName, lastName: student.lastName },
        });
        return student;
    }
    async getById(id) {
        return student_repository_1.studentRepository.findById(id);
    }
    async list(filters) {
        return student_repository_1.studentRepository.list(filters);
    }
    async update(id, data, actorId) {
        const existing = await student_repository_1.studentRepository.findById(id);
        if (!existing) {
            const err = new Error('Student not found');
            err.statusCode = 404;
            err.code = 'STUDENT_NOT_FOUND';
            throw err;
        }
        const oldValues = { ...existing };
        const updated = await student_repository_1.studentRepository.update(id, data);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'UPDATE_STUDENT',
            entityType: 'Student',
            entityId: id,
            oldValues,
            newValues: { ...updated },
        });
        return updated;
    }
}
exports.StudentService = StudentService;
exports.studentService = new StudentService();
//# sourceMappingURL=student.service.js.map