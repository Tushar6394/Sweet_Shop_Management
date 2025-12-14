import { AuthService } from '../../services/authService';
import { UserModel } from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        password_hash: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue('mock-token');

      const result = await AuthService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('test@example.com');
      expect(result.token).toBe('mock-token');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });

    it('should throw error if user already exists', async () => {
      const existingUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Existing User',
        role: 'user',
        password_hash: 'hash',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(existingUser);

      await expect(
        AuthService.register({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        })
      ).rejects.toThrow('User with this email already exists');
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        password_hash: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mock-token');

      const result = await AuthService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    });

    it('should throw error if user not found', async () => {
      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        AuthService.login({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error if password is incorrect', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        password_hash: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        AuthService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
      ).rejects.toThrow('Invalid email or password');
    });
  });
});

