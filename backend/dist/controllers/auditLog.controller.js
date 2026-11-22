"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogController = exports.AuditLogController = void 0;
const auditLog_service_1 = require("../services/auditLog.service");
class AuditLogController {
    async list(req, res, next) {
        try {
            const { userId, action, entityType, limit } = req.query;
            const logs = await auditLog_service_1.auditLogService.list({
                userId: userId ? parseInt(userId, 10) : undefined,
                action: action,
                entityType: entityType,
                limit: limit ? parseInt(limit, 10) : undefined,
            });
            res.json({ data: logs, meta: { action: 'listAuditLogs' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuditLogController = AuditLogController;
exports.auditLogController = new AuditLogController();
//# sourceMappingURL=auditLog.controller.js.map