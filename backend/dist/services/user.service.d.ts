import { type UserWithRole } from '../repositories/user.repository';
export declare class UserService {
    list(): Promise<UserWithRole[]>;
    getById(id: number): Promise<UserWithRole | null>;
    update(id: number, data: {
        email?: string;
        phone?: string;
        firstName?: string;
        lastName?: string;
        isActive?: boolean;
    }, actorId: number): Promise<UserWithRole>;
    deactivate(id: number, actorId: number): Promise<UserWithRole>;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map