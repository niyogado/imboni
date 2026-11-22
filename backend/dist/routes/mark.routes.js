"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mark_controller_1 = require("../controllers/mark.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Create mark - teacher only
router.post('/', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => mark_controller_1.markController.create(req, res, next));
// Get mark by ID
router.get('/:id', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'HEADMASTER', 'ADMINISTRATOR', 'PARENT'), (req, res, next) => mark_controller_1.markController.getById(req, res, next));
// List marks for parent (parent sees only published marks of linked children)
router.get('/students/:studentId', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => mark_controller_1.markController.listForParent(req, res, next));
// List marks for teacher/staff
router.get('/', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => mark_controller_1.markController.listForTeacher(req, res, next));
// Update mark (correction keeps history)
router.put('/:id', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => mark_controller_1.markController.update(req, res, next));
// Submit mark for review
router.post('/:id/submit', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => mark_controller_1.markController.submit(req, res, next));
// Publish mark
router.post('/:id/publish', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => mark_controller_1.markController.publish(req, res, next));
exports.default = router;
//# sourceMappingURL=mark.routes.js.map