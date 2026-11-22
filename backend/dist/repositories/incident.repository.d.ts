export interface IncidentWithDetails extends Incident {
    student: {
        id: number;
        studentNumber: string;
        firstName: string;
        lastName: string;
    };
    responsibleStaff: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    reviewedBy?: {
        id: number;
        firstName: string;
        lastName: string;
    } | null;
}
export declare class IncidentRepository {
    findById(id: number): Promise<IncidentWithDetails | null>;
    findByStudent(studentId: number, filters?: {
        status?: string;
    }): Promise<IncidentWithDetails[]>;
    create(data: {
        studentId: number;
        title: string;
        description: string;
        category: string;
        date: Date;
        responsibleStaffId: number;
        status: string;
    }): Promise<Incident>;
    update(id: number, data: Partial<{
        title: string;
        description: string;
        category: string;
        date: Date;
        status: string;
        decisionReason: string;
    }>): Promise<Incident>;
    approve(incidentId: number, reviewedById: number, decisionReason?: string): Promise<Incident>;
    reject(incidentId: number, reviewedById: number, decisionReason?: string): Promise<Incident>;
    createVersion(data: {
        incidentId: number;
        title: string;
        description: string;
        category: string;
        date: Date;
        status: string;
        reviewedById?: number;
        reviewedAt?: Date;
        decisionReason?: string;
        changeReason?: string;
    }): Promise<IncidentVersion>;
    incrementVersion(incidentId: number): Promise<void>;
    list(filters?: {
        status?: string;
        studentId?: number;
        category?: string;
    }): Promise<IncidentWithDetails[]>;
}
export declare const incidentRepository: IncidentRepository;
//# sourceMappingURL=incident.repository.d.ts.map