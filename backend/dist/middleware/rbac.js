"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
exports.requireRole = requireRole;
function authorize(...allowedRoles) {
    return (req, res, next) => {
        const authReq = req;
        if (!authReq.user) {
            return res.status(401).json({
                error: { code: 'UNAUTHENTICATED', message: 'Authentication required' },
            });
        }
        if (!allowedRoles.includes(authReq.user.role)) {
            return res.status(403).json({
                error: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
            });
        }
        next();
    };
}
function requireRole(role) {
    return authorize(role);
}
//# sourceMappingURL=rbac.js.map