import { Request, Response, NextFunction } from 'express';
export declare class ParentController {
    create(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    list(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const parentController: ParentController;
//# sourceMappingURL=parent.controller.d.ts.map