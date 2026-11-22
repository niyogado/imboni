import { Request, Response, NextFunction } from 'express';
import { AuthUser } from '../types';
export declare function authorize(...allowedRoles: AuthUser['role'][]): (req: Request, res: Response, next: NextFunction) => void | Response;
export declare function requireRole(role: AuthUser['role']): (req: Request, res: Response, next: NextFunction) => void | Response;
//# sourceMappingURL=rbac.d.ts.map