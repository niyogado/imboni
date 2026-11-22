import { mockPrisma } from './setup';
import { parentStudentLinkService } from '../src/services/parentStudentLink.service';
import { parentStudentLinkRepository } from '../src/repositories/parentStudentLink.repository';
import { auditLogRepository } from '../src/repositories/auditLog.repository';

jest.mock('../src/repositories/parentStudentLink.repository', () => ({
  parentStudentLinkRepository: {
    findActiveLink: jest.fn(),
    findLinksByParent: jest.fn(),
    findLinksByStudent: jest.fn(),
    create: jest.fn(),
    deactivate: jest.fn(),
    findById: jest.fn(),
    countActiveLinksForStudent: jest.fn(),
  },
}));

jest.mock('../src/repositories/auditLog.repository', () => ({
  auditLogRepository: {
    create: jest.fn(),
  },
}));

describe('ParentStudentLinkService — Parent-Child Access Control', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyParentCanAccessStudent — positive case', () => {
    it('should allow access when parent is actively linked to student', async () => {
      const mockLink = {
        id: 1,
        parentId: 1,
        studentId: 10,
        isActive: true,
        relationship: 'father',
      };

      (parentStudentLinkRepository.findActiveLink as jest.Mock).mockResolvedValue(mockLink);
      (auditLogRepository.create as jest.Mock).mockResolvedValue({});

      const result = await parentStudentLinkService.verifyParentCanAccessStudent(1, 10);

      expect(parentStudentLinkRepository.findActiveLink).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(mockLink);
    });
  });

  describe('verifyParentCanAccessStudent — negative case (IDOR)', () => {
    it('should deny access when parent is NOT linked to student (IDOR attempt)', async () => {
      (parentStudentLinkRepository.findActiveLink as jest.Mock).mockResolvedValue(null);
      (auditLogRepository.create as jest.Mock).mockResolvedValue({});

      await expect(
        parentStudentLinkService.verifyParentCanAccessStudent(1, 99)
      ).rejects.toMatchObject({
        statusCode: 403,
        code: 'PARENT_NOT_LINKED',
      });

      expect(parentStudentLinkRepository.findActiveLink).toHaveBeenCalledWith(1, 99);

      expect(auditLogRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'IDOR_ATTEMPT',
          entityType: 'ParentStudentLink',
          newValues: expect.objectContaining({
            parentId: 1,
            studentId: 99,
            reason: 'parent_not_linked_to_student',
          }),
        })
      );
    });

    it('should deny access when parent A tries to see parent B\'s child', async () => {
      (parentStudentLinkRepository.findActiveLink as jest.Mock).mockResolvedValue(null);
      (auditLogRepository.create as jest.Mock).mockResolvedValue({});

      await expect(
        parentStudentLinkService.verifyParentCanAccessStudent(1, 20)
      ).rejects.toMatchObject({
        statusCode: 403,
        code: 'PARENT_NOT_LINKED',
      });

      expect(auditLogRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'IDOR_ATTEMPT',
          newValues: expect.objectContaining({
            parentId: 1,
            studentId: 20,
          }),
        })
      );
    });
  });

  describe('create link', () => {
    it('should create an active link between parent and student', async () => {
      mockPrisma.parent.findUnique.mockResolvedValue({ id: 1, firstName: 'John', lastName: 'Doe', phone: '+1234567890' });
      mockPrisma.student.findUnique.mockResolvedValue({ id: 10, studentNumber: 'S001', firstName: 'Alice', lastName: 'Doe' });
      mockPrisma.parentStudentLink.findFirst.mockResolvedValue(null);
      mockPrisma.parentStudentLink.create.mockResolvedValue({
        id: 1, parentId: 1, studentId: 10, isActive: true, relationship: 'father',
      });
      mockPrisma.auditLog.create.mockResolvedValue({});

      const result = await parentStudentLinkService.link({
        parentId: 1,
        studentId: 10,
        relationship: 'father',
        linkedById: 5,
      });

      expect(mockPrisma.parentStudentLink.create).toHaveBeenCalledWith({
        parentId: 1,
        studentId: 10,
        relationship: 'father',
        linkedById: 5,
      });
      expect(result.isActive).toBe(true);
    });

    it('should reject duplicate active link', async () => {
      mockPrisma.parent.findUnique.mockResolvedValue({ id: 1, firstName: 'John', lastName: 'Doe', phone: '+1234567890' });
      mockPrisma.student.findUnique.mockResolvedValue({ id: 10, studentNumber: 'S001', firstName: 'Alice', lastName: 'Doe' });
      mockPrisma.parentStudentLink.findFirst.mockResolvedValue({
        id: 1, parentId: 1, studentId: 10, isActive: true,
      });

      await expect(
        parentStudentLinkService.link({ parentId: 1, studentId: 10, linkedById: 5 })
      ).rejects.toMatchObject({
        statusCode: 409,
        code: 'LINK_EXISTS',
      });
    });
  });
});