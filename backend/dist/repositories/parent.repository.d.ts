export interface ParentWithDetails extends Parent {
    user?: User | null;
}
export declare class ParentRepository {
    findById(id: number): Promise<ParentWithDetails | null>;
    findByPhone(phone: string): Promise<Parent | null>;
    findByEmail(email: string): Promise<Parent | null>;
    create(data: {
        firstName: string;
        lastName: string;
        phone: string;
        email?: string;
    }): Promise<Parent>;
    update(id: number, data: Partial<{
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    }>): Promise<Parent>;
    list(): Promise<ParentWithDetails[]>;
}
export declare const parentRepository: ParentRepository;
//# sourceMappingURL=parent.repository.d.ts.map