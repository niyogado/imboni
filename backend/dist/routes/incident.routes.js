"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const incident_controller_1 = require("../controllers/incident.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Create incident - staff only
router.post('/', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => incident_controller_1.incidentController.create(req, res, next));
// Get incident by ID
router.get('/:id', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR', 'PARENT'), (req, res, next) => incident_controller_1.incidentController.getById(req, res, next));
// List incidents for parent (parent sees only approved incidents of linked children)
router.get('/students/:studentId', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => incident_controller_1.incidentController.listForParent(req, res, next));
// List incidents for staff
router.get('/', auth_1.authenticate, (0, rbac_1.authorize)('TEACHER', 'DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => incident_controller_1.incidentController.listForStaff(req, res, next));
// Review incident
router.post('/:id/review', auth_1.authenticate, (0, rbac_1.authorize)('DISCIPLINE_STAFF', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => incident_controller_1.incidentController.review(req, res, next));
// Approve incident - headmaster/admin only
router.post('/:id/approve', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => incident_controller_1.incidentController.approve(req, res, next));
// Reject incident - headmaster/admin only
router.post('/:id/reject', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => incident_controller_1.incidentController.reject(req, res, next));
exports.default = router;
//# sourceMappingURL=incident.routes.js.map