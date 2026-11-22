import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';
import { AuthRequest } from '../types';

export class NotificationController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const authReq = req as unknown as AuthRequest;
      const { recipientId, channel, status, subject, content } = req.body;
      const actorId = authReq.user?.id;
      if (!actorId) {
        return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      }
      const notification = await notificationService.create({
        recipientId, channel, status: status || 'QUEUED', subject, content,
      }, actorId);
      res.status(201).json({ data: notification, meta: { action: 'createNotification' } });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const notification = await notificationService.getById(id);
      if (!notification) {
        return res.status(404).json({ error: { code: 'NOTIFICATION_NOT_FOUND', message: 'Notification not found' } });
      }
      res.json({ data: notification, meta: { action: 'getNotification' } });
    } catch (err) {
      next(err);
    }
  }

  async listForRecipient(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const recipientId = parseInt(req.params.recipientId, 10);
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const notifications = await notificationService.listForRecipient(recipientId, limit);
      res.json({ data: notifications, meta: { action: 'listNotificationsForRecipient' } });
    } catch (err) {
      next(err);
    }
  }

  async updateDeliveryStatus(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const { status, providerMessageId, sentAt } = req.body;
      const updated = await notificationService.updateDeliveryStatus(
        id, status, providerMessageId, sentAt ? new Date(sentAt) : undefined
      );
      res.json({ data: updated, meta: { action: 'updateNotificationStatus' } });
    } catch (err) {
      next(err);
    }
  }
}

export const notificationController = new NotificationController();
