export declare class RoleRepository {
    findByName(name: string): Promise<Role | null>;
    findById(id: number): Promise<Role | null>;
    list(): Promise<Role[]>;
    create(data: {
        name: string;
        description?: string;
    }): Promise<Role>;
}
export declare const roleRepository: RoleRepository;
//# sourceMappingURL=role.repository.d.ts.map