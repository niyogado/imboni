"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRepository = exports.RoleRepository = void 0;
const database_1 = require("../config/database");
class RoleRepository {
    async findByName(name) {
        return database_1.prisma.role.findUnique({
            where: { name: name },
        });
    }
    async findById(id) {
        return database_1.prisma.role.findUnique({
            where: { id },
        });
    }
    async list() {
        return database_1.prisma.role.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async create(data) {
        return database_1.prisma.role.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
    }
}
exports.RoleRepository = RoleRepository;
exports.roleRepository = new RoleRepository();
//# sourceMappingURL=role.repository.js.map