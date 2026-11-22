import { Request, Response, NextFunction } from 'express';
export declare class AuthController {
    register(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    login(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getProfile(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const authController: AuthController;
//# sourceMappingURL=auth.controller.d.ts.map