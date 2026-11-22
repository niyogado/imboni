"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = exports.NotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
class NotificationController {
    async create(req, res, next) {
        try {
            const authReq = req;
            const { recipientId, channel, status, subject, content } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const notification = await notification_service_1.notificationService.create({
                recipientId, channel, status: status || 'QUEUED', subject, content,
            }, actorId);
            res.status(201).json({ data: notification, meta: { action: 'createNotification' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const notification = await notification_service_1.notificationService.getById(id);
            if (!notification) {
                return res.status(404).json({ error: { code: 'NOTIFICATION_NOT_FOUND', message: 'Notification not found' } });
            }
            res.json({ data: notification, meta: { action: 'getNotification' } });
        }
        catch (err) {
            next(err);
        }
    }
    async listForRecipient(req, res, next) {
        try {
            const recipientId = parseInt(req.params.recipientId, 10);
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
            const notifications = await notification_service_1.notificationService.listForRecipient(recipientId, limit);
            res.json({ data: notifications, meta: { action: 'listNotificationsForRecipient' } });
        }
        catch (err) {
            next(err);
        }
    }
    async updateDeliveryStatus(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { status, providerMessageId, sentAt } = req.body;
            const updated = await notification_service_1.notificationService.updateDeliveryStatus(id, status, providerMessageId, sentAt ? new Date(sentAt) : undefined);
            res.json({ data: updated, meta: { action: 'updateNotificationStatus' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.NotificationController = NotificationController;
exports.notificationController = new NotificationController();
//# sourceMappingURL=notification.controller.js.map