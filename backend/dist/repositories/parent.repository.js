"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentRepository = exports.ParentRepository = void 0;
const database_1 = require("../config/database");
class ParentRepository {
    async findById(id) {
        return database_1.prisma.parent.findUnique({
            where: { id },
            include: { user: true },
        });
    }
    async findByPhone(phone) {
        return database_1.prisma.parent.findUnique({
            where: { phone },
            include: { user: true },
        });
    }
    async findByEmail(email) {
        return database_1.prisma.parent.findUnique({
            where: { email },
            include: { user: true },
        });
    }
    async create(data) {
        return database_1.prisma.parent.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
            },
        });
    }
    async update(id, data) {
        return database_1.prisma.parent.update({
            where: { id },
            data,
        });
    }
    async list() {
        return database_1.prisma.parent.findMany({
            include: { user: true },
            orderBy: { firstName: 'asc' },
        });
    }
}
exports.ParentRepository = ParentRepository;
exports.parentRepository = new ParentRepository();
//# sourceMappingURL=parent.repository.js.map