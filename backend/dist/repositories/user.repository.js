"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const database_1 = require("../config/database");
class UserRepository {
    async findByEmail(email) {
        return database_1.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    }
    async findById(id) {
        return database_1.prisma.user.findUnique({
            where: { id },
            include: { role: true },
        });
    }
    async create(data) {
        return database_1.prisma.user.create({
            data: {
                email: data.email,
                phone: data.phone,
                passwordHash: data.passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                roleId: data.roleId,
            },
            include: { role: true },
        });
    }
    async updateLastLogin(userId) {
        await database_1.prisma.user.update({
            where: { id: userId },
            data: { lastLoginAt: new Date() },
        });
    }
    async update(id, data) {
        return database_1.prisma.user.update({
            where: { id },
            data,
            include: { role: true },
        });
    }
    async deactivate(id) {
        return database_1.prisma.user.update({
            where: { id },
            data: { isActive: false },
            include: { role: true },
        });
    }
    async list() {
        return database_1.prisma.user.findMany({
            include: { role: true },
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map