"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parent_controller_1 = require("../controllers/parent.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Create parent - admin/headmaster only
router.post('/', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER'), (req, res, next) => parent_controller_1.parentController.create(req, res, next));
// Get parent by ID
router.get('/:id', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER', 'TEACHER', 'PARENT'), (req, res, next) => parent_controller_1.parentController.getById(req, res, next));
// List parents
router.get('/', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER', 'TEACHER'), (req, res, next) => parent_controller_1.parentController.list(req, res, next));
// Update parent
router.put('/:id', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER', 'PARENT'), (req, res, next) => parent_controller_1.parentController.update(req, res, next));
exports.default = router;
//# sourceMappingURL=parent.routes.js.map