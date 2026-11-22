import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../types';
export declare function errorHandler(err: ApiError, _req: Request, res: Response, _next: NextFunction): Response;
export declare function notFound(_req: Request, res: Response): Response;
//# sourceMappingURL=errorHandler.d.ts.map