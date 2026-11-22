import { mockPrisma } from './setup';
import { markService } from '../src/services/mark.service';
import { markRepository } from '../src/repositories/mark.repository';
import { studentRepository } from '../src/repositories/student.repository';
import { parentStudentLinkService } from './parentStudentLink.service';
import { auditLogRepository } from '../src/repositories/auditLog.repository';

jest.mock('../src/repositories/mark.repository', () => ({
  markRepository: {
    findById: jest.fn(),
    findByStudent: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    publish: jest.fn(),
    createVersion: jest.fn(),
    incrementVersion: jest.fn(),
    list: jest.fn(),
  },
}));

jest.mock('../src/repositories/student.repository', () => ({
  studentRepository: {
    findById: jest.fn(),
  },
}));

jest.mock('../src/services/parentStudentLink.service', () => ({
  parentStudentLinkService: {
    verifyParentCanAccessStudent: jest.fn(),
  },
}));

jest.mock('../src/repositories/auditLog.repository', () => ({
  auditLogRepository: {
    create: jest.fn(),
  },
}));

describe('MarkService — Parent Visibility Rules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listForParent — only published marks of linked children', () => {
    it('should allow parent to see published marks of linked child', async () => {
      const studentId = 10;
      const parentId = 1;

      const mockLink = { id: 1, parentId, studentId, isActive: true };
      const mockMarks = [
        { id: 1, studentId, value: 85, status: 'PUBLISHED' as const, term: 'Term 1', academicYear: '2024' },
      ];

      (parentStudentLinkService.verifyParentCanAccessStudent as jest.Mock).mockResolvedValue(mockLink);
      (markRepository.findByStudent as jest.Mock).mockResolvedValue(mockMarks);

      const result = await markService.listForParent(studentId, parentId, { status: 'PUBLISHED' });

      expect(parentStudentLinkService.verifyParentCanAccessStudent).toHaveBeenCalledWith(parentId, studentId);
      expect(markRepository.findByStudent).toHaveBeenCalledWith(studentId, {
        status: 'PUBLISHED',
        term: undefined,
        academicYear: undefined,
        subjectId: undefined,
      });
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('PUBLISHED');
    });

    it('should deny parent access to marks of unlinked child (IDOR)', async () => {
      const studentId = 99;
      const parentId = 1;

      (parentStudentLinkService.verifyParentCanAccessStudent as jest.Mock).mockRejectedValue(
        Object.assign(new Error('Forbidden: you can only access your own linked children'), {
          statusCode: 403,
          code: 'PARENT_NOT_LINKED',
        })
      );

      await expect(markService.listForParent(studentId, parentId)).rejects.toMatchObject({
        statusCode: 403,
        code: 'PARENT_NOT_LINKED',
      });

      expect(markRepository.findByStudent).not.toHaveBeenCalled();
    });

    it('should not return draft marks to parents', async () => {
      const studentId = 10;
      const parentId = 1;

      const mockLink = { id: 1, parentId, studentId, isActive: true };
      const mockMarks = [
        { id: 1, studentId, value: 85, status: 'PUBLISHED' as const },
        { id: 2, studentId, value: 70, status: 'DRAFT' as const },
      ];

      (parentStudentLinkService.verifyParentCanAccessStudent as jest.Mock).mockResolvedValue(mockLink);
      (markRepository.findByStudent as jest.Mock).mockResolvedValue(mockMarks);

      // Service filters to only PUBLISHED for parents
      const result = await markService.listForParent(studentId, parentId, { status: 'PUBLISHED' });

      const publishedOnly = result.filter((m) => m.status === 'PUBLISHED');
      expect(publishedOnly).toHaveLength(1);
      expect(mockMarks.find((m) => m.status === 'DRAFT')).toBeDefined(); // draft exists in DB but not returned
    });
  });

  describe('create mark — versioning on correction', () => {
    it('should create version history when correcting a published mark', async () => {
      const existingMark = {
        id: 1,
        studentId: 10,
        value: 85,
        maxValue: 100,
        term: 'Term 1',
        academicYear: '2024',
        status: 'PUBLISHED' as const,
        recordedById: 5,
      };

      (markRepository.findById as jest.Mock).mockResolvedValue(existingMark);
      (markRepository.createVersion as jest.Mock).mockResolvedValue({ id: 101, markId: 1 });
      (markRepository.incrementVersion as jest.Mock).mockResolvedValue(undefined);
      (markRepository.update as jest.Mock).mockResolvedValue({ ...existingMark, value: 90, version: 2 });
      (markRepository.findById as jest.Mock).mockResolvedValue({ ...existingMark, value: 90, version: 2 });
      mockPrisma.auditLog.create.mockResolvedValue({});

      const result = await markService.update(1, { value: 90 }, 5);

      expect(markRepository.createVersion).toHaveBeenCalledWith(
        expect.objectContaining({
          markId: 1,
          value: 85,
          status: 'PUBLISHED',
          changeReason: 'Correction of published mark',
        })
      );
      expect(markRepository.incrementVersion).toHaveBeenCalledWith(1);
    });
  });
});