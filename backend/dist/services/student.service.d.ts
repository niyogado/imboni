import { type StudentWithDetails } from '../repositories/student.repository';
export declare class StudentService {
    create(data: {
        studentNumber: string;
        firstName: string;
        lastName: string;
        dateOfBirth?: Date;
        gender?: string;
        classId?: number;
    }, actorId: number): Promise<StudentWithDetails>;
    getById(id: number): Promise<StudentWithDetails | null>;
    list(filters?: {
        classId?: number;
        isActive?: boolean;
    }): Promise<StudentWithDetails[]>;
    update(id: number, data: {
        firstName?: string;
        lastName?: string;
        dateOfBirth?: Date;
        gender?: string;
        classId?: number;
        isActive?: boolean;
    }, actorId: number): Promise<StudentWithDetails>;
}
export declare const studentService: StudentService;
//# sourceMappingURL=student.service.d.ts.map