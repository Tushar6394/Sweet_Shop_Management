import { UserModel, User } from '../../models/User';
import pool from '../../config/database';

describe('UserModel', () => {
  beforeEach(async () => {
    // Clean up test data
    await pool.query('DELETE FROM users WHERE email LIKE $1', ['test%@example.com']);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password_hash: 'hashedpassword',
        name: 'Test User',
      };

      const user = await UserModel.create(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      expect(user.role).toBe('user');
    });

    it('should create an admin user when role is specified', async () => {
      const userData = {
        email: 'admin@example.com',
        password_hash: 'hashedpassword',
        name: 'Admin User',
        role: 'admin' as const,
      };

      const user = await UserModel.create(userData);

      expect(user.role).toBe('admin');
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const userData = {
        email: 'findme@example.com',
        password_hash: 'hashedpassword',
        name: 'Find Me',
      };

      await UserModel.create(userData);
      const user = await UserModel.findByEmail(userData.email);

      expect(user).toBeDefined();
      expect(user?.email).toBe(userData.email);
    });

    it('should return null if user not found', async () => {
      const user = await UserModel.findByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const userData = {
        email: 'findbyid@example.com',
        password_hash: 'hashedpassword',
        name: 'Find By Id',
      };

      const createdUser = await UserModel.create(userData);
      const user = await UserModel.findById(createdUser.id);

      expect(user).toBeDefined();
      expect(user?.id).toBe(createdUser.id);
    });

    it('should return null if user not found', async () => {
      const user = await UserModel.findById(99999);
      expect(user).toBeNull();
    });
  });
});

