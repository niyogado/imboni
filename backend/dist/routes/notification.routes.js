"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_1 = require("../middleware/auth");
const rbac_1 = require("../middleware/rbac");
const router = (0, express_1.Router)();
// Create notification
router.post('/', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR', 'TEACHER'), (req, res, next) => notification_controller_1.notificationController.create(req, res, next));
// Get notification by ID
router.get('/:id', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => notification_controller_1.notificationController.getById(req, res, next));
// List notifications for recipient
router.get('/recipient/:recipientId', auth_1.authenticate, (0, rbac_1.authorize)('PARENT', 'TEACHER', 'HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => notification_controller_1.notificationController.listForRecipient(req, res, next));
// Update delivery status
router.patch('/:id/status', auth_1.authenticate, (0, rbac_1.authorize)('HEADMASTER', 'ADMINISTRATOR'), (req, res, next) => notification_controller_1.notificationController.updateDeliveryStatus(req, res, next));
exports.default = router;
//# sourceMappingURL=notification.routes.js.map