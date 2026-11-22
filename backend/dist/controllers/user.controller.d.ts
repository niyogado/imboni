import { Request, Response, NextFunction } from 'express';
export declare class UserController {
    list(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    deactivate(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const userController: UserController;
//# sourceMappingURL=user.controller.d.ts.map