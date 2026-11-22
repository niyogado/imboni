import { Request, Response, NextFunction } from 'express';
export declare class IncidentController {
    create(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    listForParent(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    listForStaff(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    review(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    approve(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    reject(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const incidentController: IncidentController;
//# sourceMappingURL=incident.controller.d.ts.map