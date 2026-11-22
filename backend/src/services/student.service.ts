import { studentRepository, type StudentWithDetails } from '../repositories/student.repository';
import { auditLogRepository } from '../repositories/auditLog.repository';

export class StudentService {
  async create(data: {
    studentNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    gender?: string;
    classId?: number;
  }, actorId: number): Promise<StudentWithDetails> {
    const existing = await studentRepository.findByStudentNumber(data.studentNumber);
    if (existing) {
      const err: any = new Error('Student number already exists');
      err.statusCode = 409;
      err.code = 'STUDENT_EXISTS';
      throw err;
    }

    const student = await studentRepository.create(data);

    await auditLogRepository.create({
      userId: actorId,
      action: 'CREATE_STUDENT',
      entityType: 'Student',
      entityId: student.id,
      newValues: { studentNumber: student.studentNumber, firstName: student.firstName, lastName: student.lastName },
    });

    return student as StudentWithDetails;
  }

  async getById(id: number): Promise<StudentWithDetails | null> {
    return studentRepository.findById(id);
  }

  async list(filters?: { classId?: number; isActive?: boolean }): Promise<StudentWithDetails[]> {
    return studentRepository.list(filters) as Promise<StudentWithDetails[]>;
  }

  async update(id: number, data: { firstName?: string; lastName?: string; dateOfBirth?: Date; gender?: string; classId?: number; isActive?: boolean }, actorId: number): Promise<StudentWithDetails> {
    const existing = await studentRepository.findById(id);
    if (!existing) {
      const err: any = new Error('Student not found');
      err.statusCode = 404;
      err.code = 'STUDENT_NOT_FOUND';
      throw err;
    }

    const oldValues = { ...existing };
    const updated = await studentRepository.update(id, data);

    await auditLogRepository.create({
      userId: actorId,
      action: 'UPDATE_STUDENT',
      entityType: 'Student',
      entityId: id,
      oldValues,
      newValues: { ...updated },
    });

    return updated as StudentWithDetails;
  }
}

export const studentService = new StudentService();