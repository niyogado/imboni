"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionRequestController = exports.PermissionRequestController = void 0;
const permissionRequest_service_1 = require("../services/permissionRequest.service");
class PermissionRequestController {
    async create(req, res, next) {
        try {
            const authReq = req;
            const { studentId, reason, startDate, expectedReturnDate } = req.body;
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const request = await permissionRequest_service_1.permissionRequestService.create({
                studentId, reason,
                startDate: new Date(startDate),
                expectedReturnDate: new Date(expectedReturnDate),
                requesterId: actorId,
            }, actorId);
            res.status(201).json({ data: request, meta: { action: 'createPermissionRequest' } });
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const request = await permissionRequest_service_1.permissionRequestService.getById(id);
            if (!request) {
                return res.status(404).json({ error: { code: 'PERMISSION_REQUEST_NOT_FOUND', message: 'Permission request not found' } });
            }
            res.json({ data: request, meta: { action: 'getPermissionRequest' } });
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
            const requests = await permissionRequest_service_1.permissionRequestService.listForParent(studentId, parentId);
            res.json({ data: requests, meta: { action: 'listPermissionRequestsForParent' } });
        }
        catch (err) {
            next(err);
        }
    }
    async listPending(req, res, next) {
        try {
            const requests = await permissionRequest_service_1.permissionRequestService.listPending();
            res.json({ data: requests, meta: { action: 'listPendingPermissionRequests' } });
        }
        catch (err) {
            next(err);
        }
    }
    async list(req, res, next) {
        try {
            const { status, studentId } = req.query;
            const requests = await permissionRequest_service_1.permissionRequestService.list({
                status: status,
                studentId: studentId ? parseInt(studentId, 10) : undefined,
            });
            res.json({ data: requests, meta: { action: 'listPermissionRequests' } });
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
            const approved = await permissionRequest_service_1.permissionRequestService.approve(id, actorId, decisionReason);
            res.json({ data: approved, meta: { action: 'approvePermissionRequest' } });
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
            const rejected = await permissionRequest_service_1.permissionRequestService.reject(id, actorId, decisionReason);
            res.json({ data: rejected, meta: { action: 'rejectPermissionRequest' } });
        }
        catch (err) {
            next(err);
        }
    }
    async cancel(req, res, next) {
        try {
            const authReq = req;
            const id = parseInt(req.params.id, 10);
            const actorId = authReq.user?.id;
            if (!actorId) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const cancelled = await permissionRequest_service_1.permissionRequestService.cancel(id, actorId);
            res.json({ data: cancelled, meta: { action: 'cancelPermissionRequest' } });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.PermissionRequestController = PermissionRequestController;
exports.permissionRequestController = new PermissionRequestController();
//# sourceMappingURL=permissionRequest.controller.js.map