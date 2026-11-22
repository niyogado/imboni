import { Request, Response, NextFunction } from 'express';
export declare class MarkController {
    create(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    listForParent(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    listForTeacher(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    submit(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    publish(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const markController: MarkController;
//# sourceMappingURL=mark.controller.d.ts.map