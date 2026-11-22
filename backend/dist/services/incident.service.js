"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incidentService = exports.IncidentService = void 0;
const incident_repository_1 = require("../repositories/incident.repository");
const student_repository_1 = require("../repositories/student.repository");
const parentStudentLink_service_1 = require("./parentStudentLink.service");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class IncidentService {
    async create(data, actorId) {
        const student = await student_repository_1.studentRepository.findById(data.studentId);
        if (!student) {
            const err = new Error('Student not found');
            err.statusCode = 404;
            err.code = 'STUDENT_NOT_FOUND';
            throw err;
        }
        const incident = await incident_repository_1.incidentRepository.create({
            studentId: data.studentId,
            title: data.title,
            description: data.description,
            category: data.category,
            date: data.date,
            responsibleStaffId: data.responsibleStaffId,
            status: data.status,
        });
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'CREATE_INCIDENT',
            entityType: 'Incident',
            entityId: incident.id,
            newValues: { studentId: data.studentId, title: data.title, category: data.category, status: data.status },
        });
        return incident_repository_1.incidentRepository.findById(incident.id);
    }
    async getById(id) {
        return incident_repository_1.incidentRepository.findById(id);
    }
    async listForParent(studentId, parentId) {
        // Parent can only see approved incidents of linked children
        await parentStudentLink_service_1.parentStudentLinkService.verifyParentCanAccessStudent(parentId, studentId);
        const incidents = await incident_repository_1.incidentRepository.findByStudent(studentId, {
            status: 'APPROVED',
        });
        return incidents;
    }
    async listForStaff(filters) {
        return incident_repository_1.incidentRepository.list(filters);
    }
    async review(incidentId, actorId) {
        const existing = await incident_repository_1.incidentRepository.findById(incidentId);
        if (!existing) {
            const err = new Error('Incident not found');
            err.statusCode = 404;
            err.code = 'INCIDENT_NOT_FOUND';
            throw err;
        }
        if (existing.status !== 'RECORDED') {
            const err = new Error('Only recorded incidents can be reviewed');
            err.statusCode = 400;
            err.code = 'INVALID_STATUS_TRANSITION';
            throw err;
        }
        await incident_repository_1.incidentRepository.update(incidentId, { status: 'REVIEWED' });
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'REVIEW_INCIDENT',
            entityType: 'Incident',
            entityId: incidentId,
            oldValues: { status: existing.status },
            newValues: { status: 'REVIEWED' },
        });
        return incident_repository_1.incidentRepository.findById(incidentId);
    }
    async approve(incidentId, actorId, decisionReason) {
        const existing = await incident_repository_1.incidentRepository.findById(incidentId);
        if (!existing) {
            const err = new Error('Incident not found');
            err.statusCode = 404;
            err.code = 'INCIDENT_NOT_FOUND';
            throw err;
        }
        const updated = await incident_repository_1.incidentRepository.approve(incidentId, actorId, decisionReason);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'APPROVE_INCIDENT',
            entityType: 'Incident',
            entityId: incidentId,
            oldValues: { status: existing.status },
            newValues: { status: 'APPROVED', decisionReason },
        });
        return incident_repository_1.incidentRepository.findById(incidentId);
    }
    async reject(incidentId, actorId, decisionReason) {
        const existing = await incident_repository_1.incidentRepository.findById(incidentId);
        if (!existing) {
            const err = new Error('Incident not found');
            err.statusCode = 404;
            err.code = 'INCIDENT_NOT_FOUND';
            throw err;
        }
        const updated = await incident_repository_1.incidentRepository.reject(incidentId, actorId, decisionReason);
        await auditLog_repository_1.auditLogRepository.create({
            userId: actorId,
            action: 'REJECT_INCIDENT',
            entityType: 'Incident',
            entityId: incidentId,
            oldValues: { status: existing.status },
            newValues: { status: 'REJECTED', decisionReason },
        });
        return incident_repository_1.incidentRepository.findById(incidentId);
    }
}
exports.IncidentService = IncidentService;
exports.incidentService = new IncidentService();
//# sourceMappingURL=incident.service.js.map