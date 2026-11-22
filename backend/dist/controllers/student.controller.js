"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = exports.StudentController = void 0;
const student_service_1 = require("../services/student.service");
class StudentController {
    async create(req, res, next) {
        try {
            const authReq = req;
            const { studentNumber, firstName, lastName, dateOfBirth, gender, classId } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const student = await student_service_1.studentService.create({
                studentNumber,
                firstName,
                lastName,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                gender,
                classId,
            }, actorId);
            res.status(201).json({ data: student, meta: { action: 'createStudent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const student = await student_service_1.studentService.getById(id);
            if (!student) {
                return res.status(404).json({ error: { code: 'STUDENT_NOT_FOUND', message: 'Student not found' } });
            }
            res.json({ data: student, meta: { action: 'getStudent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async list(req, res, next) {
        try {
            const students = await student_service_1.studentService.list();
            res.json({ data: students, meta: { action: 'listStudents' } });
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const { firstName, lastName, dateOfBirth, gender, classId, isActive } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const updated = await student_service_1.studentService.update(id, {
                firstName, lastName,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                gender, classId, isActive,
            }, actorId);
            res.json({ data: updated, meta: { action: 'updateStudent' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.StudentController = StudentController;
exports.studentController = new StudentController();
//# sourceMappingURL=student.controller.js.map