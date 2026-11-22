"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = exports.NotificationService = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
/**
 * Notification Service
 * Security rule: Notifications must not expose detailed marks or disciplinary content.
 * Send minimal alerts only; require login to view details.
 */
class NotificationService {
    async create(data, actorId) {
        // Minimal content enforcement: no detailed marks/discipline in notification content
        if (data.content && data.content.length > 200) {
            const err = new Error('Notification content too long');
            err.statusCode = 422;
            err.code = 'CONTENT_TOO_LONG';
            throw err;
        }
        const notification = await notification_repository_1.notificationRepository.create({
            recipientId: data.recipientId,
            channel: data.channel,
            status: data.status,
            subject: data.subject,
            content: data.content,
        });
        if (actorId) {
            await auditLog_repository_1.auditLogRepository.create({
                userId: actorId,
                action: 'CREATE_NOTIFICATION',
                entityType: 'Notification',
                entityId: notification.id,
                newValues: { recipientId: data.recipientId, channel: data.channel, status: data.status },
            });
        }
        return notification;
    }
    async getById(id) {
        return notification_repository_1.notificationRepository.findById(id);
    }
    async listForRecipient(recipientId, limit) {
        return notification_repository_1.notificationRepository.findByRecipient(recipientId, limit);
    }
    async updateDeliveryStatus(id, status, providerMessageId, sentAt) {
        return notification_repository_1.notificationRepository.updateStatus(id, status, providerMessageId, sentAt);
    }
}
exports.NotificationService = NotificationService;
exports.notificationService = new NotificationService();
//# sourceMappingURL=notification.service.js.map