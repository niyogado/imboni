import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export class NotificationRepository {
  async create(data: {
    recipientId: number;
    channel: string;
    status: string;
    subject?: string;
    content: string;
  }): Promise<Notification> {
    return prisma.notification.create({
      data: {
        recipientId: data.recipientId,
        channel: data.channel as any,
        status: data.status as any,
        subject: data.subject,
        content: data.content,
      },
    });
  }

  async findById(id: number): Promise<Notification | null> {
    return prisma.notification.findUnique({
      where: { id },
    });
  }

  async findByRecipient(recipientId: number, limit?: number): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { recipientId },
      orderBy: { createdAt: 'desc' },
      take: limit ?? 50,
    });
  }

  async updateStatus(id: number, status: string, providerMessageId?: string, sentAt?: Date): Promise<Notification> {
    return prisma.notification.update({
      where: { id },
      data: {
        status: status as any,
        ...(providerMessageId && { providerMessageId }),
        ...(sentAt && { sentAt }),
      },
    });
  }

  async incrementRetry(id: number): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: { retryCount: { increment: 1 } },
    });
  }
}

export const notificationRepository = new NotificationRepository();
