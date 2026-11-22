"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Create student - staff only
router.post('/', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'TEACHER', 'HEADMASTER'), (req, res, next) => student_controller_1.studentController.create(req, res, next));
// Get student by ID
router.get('/:id', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'TEACHER', 'HEADMASTER', 'PARENT'), (req, res, next) => student_controller_1.studentController.getById(req, res, next));
// List students
router.get('/', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'TEACHER', 'HEADMASTER', 'PARENT'), (req, res, next) => student_controller_1.studentController.list(req, res, next));
// Update student
router.put('/:id', auth_1.authenticate, (0, rbac_1.authorize)('ADMINISTRATOR', 'TEACHER', 'HEADMASTER'), (req, res, next) => student_controller_1.studentController.update(req, res, next));
exports.default = router;
//# sourceMappingURL=student.routes.js.map