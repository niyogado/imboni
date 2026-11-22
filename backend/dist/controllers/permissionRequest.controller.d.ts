import { Request, Response, NextFunction } from 'express';
export declare class PermissionRequestController {
    create(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    listForParent(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    listPending(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    list(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    approve(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    reject(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    cancel(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const permissionRequestController: PermissionRequestController;
//# sourceMappingURL=permissionRequest.controller.d.ts.map