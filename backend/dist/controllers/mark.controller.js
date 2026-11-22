"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markController = exports.MarkController = void 0;
const mark_service_1 = require("../services/mark.service");
class MarkController {
    async create(req, res, next) {
        try {
            const authReq = req;
            const { studentId, subjectId, value, maxValue, term, academicYear, status, comment } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const mark = await mark_service_1.markService.create({
                studentId, subjectId, value, maxValue, term, academicYear,
                status: status || 'DRAFT', recordedById: actorId, comment,
            }, actorId);
            res.status(201).json({ data: mark, meta: { action: 'createMark' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const mark = await mark_service_1.markService.getById(id);
            if (!mark) {
                return res.status(404).json({ error: { code: 'MARK_NOT_FOUND', message: 'Mark not found' } });
            }
            res.json({ data: mark, meta: { action: 'getMark' } });
        }
        catch (err) {
            next(err);
        }
    }
    async listForParent(req, res, next) {
        try {
            const authReq = req;
            const studentId = parseInt(req.params.studentId, 10);
            const parentId = parseInt(req.query.parentId, 10);
            const { status, term, academicYear, subjectId } = req.query;
            if (!parentId) {
                return res.status(422).json({ error: { code: 'MISSING_PARAM', message: 'parentId is required' } });
            }
            const marks = await mark_service_1.markService.listForParent(studentId, parentId, {
                status: status,
                term: term,
                academicYear: academicYear,
                subjectId: subjectId ? parseInt(subjectId, 10) : undefined,
            });
            res.json({ data: marks, meta: { action: 'listMarksForParent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async listForTeacher(req, res, next) {
        try {
            const { status, studentId, subjectId, term, academicYear } = req.query;
            const marks = await mark_service_1.markService.listForTeacher({
                status: status,
                studentId: studentId ? parseInt(studentId, 10) : undefined,
                subjectId: subjectId ? parseInt(subjectId, 10) : undefined,
                term: term,
                academicYear: academicYear,
            });
            res.json({ data: marks, meta: { action: 'listMarksForTeacher' } });
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const { value, maxValue, comment } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const updated = await mark_service_1.markService.update(id, { value, maxValue, comment }, actorId);
            res.json({ data: updated, meta: { action: 'updateMark' } });
        }
        catch (err) {
            next(err);
        }
    }
    async submit(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const submitted = await mark_service_1.markService.submit(id, actorId);
            res.json({ data: submitted, meta: { action: 'submitMark' } });
        }
        catch (err) {
            next(err);
        }
    }
    async publish(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const published = await mark_service_1.markService.publish(id, actorId);
            res.json({ data: published, meta: { action: 'publishMark' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.MarkController = MarkController;
exports.markController = new MarkController();
//# sourceMappingURL=mark.controller.js.map