import { type ParentWithDetails } from '../repositories/parent.repository';
export declare class ParentService {
    create(data: {
        firstName: string;
        lastName: string;
        phone: string;
        email?: string;
    }, actorId: number): Promise<ParentWithDetails>;
    getById(id: number): Promise<ParentWithDetails | null>;
    list(): Promise<ParentWithDetails[]>;
    update(id: number, data: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        email?: string;
    }, actorId: number): Promise<ParentWithDetails>;
}
export declare const parentService: ParentService;
//# sourceMappingURL=parent.service.d.ts.map