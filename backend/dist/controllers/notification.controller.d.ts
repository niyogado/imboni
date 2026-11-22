import { Request, Response, NextFunction } from 'express';
export declare class NotificationController {
    create(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    listForRecipient(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    updateDeliveryStatus(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const notificationController: NotificationController;
//# sourceMappingURL=notification.controller.d.ts.map