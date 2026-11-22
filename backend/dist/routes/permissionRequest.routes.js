"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissionRequest_controller_1 = require("../controllers/permissionRequest.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Create permission request
router.post('/', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.create(req, res, next));
// Get permission request by ID
router.get('/:id', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.getById(req, res, next));
// List permission requests for parent (linked children only)
router.get('/students/:studentId', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.listForParent(req, res, next));
// List pending requests (for headmaster approval)
router.get('/pending', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.listPending(req, res, next));
// List all permission requests
router.get('/', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR', 'TEACHER'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.list(req, res, next));
// Approve - headmaster only
router.post('/:id/approve', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.approve(req, res, next));
// Reject - headmaster only
router.post('/:id/reject', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.reject(req, res, next));
// Cancel - requester can cancel while pending
router.post('/:id/cancel', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => permissionRequest_controller_1.permissionRequestController.cancel(req, res, next));
exports.default = router;
//# sourceMappingURL=permissionRequest.routes.js.map