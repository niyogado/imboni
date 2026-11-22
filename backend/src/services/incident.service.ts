import { incidentRepository, type IncidentWithDetails } from '../repositories/incident.repository';
import { studentRepository } from '../repositories/student.repository';
import { parentStudentLinkService } from './parentStudentLink.service';
import { auditLogRepository } from '../repositories/auditLog.repository';

export class IncidentService {
  async create(data: {
    studentId: number;
    title: string;
    description: string;
    category: string;
    date: Date;
    responsibleStaffId: number;
    status: string;
  }, actorId: number): Promise<IncidentWithDetails> {
    const student = await studentRepository.findById(data.studentId);
    if (!student) {
      const err: any = new Error('Student not found');
      err.statusCode = 404;
      err.code = 'STUDENT_NOT_FOUND';
      throw err;
    }

    const incident = await incidentRepository.create({
      studentId: data.studentId,
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.date,
      responsibleStaffId: data.responsibleStaffId,
      status: data.status,
    });

    await auditLogRepository.create({
      userId: actorId,
      action: 'CREATE_INCIDENT',
      entityType: 'Incident',
      entityId: incident.id,
      newValues: { studentId: data.studentId, title: data.title, category: data.category, status: data.status },
    });

    return incidentRepository.findById(incident.id) as Promise<IncidentWithDetails>;
  }

  async getById(id: number): Promise<IncidentWithDetails | null> {
    return incidentRepository.findById(id);
  }

  async listForParent(studentId: number, parentId: number): Promise<IncidentWithDetails[]> {
    // Parent can only see approved incidents of linked children
    await parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);

    const incidents = await incidentRepository.findByStudent(studentId, {
      status: 'APPROVED',
    });

    return incidents;
  }

  async listForStaff(filters?: { status?: string; studentId?: number; category?: string }): Promise<IncidentWithDetails[]> {
    return incidentRepository.list(filters);
  }

  async review(incidentId: number, actorId: number): Promise<IncidentWithDetails> {
    const existing = await incidentRepository.findById(incidentId);
    if (!existing) {
      const err: any = new Error('Incident not found');
      err.statusCode = 404;
      err.code = 'INCIDENT_NOT_FOUND';
      throw err;
    }

    if (existing.status !== 'RECORDED') {
      const err: any = new Error('Only recorded incidents can be reviewed');
      err.statusCode = 400;
      err.code = 'INVALID_STATUS_TRANSITION';
      throw err;
    }

    await incidentRepository.update(incidentId, { status: 'REVIEWED' });

    await auditLogRepository.create({
      userId: actorId,
      action: 'REVIEW_INCIDENT',
      entityType: 'Incident',
      entityId: incidentId,
      oldValues: { status: existing.status },
      newValues: { status: 'REVIEWED' },
    });

    return incidentRepository.findById(incidentId) as Promise<IncidentWithDetails>;
  }

  async approve(incidentId: number, actorId: number, decisionReason?: string): Promise<IncidentWithDetails> {
    const existing = await incidentRepository.findById(incidentId);
    if (!existing) {
      const err: any = new Error('Incident not found');
      err.statusCode = 404;
      err.code = 'INCIDENT_NOT_FOUND';
      throw err;
    }

    const updated = await incidentRepository.approve(incidentId, actorId, decisionReason);

    await auditLogRepository.create({
      userId: actorId,
      action: 'APPROVE_INCIDENT',
      entityType: 'Incident',
      entityId: incidentId,
      oldValues: { status: existing.status },
      newValues: { status: 'APPROVED', decisionReason },
    });

    return incidentRepository.findById(incidentId) as Promise<IncidentWithDetails>;
  }

  async reject(incidentId: number, actorId: number, decisionReason?: string): Promise<IncidentWithDetails> {
    const existing = await incidentRepository.findById(incidentId);
    if (!existing) {
      const err: any = new Error('Incident not found');
      err.statusCode = 404;
      err.code = 'INCIDENT_NOT_FOUND';
      throw err;
    }

    const updated = await incidentRepository.reject(incidentId, actorId, decisionReason);

    await auditLogRepository.create({
      userId: actorId,
      action: 'REJECT_INCIDENT',
      entityType: 'Incident',
      entityId: incidentId,
      oldValues: { status: existing.status },
      newValues: { status: 'REJECTED', decisionReason },
    });

    return incidentRepository.findById(incidentId) as Promise<IncidentWithDetails>;
  }
}

export const incidentService = new IncidentService();