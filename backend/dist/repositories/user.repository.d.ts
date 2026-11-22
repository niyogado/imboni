export interface UserWithRole extends User {
    role: Role;
}
export declare class UserRepository {
    findByEmail(email: string): Promise<UserWithRole | null>;
    findById(id: number): Promise<UserWithRole | null>;
    create(data: {
        email: string;
        phone?: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        roleId: number;
    }): Promise<UserWithRole>;
    updateLastLogin(userId: number): Promise<void>;
    update(id: number, data: Partial<{
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
    }>): Promise<UserWithRole>;
    deactivate(id: number): Promise<UserWithRole>;
    list(): Promise<UserWithRole[]>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=user.repository.d.ts.map