export interface StudentWithDetails extends Student {
    class?: {
        id: number;
        name: string;
        level?: string;
    } | null;
    user?: User | null;
}
export declare class StudentRepository {
    findById(id: number): Promise<StudentWithDetails | null>;
    findByStudentNumber(studentNumber: string): Promise<Student | null>;
    create(data: {
        studentNumber: string;
        firstName: string;
        lastName: string;
        dateOfBirth?: Date;
        gender?: string;
        classId?: number;
    }): Promise<Student>;
    update(id: number, data: Partial<{
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        gender: string;
        classId: number;
        isActive: boolean;
    }>): Promise<Student>;
    list(filters?: {
        classId?: number;
        isActive?: boolean;
    }): Promise<Student[]>;
}
export declare const studentRepository: StudentRepository;
//# sourceMappingURL=student.repository.d.ts.map