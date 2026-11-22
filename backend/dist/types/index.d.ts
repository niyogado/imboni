export type RoleName = 'PARENT' | 'TEACHER' | 'DISCIPLINE_STAFF' | 'HEADMASTER' | 'ADMINISTRATOR';
export type MarkStatus = 'DRAFT' | 'SUBMITTED' | 'PUBLISHED';
export type IncidentStatus = 'RECORDED' | 'REVIEWED' | 'APPROVED' | 'REJECTED';
export type PermissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type NotificationChannel = 'WHATSAPP' | 'SMS' | 'IN_APP';
export type NotificationStatus = 'QUEUED' | 'SENT' | 'DELIVERED' | 'FAILED';
export type ConsentStatus = 'OPTED_IN' | 'OPTED_OUT';
export interface AuthUser {
    id: number;
    email: string;
    phone?: string;
    role: RoleName;
    firstName: string;
    lastName: string;
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface ApiError extends Error {
    statusCode?: number;
    code?: string;
    details?: any;
}
export type RoleNameType = RoleName;
export type MarkStatusType = MarkStatus;
export type IncidentStatusType = IncidentStatus;
export type PermissionStatusType = PermissionStatus;
export type NotificationChannelType = NotificationChannel;
export type NotificationStatusType = NotificationStatus;
export type ConsentStatusType = ConsentStatus;
//# sourceMappingURL=index.d.ts.map