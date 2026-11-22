import { mockPrisma } from './setup';
import { authService } from '../src/services/auth.service';
import { userRepository } from '../src/repositories/user.repository';
import { roleRepository } from '../src/repositories/role.repository';
import { auditLogRepository } from '../src/repositories/auditLog.repository';

jest.mock('../src/repositories/user.repository', () => ({
  userRepository: {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateLastLogin: jest.fn(),
  },
}));

jest.mock('../src/repositories/role.repository', () => ({
  roleRepository: {
    findByName: jest.fn(),
  },
}));

jest.mock('../src/repositories/auditLog.repository', () => ({
  auditLogRepository: {
    create: jest.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user and return a token', async () => {
      const role = { id: 1, name: 'PARENT' as const, description: 'Parent/Guardian' };
      mockPrisma.role.findUnique.mockResolvedValue(role);
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: 1,
        email: 'parent@example.com',
        role,
        passwordHash: 'hashed',
        firstName: 'Jane',
        lastName: 'Doe',
      });
      mockPrisma.auditLog.create.mockResolvedValue({});

      const result = await authService.register({
        email: 'parent@example.com',
        password: 'securepass123',
        firstName: 'Jane',
        lastName: 'Doe',
        roleName: 'PARENT',
      });

      expect(mockPrisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'parent@example.com',
          firstName: 'Jane',
          lastName: 'Doe',
          roleId: 1,
        })
      );
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe('parent@example.com');
    });

    it('should reject registration with existing email', async () => {
      mockPrisma.role.findUnique.mockResolvedValue({ id: 1, name: 'PARENT' as const });
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, email: 'parent@example.com' });

      await expect(
        authService.register({
          email: 'parent@example.com',
          password: 'securepass123',
          firstName: 'Jane',
          lastName: 'Doe',
          roleName: 'PARENT',
        })
      ).rejects.toMatchObject({
        statusCode: 409,
        code: 'EMAIL_EXISTS',
      });
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      const user = {
        id: 1,
        email: 'parent@example.com',
        passwordHash: '$2a$12$hashedpassword',
        role: { id: 1, name: 'PARENT' as const },
        isActive: true,
      };
      mockPrisma.user.findUnique.mockResolvedValue(user);
      mockPrisma.auditLog.create.mockResolvedValue({});

      // Mock bcrypt.compare to return true
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await authService.login({
        email: 'parent@example.com',
        password: 'securepass123',
      });

      expect(result.token).toBeDefined();
      expect(result.user.email).toBe('parent@example.com');
      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'LOGIN' })
      );
    });

    it('should reject login with invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.auditLog.create.mockResolvedValue({});

      await expect(
        authService.login({
          email: 'unknown@example.com',
          password: 'wrongpass',
        })
      ).rejects.toMatchObject({
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
      });

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'LOGIN_FAILED' })
      );
    });
  });
});