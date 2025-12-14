import request from 'supertest';
import express from 'express';
import sweetRoutes from '../../routes/sweetRoutes';
import { SweetService } from '../../services/sweetService';
import { authenticate, requireAdmin } from '../../middleware/auth';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/User';

jest.mock('../../services/sweetService');
jest.mock('../../middleware/auth');
jest.mock('../../models/User');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/sweets', sweetRoutes);

const mockUser = {
  id: 1,
  email: 'test@example.com',
  role: 'user',
};

const mockAdmin = {
  id: 2,
  email: 'admin@example.com',
  role: 'admin',
};

describe('Sweet Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (authenticate as jest.Mock).mockImplementation((req: any, res: any, next: any) => {
      req.user = mockUser;
      next();
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets', async () => {
      const mockSweets = [
        { id: 1, name: 'Chocolate Bar', category: 'Chocolate', price: 10.99, quantity: 50 },
        { id: 2, name: 'Gummy Bears', category: 'Candy', price: 5.99, quantity: 30 },
      ];

      (SweetService.getAllSweets as jest.Mock).mockResolvedValue(mockSweets);

      const response = await request(app).get('/api/sweets');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /api/sweets/search', () => {
    it('should search sweets by name', async () => {
      const mockSweets = [
        { id: 1, name: 'Chocolate Bar', category: 'Chocolate', price: 10.99, quantity: 50 },
      ];

      (SweetService.searchSweets as jest.Mock).mockResolvedValue(mockSweets);

      const response = await request(app)
        .get('/api/sweets/search')
        .query({ name: 'Chocolate' });

      expect(response.status).toBe(200);
      expect(SweetService.searchSweets).toHaveBeenCalledWith({ name: 'Chocolate' });
    });
  });

  describe('POST /api/sweets', () => {
    beforeEach(() => {
      (requireAdmin as jest.Mock).mockImplementation((req: any, res: any, next: any) => {
        req.user = mockAdmin;
        next();
      });
    });

    it('should create a new sweet (admin only)', async () => {
      const mockSweet = {
        id: 1,
        name: 'New Sweet',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      };

      (SweetService.createSweet as jest.Mock).mockResolvedValue(mockSweet);

      const response = await request(app)
        .post('/api/sweets')
        .send({
          name: 'New Sweet',
          category: 'Chocolate',
          price: 10.99,
          quantity: 50,
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New Sweet');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .send({
          name: '',
          category: 'Chocolate',
          price: -10,
          quantity: 50,
        });

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    beforeEach(() => {
      (requireAdmin as jest.Mock).mockImplementation((req: any, res: any, next: any) => {
        req.user = mockAdmin;
        next();
      });
    });

    it('should update a sweet (admin only)', async () => {
      const mockSweet = {
        id: 1,
        name: 'Updated Sweet',
        category: 'Chocolate',
        price: 15.99,
        quantity: 50,
      };

      (SweetService.updateSweet as jest.Mock).mockResolvedValue(mockSweet);

      const response = await request(app)
        .put('/api/sweets/1')
        .send({
          name: 'Updated Sweet',
          price: 15.99,
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Sweet');
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    beforeEach(() => {
      (requireAdmin as jest.Mock).mockImplementation((req: any, res: any, next: any) => {
        req.user = mockAdmin;
        next();
      });
    });

    it('should delete a sweet (admin only)', async () => {
      (SweetService.deleteSweet as jest.Mock).mockResolvedValue({
        message: 'Sweet deleted successfully',
      });

      const response = await request(app).delete('/api/sweets/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Sweet deleted successfully');
    });
  });
});

