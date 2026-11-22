"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// All users list - admin/headmaster only
router.get('/', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER'), (req, res, next) => user_controller_1.userController.list(req, res, next));
// Get user by ID
router.get('/:id', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER', 'TEACHER'), (req, res, next) => user_controller_1.userController.getById(req, res, next));
// Update user
router.put('/:id', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'HEADMASTER'), (req, res, next) => user_controller_1.userController.update(req, res, next));
// Deactivate user - admin only
router.delete('/:id', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR'), (req, res, next) => user_controller_1.userController.deactivate(req, res, next));
exports.default = router;
//# sourceMappingURL=user.routes.js.map