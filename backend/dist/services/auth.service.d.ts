import { type UserWithRole } from '../repositories/user.repository';
export declare class AuthService {
    register(data: {
        email: string;
        phone?: string;
        password: string;
        firstName: string;
        lastName: string;
        roleName: string;
    }): Promise<{
        user: UserWithRole;
        token: string;
    }>;
    login(data: {
        email: string;
        password: string;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        user: UserWithRole;
        token: string;
    }>;
    private generateToken;
    getProfile(userId: number): Promise<UserWithRole | null>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map