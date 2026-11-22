import { type MarkWithDetails } from '../repositories/mark.repository';
export declare class MarkService {
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
    }, actorId: number): Promise<MarkWithDetails>;
    getById(id: number): Promise<MarkWithDetails | null>;
    listForParent(studentId: number, parentId: number, filters?: {
        status?: string;
        term?: string;
        academicYear?: string;
        subjectId?: number;
    }): Promise<MarkWithDetails[]>;
    listForTeacher(filters?: {
        status?: string;
        studentId?: number;
        subjectId?: number;
        term?: string;
        academicYear?: string;
    }): Promise<MarkWithDetails[]>;
    update(markId: number, data: {
        value?: number;
        maxValue?: number;
        comment?: string;
    }, actorId: number): Promise<MarkWithDetails>;
    submit(markId: number, actorId: number): Promise<MarkWithDetails>;
    publish(markId: number, actorId: number): Promise<MarkWithDetails>;
    getVersions(markId: number): Promise<any[]>;
}
export declare const markService: MarkService;
//# sourceMappingURL=mark.service.d.ts.map