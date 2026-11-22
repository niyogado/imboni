"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const app_1 = require("./app");
const config_1 = require("./config");
const database_1 = require("./config/database");
(0, config_1.validateConfig)();
const app = (0, app_1.createApp)();
exports.app = app;
const server = app.listen(config_1.config.port, () => {
    console.log(`iMBONi backend running on ${config_1.config.baseUrl} (${config_1.config.nodeEnv})`);
});
exports.server = server;
// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('HTTP server closed');
    });
    await database_1.prisma.$disconnect();
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('HTTP server closed');
    });
    await database_1.prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=server.js.map