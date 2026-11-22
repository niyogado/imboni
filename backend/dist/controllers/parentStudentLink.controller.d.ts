import { Request, Response, NextFunction } from 'express';
export declare class ParentStudentLinkController {
    link(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    unlink(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getLinkedStudents(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    verifyAccess(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
export declare const parentStudentLinkController: ParentStudentLinkController;
//# sourceMappingURL=parentStudentLink.controller.d.ts.map