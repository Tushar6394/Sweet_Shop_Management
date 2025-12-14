import request from 'supertest';
import express from 'express';
import inventoryRoutes from '../../routes/inventoryRoutes';
import { InventoryService } from '../../services/inventoryService';
import { authenticate, requireAdmin } from '../../middleware/auth';

jest.mock('../../services/inventoryService');
jest.mock('../../middleware/auth');

const app = express();
app.use(express.json());
app.use('/api/sweets', inventoryRoutes);

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

describe('Inventory Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/sweets/:id/purchase', () => {
    beforeEach(() => {
      (authenticate as jest.Mock).mockImplementation((req: any, res: any, next: any) => {
        req.user = mockUser;
        next();
      });
    });

    it('should allow authenticated user to purchase a sweet', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 10.99,
        quantity: 45,
      };

      (InventoryService.purchaseSweet as jest.Mock).mockResolvedValue(mockSweet);

      const response = await request(app)
        .post('/api/sweets/1/purchase')
        .send({ quantity: 5 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Purchase successful');
      expect(response.body.sweet.quantity).toBe(45);
    });

    it('should return 400 for invalid quantity', async () => {
      const response = await request(app)
        .post('/api/sweets/1/purchase')
        .send({ quantity: 0 });

      expect(response.status).toBe(400);
    });

    it('should return 400 for insufficient stock', async () => {
      (InventoryService.purchaseSweet as jest.Mock).mockRejectedValue(
        new Error('Insufficient stock')
      );

      const response = await request(app)
        .post('/api/sweets/1/purchase')
        .send({ quantity: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Insufficient stock');
    });

    it('should return 404 if sweet not found', async () => {
      (InventoryService.purchaseSweet as jest.Mock).mockRejectedValue(
        new Error('Sweet not found')
      );

      const response = await request(app)
        .post('/api/sweets/999/purchase')
        .send({ quantity: 5 });

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    beforeEach(() => {
      (authenticate as jest.Mock).mockImplementation((req: any, res: any, next: any) => {
        req.user = mockAdmin;
        next();
      });
      (requireAdmin as jest.Mock).mockImplementation((req: any, res: any, next: any) => {
        next();
      });
    });

    it('should allow admin to restock a sweet', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 10.99,
        quantity: 70,
      };

      (InventoryService.restockSweet as jest.Mock).mockResolvedValue(mockSweet);

      const response = await request(app)
        .post('/api/sweets/1/restock')
        .send({ quantity: 20 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Restock successful');
      expect(response.body.sweet.quantity).toBe(70);
    });

    it('should return 400 for invalid quantity', async () => {
      const response = await request(app)
        .post('/api/sweets/1/restock')
        .send({ quantity: -1 });

      expect(response.status).toBe(400);
    });

    it('should return 404 if sweet not found', async () => {
      (InventoryService.restockSweet as jest.Mock).mockRejectedValue(
        new Error('Sweet not found')
      );

      const response = await request(app)
        .post('/api/sweets/999/restock')
        .send({ quantity: 20 });

      expect(response.status).toBe(404);
    });
  });
});

