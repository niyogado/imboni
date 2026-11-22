export interface PermissionRequestWithDetails extends PermissionRequest {
    student: {
        id: number;
        studentNumber: string;
        firstName: string;
        lastName: string;
    };
    requester: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    decidedBy?: {
        id: number;
        firstName: string;
        lastName: string;
    } | null;
}
export declare class PermissionRequestRepository {
    findById(id: number): Promise<PermissionRequestWithDetails | null>;
    findByStudent(studentId: number): Promise<PermissionRequestWithDetails[]>;
    findByStatus(status: string): Promise<PermissionRequestWithDetails[]>;
    create(data: {
        studentId: number;
        reason: string;
        startDate: Date;
        expectedReturnDate: Date;
        requesterId: number;
        status: string;
    }): Promise<PermissionRequest>;
    updateStatus(id: number, status: string, decidedById: number, decisionReason?: string): Promise<PermissionRequest>;
    cancel(id: number): Promise<PermissionRequest>;
    list(filters?: {
        status?: string;
        studentId?: number;
    }): Promise<PermissionRequestWithDetails[]>;
}
export declare const permissionRequestRepository: PermissionRequestRepository;
//# sourceMappingURL=permissionRequest.repository.d.ts.map