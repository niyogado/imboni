"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentStudentLinkController = exports.ParentStudentLinkController = void 0;
const parentStudentLink_service_1 = require("../services/parentStudentLink.service");
class ParentStudentLinkController {
    async link(req, res, next) {
        try {
            const authReq = req;
            const { parentId, studentId, relationship } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const link = await parentStudentLink_service_1.parentStudentLinkService.link({ parentId, studentId, relationship, linkedById: actorId });
            res.status(201).json({ data: link, meta: { action: 'linkParentStudent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async unlink(req, res, next) {
        try {
            const authReq = req;
            const linkId = parseInt(req.params.linkId, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            await parentStudentLink_service_1.parentStudentLinkService.unlink(linkId, actorId);
            res.json({ data: { linkId }, meta: { action: 'unlinkParentStudent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getLinkedStudents(req, res, next) {
        try {
            const authReq = req;
            const parentId = parseInt(req.params.parentId, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const links = await parentStudentLink_service_1.parentStudentLinkService.getLinkedStudents(parentId);
            res.json({ data: links, meta: { action: 'getLinkedStudents' } });
        }
        catch (err) {
            next(err);
        }
    }
    async verifyAccess(req, res, next) {
        try {
            const authReq = req;
            const parentId = parseInt(req.params.parentId, 10);
            const studentId = parseInt(req.params.studentId, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const link = await parentStudentLink_service_1.parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);
            res.json({ data: { linked: true, link }, meta: { action: 'verifyParentAccess' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ParentStudentLinkController = ParentStudentLinkController;
exports.parentStudentLinkController = new ParentStudentLinkController();
//# sourceMappingURL=parentStudentLink.controller.js.map