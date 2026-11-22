"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incidentController = exports.IncidentController = void 0;
const incident_service_1 = require("../services/incident.service");
class IncidentController {
    async create(req, res, next) {
        try {
            const authReq = req;
            const { studentId, title, description, category, date, responsibleStaffId, status } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const incident = await incident_service_1.incidentService.create({
                studentId, title, description, category,
                date: new Date(date), responsibleStaffId,
                status: status || 'RECORDED',
            }, actorId);
            res.status(201).json({ data: incident, meta: { action: 'createIncident' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const incident = await incident_service_1.incidentService.getById(id);
            if (!incident) {
                return res.status(404).json({ error: { code: 'INCIDENT_NOT_FOUND', message: 'Incident not found' } });
            }
            res.json({ data: incident, meta: { action: 'getIncident' } });
        }
        catch (err) {
            next(err);
        }
    }
    async listForParent(req, res, next) {
        try {
            const authReq = req;
            const studentId = parseInt(req.params.studentId, 10);
            const parentId = parseInt(req.query.parentId, 10);
            if (!parentId) {
                return res.status(422).json({ error: { code: 'MISSING_PARAM', message: 'parentId is required' } });
            }
            const incidents = await incident_service_1.incidentService.listForParent(studentId, parentId);
            res.json({ data: incidents, meta: { action: 'listIncidentsForParent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async listForStaff(req, res, next) {
        try {
            const { status, studentId, category } = req.query;
            const incidents = await incident_service_1.incidentService.listForStaff({
                status: status,
                studentId: studentId ? parseInt(studentId, 10) : undefined,
                category: category,
            });
            res.json({ data: incidents, meta: { action: 'listIncidentsForStaff' } });
        }
        catch (err) {
            next(err);
        }
    }
    async review(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const reviewed = await incident_service_1.incidentService.review(id, actorId);
            res.json({ data: reviewed, meta: { action: 'reviewIncident' } });
        }
        catch (err) {
            next(err);
        }
    }
    async approve(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const { decisionReason } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const approved = await incident_service_1.incidentService.approve(id, actorId, decisionReason);
            res.json({ data: approved, meta: { action: 'approveIncident' } });
        }
        catch (err) {
            next(err);
        }
    }
    async reject(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const { decisionReason } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const rejected = await incident_service_1.incidentService.reject(id, actorId, decisionReason);
            res.json({ data: rejected, meta: { action: 'rejectIncident' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.IncidentController = IncidentController;
exports.incidentController = new IncidentController();
//# sourceMappingURL=incident.controller.js.map