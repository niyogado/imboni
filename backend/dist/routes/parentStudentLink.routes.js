"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parentStudentLink_controller_1 = require("../controllers/parentStudentLink.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Create parent-student link - admin/headmaster only
router.post('/', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER'), (req, res, next) => parentStudentLink_controller_1.parentStudentLinkController.link(req, res, next));
// Remove link - admin/headmaster only
router.delete('/:linkId', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER'), (req, res, next) => parentStudentLink_controller_1.parentStudentLinkController.unlink(req, res, next));
// Get linked students for a parent
router.get('/parents/:parentId/students', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER', 'TEACHER', 'PARENT'), (req, res, next) => parentStudentLink_controller_1.parentStudentLinkController.getLinkedStudents(req, res, next));
// Verify parent can access student
router.get('/verify/:parentId/students/:studentId', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER', 'TEACHER', 'PARENT'), (req, res, next) => parentStudentLink_controller_1.parentStudentLinkController.verifyAccess(req, res, next));
exports.default = router;
//# sourceMappingURL=parentStudentLink.routes.js.map