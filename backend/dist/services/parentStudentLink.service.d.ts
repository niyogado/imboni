import { type ParentStudentLinkWithDetails } from '../repositories/parentStudentLink.repository';
/**
 * Parent–Child Link Service
 * Business rules: a parent may only access students linked to them via an active link.
 * Verification happens on every access, not just at login.
 */
export declare class ParentStudentLinkService {
    link(data: {
        parentId: number;
        studentId: number;
        relationship?: string;
        linkedById: number;
    }): Promise<ParentStudentLinkWithDetails>;
    unlink(linkId: number, actorId: number): Promise<void>;
    /**
     * Verify that a parent is linked to a student via an active link.
     * Returns the link if authorized, throws 403 otherwise.
     * This is the server-side parent–child check enforced on every endpoint.
     */
    verifyParentCanAccessStudent(parentId: number, studentId: number): Promise<ParentStudentLinkWithDetails>;
    getLinkedStudents(parentId: number): Promise<ParentStudentLinkWithDetails[]>;
    getLinkedParents(studentId: number): Promise<ParentStudentLinkWithDetails[]>;
    countActiveGuardians(studentId: number): Promise<number>;
}
export declare const parentStudentLinkService: ParentStudentLinkService;
//# sourceMappingURL=parentStudentLink.service.d.ts.map