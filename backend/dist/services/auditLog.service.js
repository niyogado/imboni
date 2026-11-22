"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogService = exports.AuditLogService = void 0;
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class AuditLogService {
    async log(data) {
        return auditLog_repository_1.auditLogRepository.create(data);
    }
    async list(filters) {
        return auditLog_repository_1.auditLogRepository.list(filters);
    }
}
exports.AuditLogService = AuditLogService;
exports.auditLogService = new AuditLogService();
//# sourceMappingURL=auditLog.service.js.map