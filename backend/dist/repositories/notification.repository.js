"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepository = exports.NotificationRepository = void 0;
const database_1 = require("../config/database");
class NotificationRepository {
    async create(data) {
        return database_1.prisma.notification.create({
            data: {
                recipientId: data.recipientId,
                channel: data.channel,
                status: data.status,
                subject: data.subject,
                content: data.content,
            },
        });
    }
    async findById(id) {
        return database_1.prisma.notification.findUnique({
            where: { id },
        });
    }
    async findByRecipient(recipientId, limit) {
        return database_1.prisma.notification.findMany({
            where: { recipientId },
            orderBy: { createdAt: 'desc' },
            take: limit ?? 50,
        });
    }
    async updateStatus(id, status, providerMessageId, sentAt) {
        return database_1.prisma.notification.update({
            where: { id },
            data: {
                status: status,
                ...(providerMessageId && { providerMessageId }),
                ...(sentAt && { sentAt }),
            },
        });
    }
    async incrementRetry(id) {
        await database_1.prisma.notification.update({
            where: { id },
            data: { retryCount: { increment: 1 } },
        });
    }
}
exports.NotificationRepository = NotificationRepository;
exports.notificationRepository = new NotificationRepository();
//# sourceMappingURL=notification.repository.js.map