export declare class NotificationRepository {
    create(data: {
        recipientId: number;
        channel: string;
        status: string;
        subject?: string;
        content: string;
    }): Promise<Notification>;
    findById(id: number): Promise<Notification | null>;
    findByRecipient(recipientId: number, limit?: number): Promise<Notification[]>;
    updateStatus(id: number, status: string, providerMessageId?: string, sentAt?: Date): Promise<Notification>;
    incrementRetry(id: number): Promise<void>;
}
export declare const notificationRepository: NotificationRepository;
//# sourceMappingURL=notification.repository.d.ts.map