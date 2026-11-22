"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentController = exports.ParentController = void 0;
const parent_service_1 = require("../services/parent.service");
class ParentController {
    async create(req, res, next) {
        try {
            const authReq = req;
            const { firstName, lastName, phone, email } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const parent = await parent_service_1.parentService.create({ firstName, lastName, phone, email }, actorId);
            res.status(201).json({ data: parent, meta: { action: 'createParent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const parent = await parent_service_1.parentService.getById(id);
            if (!parent) {
                return res.status(404).json({ error: { code: 'PARENT_NOT_FOUND', message: 'Parent not found' } });
            }
            res.json({ data: parent, meta: { action: 'getParent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async list(req, res, next) {
        try {
            const parents = await parent_service_1.parentService.list();
            res.json({ data: parents, meta: { action: 'listParents' } });
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const { firstName, lastName, phone, email } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const updated = await parent_service_1.parentService.update(id, { firstName, lastName, phone, email }, actorId);
            res.json({ data: updated, meta: { action: 'updateParent' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ParentController = ParentController;
exports.parentController = new ParentController();
//# sourceMappingURL=parent.controller.js.map