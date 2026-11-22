"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuthenticate = optionalAuthenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function authenticate(req, res, next) {
    const authReq = req;
    const authHeader = authReq.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: { code: 'UNAUTHENTICATED', message: 'Authentication required' },
        });
    }
    const token = authHeader.substring(7);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        authReq.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            firstName: '',
            lastName: '',
        };
        next();
    }
    catch {
        return res.status(401).json({
            error: { code: 'TOKEN_INVALID', message: 'Invalid or expired token' },
        });
    }
}
function optionalAuthenticate(req, res, next) {
    const authReq = req;
    const authHeader = authReq.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next();
        return;
    }
    const token = authHeader.substring(7);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        authReq.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            firstName: '',
            lastName: '',
        };
    }
    catch {
        // No user set, continue as unauthenticated
    }
    next();
}
//# sourceMappingURL=auth.js.map