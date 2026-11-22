"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_repository_1 = require("../repositories/user.repository");
const role_repository_1 = require("../repositories/role.repository");
const auditLog_repository_1 = require("../repositories/auditLog.repository");
class AuthService {
    async register(data) {
        const saltRounds = config_1.config.bcryptSaltRounds;
        const passwordHash = await bcryptjs_1.default.hash(data.password, saltRounds);
        const role = await role_repository_1.roleRepository.findByName(data.roleName);
        if (!role) {
            const err = new Error('Role not found');
            err.statusCode = 400;
            err.code = 'INVALID_ROLE';
            throw err;
        }
        const existing = await user_repository_1.userRepository.findByEmail(data.email);
        if (existing) {
            const err = new Error('Email already registered');
            err.statusCode = 409;
            err.code = 'EMAIL_EXISTS';
            throw err;
        }
        const user = await user_repository_1.userRepository.create({
            email: data.email,
            phone: data.phone,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            roleId: role.id,
        });
        const token = this.generateToken(user);
        await auditLog_repository_1.auditLogRepository.create({
            userId: user.id,
            action: 'REGISTER',
            entityType: 'User',
            entityId: user.id,
            newValues: { email: user.email, role: role.name },
        });
        return { user, token };
    }
    async login(data) {
        const user = await user_repository_1.userRepository.findByEmail(data.email);
        if (!user) {
            await auditLog_repository_1.auditLogRepository.create({
                action: 'LOGIN_FAILED',
                entityType: 'User',
                newValues: { email: data.email, reason: 'user_not_found' },
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
            });
            const err = new Error('Invalid credentials');
            err.statusCode = 401;
            err.code = 'INVALID_CREDENTIALS';
            throw err;
        }
        if (!user.isActive) {
            const err = new Error('Account deactivated');
            err.statusCode = 403;
            err.code = 'ACCOUNT_INACTIVE';
            throw err;
        }
        const isValid = await bcryptjs_1.default.compare(data.password, user.passwordHash);
        if (!isValid) {
            await auditLog_repository_1.auditLogRepository.create({
                userId: user.id,
                action: 'LOGIN_FAILED',
                entityType: 'User',
                entityId: user.id,
                newValues: { reason: 'invalid_password' },
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
            });
            const err = new Error('Invalid credentials');
            err.statusCode = 401;
            err.code = 'INVALID_CREDENTIALS';
            throw err;
        }
        await user_repository_1.userRepository.updateLastLogin(user.id);
        const token = this.generateToken(user);
        await auditLog_repository_1.auditLogRepository.create({
            userId: user.id,
            action: 'LOGIN',
            entityType: 'User',
            entityId: user.id,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
        });
        return { user, token };
    }
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role.name,
        };
        return jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpiresIn });
    }
    async getProfile(userId) {
        return user_repository_1.userRepository.findById(userId);
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map