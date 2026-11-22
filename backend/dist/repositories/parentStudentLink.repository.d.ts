export interface ParentStudentLinkWithDetails extends ParentStudentLink {
    parent: Parent;
    student: Student;
}
export declare class ParentStudentLinkRepository {
    findById(id: number): Promise<ParentStudentLinkWithDetails | null>;
    findActiveLink(parentId: number, studentId: number): Promise<ParentStudentLinkWithDetails | null>;
    findLinksByParent(parentId: number): Promise<ParentStudentLinkWithDetails[]>;
    findLinksByStudent(studentId: number): Promise<ParentStudentLinkWithDetails[]>;
    create(data: {
        parentId: number;
        studentId: number;
        relationship?: string;
        linkedById?: number;
    }): Promise<ParentStudentLink>;
    deactivate(id: number): Promise<ParentStudentLink>;
    countActiveLinksForStudent(studentId: number): Promise<number>;
}
export declare const parentStudentLinkRepository: ParentStudentLinkRepository;
//# sourceMappingURL=parentStudentLink.repository.d.ts.map