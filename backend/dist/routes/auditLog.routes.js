"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditLog_controller_1 = require("../controllers/auditLog.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// List audit logs - admin/headmaster only
router.get('/', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER'), (req, res, next) => auditLog_controller_1.auditLogController.list(req, res, next));
exports.default = router;
//# sourceMappingURL=auditLog.routes.js.map