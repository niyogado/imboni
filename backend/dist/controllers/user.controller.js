"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async list(req, res, next) {
        try {
            const users = await user_service_1.userService.list();
            res.json({ data: users, meta: { action: 'listUsers' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await user_service_1.userService.getById(id);
            if (!user) {
                return res.status(404).json({ error: { code: 'USER_NOT_FOUND', message: 'User not found' } });
            }
            res.json({ data: user, meta: { action: 'getUser' } });
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const { email, phone, firstName, lastName, isActive } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const updated = await user_service_1.userService.update(id, { email, phone, firstName, lastName, isActive }, actorId);
            res.json({ data: updated, meta: { action: 'updateUser' } });
        }
        catch (err) {
            next(err);
        }
    }
    async deactivate(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const deactivated = await user_service_1.userService.deactivate(id, actorId);
            res.json({ data: deactivated, meta: { action: 'deactivateUser' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map