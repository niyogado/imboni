/**
 * Notification Service
 * Security rule: Notifications must not expose detailed marks or disciplinary content.
 * Send minimal alerts only; require login to view details.
 */
export declare class NotificationService {
    create(data: {
        recipientId: number;
        channel: string;
        status: string;
        subject?: string;
        content: string;
    }, actorId?: number): Promise<any>;
    getById(id: number): Promise<any | null>;
    listForRecipient(recipientId: number, limit?: number): Promise<any[]>;
    updateDeliveryStatus(id: number, status: string, providerMessageId?: string, sentAt?: Date): Promise<any>;
}
export declare const notificationService: NotificationService;
//# sourceMappingURL=notification.service.d.ts.map