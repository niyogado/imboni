export interface MarkWithDetails extends Mark {
    student: {
        id: number;
        studentNumber: string;
        firstName: string;
        lastName: string;
    };
    subject: {
        id: number;
        name: string;
        code: string;
    };
    recordedBy: {
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
export declare class MarkRepository {
    findById(id: number): Promise<MarkWithDetails | null>;
    findByStudent(studentId: number, filters?: {
        status?: string;
        term?: string;
        academicYear?: string;
        subjectId?: number;
    }): Promise<MarkWithDetails[]>;
    create(data: {
        studentId: number;
        subjectId: number;
        value: number;
        maxValue?: number;
        term: string;
        academicYear: string;
        status: string;
        recordedById: number;
        comment?: string;
    }): Promise<Mark>;
    update(id: number, data: Partial<{
        value: number;
        maxValue: number;
        term: string;
        academicYear: string;
        status: string;
        comment: string;
    }>): Promise<Mark>;
    publish(markId: number, publishedAt: Date): Promise<Mark>;
    createVersion(data: {
        markId: number;
        value: number;
        maxValue: number;
        term: string;
        academicYear: string;
        status: string;
        recordedById: number;
        changeReason?: string;
    }): Promise<MarkVersion>;
    incrementVersion(markId: number): Promise<void>;
    list(filters?: {
        status?: string;
        studentId?: number;
        subjectId?: number;
        term?: string;
        academicYear?: string;
    }): Promise<MarkWithDetails[]>;
}
export declare const markRepository: MarkRepository;
//# sourceMappingURL=mark.repository.d.ts.map