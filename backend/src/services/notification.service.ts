import { notificationRepository } from '../repositories/notification.repository';
import { auditLogRepository } from '../repositories/auditLog.repository';

/**
 * Notification Service
 * Security rule: Notifications must not expose detailed marks or disciplinary content.
 * Send minimal alerts only; require login to view details.
 */
export class NotificationService {
  async create(data: {
    recipientId: number;
    channel: string;
    status: string;
    subject?: string;
    content: string;
  }, actorId?: number): Promise<any> {
    // Minimal content enforcement: no detailed marks/discipline in notification content
    if (data.content && data.content.length > 200) {
      const err: any = new Error('Notification content too long');
      err.statusCode = 422;
      err.code = 'CONTENT_TOO_LONG';
      throw err;
    }

    const notification = await notificationRepository.create({
      recipientId: data.recipientId,
      channel: data.channel,
      status: data.status,
      subject: data.subject,
      content: data.content,
    });

    if (actorId) {
      await auditLogRepository.create({
        userId: actorId,
        action: 'CREATE_NOTIFICATION',
        entityType: 'Notification',
        entityId: notification.id,
        newValues: { recipientId: data.recipientId, channel: data.channel, status: data.status },
      });
    }

    return notification;
  }

  async getById(id: number): Promise<any | null> {
    return notificationRepository.findById(id);
  }

  async listForRecipient(recipientId: number, limit?: number): Promise<any[]> {
    return notificationRepository.findByRecipient(recipientId, limit);
  }

  async updateDeliveryStatus(id: number, status: string, providerMessageId?: string, sentAt?: Date): Promise<any> {
    return notificationRepository.updateStatus(id, status, providerMessageId, sentAt);
  }
}

export const notificationService = new NotificationService();