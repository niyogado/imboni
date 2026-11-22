"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class UserService {
    async list() {
        return user_repository_1.userRepository.list();
    }
    async getById(id) {
        return user_repository_1.userRepository.findById(id);
    }
    async update(id, data, actorId) {
        const existing = await user_repository_1.userRepository.findById(id);
        if (!existing) {
            const err = new Error('User not found');
            err.statusCode = 404;
            err.code = 'USER_NOT_FOUND';
            throw err;
        }
        const oldValues = { ...existing };
        const updated = await user_repository_1.userRepository.update(id, data);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'UPDATE_USER',
            entityType: 'User',
            entityId: id,
            oldValues,
            newValues: { ...updated },
        });
        return updated;
    }
    async deactivate(id, actorId) {
        const existing = await user_repository_1.userRepository.findById(id);
        if (!existing) {
            const err = new Error('User not found');
            err.statusCode = 404;
            err.code = 'USER_NOT_FOUND';
            throw err;
        }
        const deactivated = await user_repository_1.userRepository.deactivate(id);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'DEACTIVATE_USER',
            entityType: 'User',
            entityId: id,
            oldValues: { isActive: true },
            newValues: { isActive: false },
        });
        return deactivated;
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map