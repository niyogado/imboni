"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentService = exports.ParentService = void 0;
const parent_repository_1 = require("../repositories/parent.repository");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class ParentService {
    async create(data, actorId) {
        const existing = await parent_repository_1.parentRepository.findByPhone(data.phone);
        if (existing) {
            const err = new Error('Phone already registered');
            err.statusCode = 409;
            err.code = 'PARENT_PHONE_EXISTS';
            throw err;
        }
        const parent = await parent_repository_1.parentRepository.create(data);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'CREATE_PARENT',
            entityType: 'Parent',
            entityId: parent.id,
            newValues: { phone: parent.phone, firstName: parent.firstName, lastName: parent.lastName },
        });
        return parent;
    }
    async getById(id) {
        return parent_repository_1.parentRepository.findById(id);
    }
    async list() {
        return parent_repository_1.parentRepository.list();
    }
    async update(id, data, actorId) {
        const existing = await parent_repository_1.parentRepository.findById(id);
        if (!existing) {
            const err = new Error('Parent not found');
            err.statusCode = 404;
            err.code = 'PARENT_NOT_FOUND';
            throw err;
        }
        const oldValues = { ...existing };
        const updated = await parent_repository_1.parentRepository.update(id, data);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'UPDATE_PARENT',
            entityType: 'Parent',
            entityId: id,
            oldValues,
            newValues: { ...updated },
        });
        return updated;
    }
}
exports.ParentService = ParentService;
exports.parentService = new ParentService();
//# sourceMappingURL=parent.service.js.map