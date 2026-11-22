"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const parent_routes_1 = __importDefault(require("./routes/parent.routes"));
const parentStudentLink_routes_1 = __importDefault(require("./routes/parentStudentLink.routes"));
const mark_routes_1 = __importDefault(require("./routes/mark.routes"));
const incident_routes_1 = __importDefault(require("./routes/incident.routes"));
const permissionRequest_routes_1 = __importDefault(require("./routes/permissionRequest.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const auditLog_routes_1 = __importDefault(require("./routes/auditLog.routes"));
function createApp() {
    const app = (0, express_1.default)();
    // Trust proxy (important behind reverse proxy)
    app.set('trust proxy', 1);
    // Security middleware
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: config_1.config.corsOrigin,
        credentials: true,
    }));
    // Body parsing
    app.use(express_1.default.json({ limit: '10kb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
    // Logging
    app.use((0, morgan_1.default)('combined'));
    // Health check
    app.get('/health', (_req, res) => {
        res.json({ status: 'ok', service: 'imboni-backend', env: config_1.config.nodeEnv });
    });
    // API routes
    app.use('/api/auth', auth_routes_1.default);
    app.use('/api/users', user_routes_1.default);
    app.use('/api/students', student_routes_1.default);
    app.use('/api/parents', parent_routes_1.default);
    app.use('/api/parent-student-links', parentStudentLink_routes_1.default);
    app.use('/api/marks', mark_routes_1.default);
    app.use('/api/incidents', incident_routes_1.default);
    app.use('/api/permission-requests', permissionRequest_routes_1.default);
    app.use('/api/notifications', notification_routes_1.default);
    app.use('/api/audit-logs', auditLog_routes_1.default);
    // 404 handler
    app.use(errorHandler_1.notFound);
    // Error handler (must be last)
    app.use(errorHandler_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map