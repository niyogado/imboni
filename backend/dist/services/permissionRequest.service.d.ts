import { type PermissionRequestWithDetails } from '../repositories/permissionRequest.repository';
export declare class PermissionRequestService {
    create(data: {
        studentId: number;
        reason: string;
        startDate: Date;
        expectedReturnDate: Date;
        requesterId: number;
    }, actorId: number): Promise<PermissionRequestWithDetails>;
    getById(id: number): Promise<PermissionRequestWithDetails | null>;
    listForParent(studentId: number, parentId: number): Promise<PermissionRequestWithDetails[]>;
    listPending(): Promise<PermissionRequestWithDetails[]>;
    list(filters?: {
        status?: string;
        studentId?: number;
    }): Promise<PermissionRequestWithDetails[]>;
    approve(id: number, actorId: number, decisionReason?: string): Promise<PermissionRequestWithDetails>;
    reject(id: number, actorId: number, decisionReason?: string): Promise<PermissionRequestWithDetails>;
    cancel(id: number, actorId: number): Promise<PermissionRequestWithDetails>;
}
export declare const permissionRequestService: PermissionRequestService;
//# sourceMappingURL=permissionRequest.service.d.ts.map