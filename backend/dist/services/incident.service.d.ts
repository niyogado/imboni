import { type IncidentWithDetails } from '../repositories/incident.repository';
export declare class IncidentService {
    create(data: {
        studentId: number;
        title: string;
        description: string;
        category: string;
        date: Date;
        responsibleStaffId: number;
        status: string;
    }, actorId: number): Promise<IncidentWithDetails>;
    getById(id: number): Promise<IncidentWithDetails | null>;
    listForParent(studentId: number, parentId: number): Promise<IncidentWithDetails[]>;
    listForStaff(filters?: {
        status?: string;
        studentId?: number;
        category?: string;
    }): Promise<IncidentWithDetails[]>;
    review(incidentId: number, actorId: number): Promise<IncidentWithDetails>;
    approve(incidentId: number, actorId: number, decisionReason?: string): Promise<IncidentWithDetails>;
    reject(incidentId: number, actorId: number, decisionReason?: string): Promise<IncidentWithDetails>;
}
export declare const incidentService: IncidentService;
//# sourceMappingURL=incident.service.d.ts.map