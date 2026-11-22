"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async register(req, res, next) {
        try {
            const { email, phone, password, firstName, lastName, roleName } = req.body;
            const { user, token } = await auth_service_1.authService.register({
                email,
                phone,
                password,
                firstName,
                lastName,
                roleName,
            });
            res.status(201).json({
                data: { user: { id: user.id, email: user.email, role: user.role.name }, token },
                meta: { action: 'register' },
            });
        }
        catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user, token } = await auth_service_1.authService.login({
                email,
                password,
                ipAddress: req.ip,
                userAgent: req.get('User-Agent'),
            });
            res.json({
                data: { user: { id: user.id, email: user.email, role: user.role.name }, token },
                meta: { action: 'login' },
            });
        }
        catch (err) {
            next(err);
        }
    }
    async getProfile(req, res, next) {
        try {
            const authReq = req;
            if (!authReq.user) {
                return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
            }
            const user = await auth_service_1.authService.getProfile(authReq.user.id);
            if (!user) {
                return res.status(404).json({ error: { code: 'USER_NOT_FOUND', message: 'User not found' } });
            }
            res.json({
                data: { user: { id: user.id, email: user.email, role: user.role.name, firstName: user.firstName, lastName: user.lastName } },
                meta: { action: 'getProfile' },
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map