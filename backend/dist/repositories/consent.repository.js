"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consentRepository = exports.ConsentRepository = void 0;
const database_1 = require("../config/database");
class ConsentRepository {
    async findByParentAndChannel(parentId, channel) {
        return database_1.prisma.consent.findUnique({
            where: {
                parentId_channel: { parentId, channel: channel },
            },
        });
    }
    async upsert(data) {
        const existing = await this.findByParentAndChannel(data.parentId, data.channel);
        if (existing) {
            return database_1.prisma.consent.update({
                where: { id: existing.id },
                data: { status: data.status },
            });
        }
        return database_1.prisma.consent.create({
            data: {
                parentId: data.parentId,
                channel: data.channel,
                status: data.status,
            },
        });
    }
    async listByParent(parentId) {
        return database_1.prisma.consent.findMany({
            where: { parentId },
        });
    }
}
exports.ConsentRepository = ConsentRepository;
exports.consentRepository = new ConsentRepository();
//# sourceMappingURL=consent.repository.js.map