import { SweetModel, Sweet } from '../../models/Sweet';
import pool from '../../config/database';

describe('SweetModel', () => {
  let testSweetId: number;

  beforeEach(async () => {
    // Clean up test data
    await pool.query('DELETE FROM sweets WHERE name LIKE $1', ['Test Sweet%']);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('create', () => {
    it('should create a new sweet', async () => {
      const sweetData = {
        name: 'Test Sweet',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
        description: 'A delicious test sweet',
      };

      const sweet = await SweetModel.create(sweetData);
      testSweetId = sweet.id;

      expect(sweet).toBeDefined();
      expect(sweet.name).toBe(sweetData.name);
      expect(sweet.category).toBe(sweetData.category);
      expect(sweet.price).toBe(sweetData.price.toString());
      expect(sweet.quantity).toBe(sweetData.quantity);
    });
  });

  describe('findAll', () => {
    it('should return all sweets', async () => {
      await SweetModel.create({
        name: 'Test Sweet 1',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      });

      await SweetModel.create({
        name: 'Test Sweet 2',
        category: 'Candy',
        price: 5.99,
        quantity: 30,
      });

      const sweets = await SweetModel.findAll();

      expect(sweets.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('findById', () => {
    it('should find a sweet by id', async () => {
      const sweetData = {
        name: 'Find Me Sweet',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      };

      const createdSweet = await SweetModel.create(sweetData);
      const sweet = await SweetModel.findById(createdSweet.id);

      expect(sweet).toBeDefined();
      expect(sweet?.id).toBe(createdSweet.id);
      expect(sweet?.name).toBe(sweetData.name);
    });

    it('should return null if sweet not found', async () => {
      const sweet = await SweetModel.findById(99999);
      expect(sweet).toBeNull();
    });
  });

  describe('search', () => {
    beforeEach(async () => {
      await SweetModel.create({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      });

      await SweetModel.create({
        name: 'Gummy Bears',
        category: 'Candy',
        price: 5.99,
        quantity: 30,
      });

      await SweetModel.create({
        name: 'Premium Chocolate',
        category: 'Chocolate',
        price: 25.99,
        quantity: 20,
      });
    });

    it('should search by name', async () => {
      const sweets = await SweetModel.search({ name: 'Chocolate' });
      expect(sweets.length).toBeGreaterThanOrEqual(2);
      expect(sweets.every(s => s.name.toLowerCase().includes('chocolate'))).toBe(true);
    });

    it('should search by category', async () => {
      const sweets = await SweetModel.search({ category: 'Chocolate' });
      expect(sweets.length).toBeGreaterThanOrEqual(2);
      expect(sweets.every(s => s.category === 'Chocolate')).toBe(true);
    });

    it('should filter by price range', async () => {
      const sweets = await SweetModel.search({ minPrice: 10, maxPrice: 15 });
      expect(sweets.every(s => parseFloat(s.price.toString()) >= 10 && parseFloat(s.price.toString()) <= 15)).toBe(true);
    });
  });

  describe('update', () => {
    it('should update a sweet', async () => {
      const sweet = await SweetModel.create({
        name: 'Update Me',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      });

      const updated = await SweetModel.update(sweet.id, {
        name: 'Updated Name',
        price: 15.99,
      });

      expect(updated).toBeDefined();
      expect(updated?.name).toBe('Updated Name');
      expect(updated?.price).toBe('15.99');
    });
  });

  describe('delete', () => {
    it('should delete a sweet', async () => {
      const sweet = await SweetModel.create({
        name: 'Delete Me',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      });

      const deleted = await SweetModel.delete(sweet.id);
      expect(deleted).toBe(true);

      const found = await SweetModel.findById(sweet.id);
      expect(found).toBeNull();
    });
  });

  describe('purchase', () => {
    it('should decrease quantity when purchasing', async () => {
      const sweet = await SweetModel.create({
        name: 'Purchase Test',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      });

      const updated = await SweetModel.purchase(sweet.id, 5);
      expect(updated).toBeDefined();
      expect(updated?.quantity).toBe(45);
    });

    it('should not purchase if insufficient quantity', async () => {
      const sweet = await SweetModel.create({
        name: 'Low Stock',
        category: 'Chocolate',
        price: 10.99,
        quantity: 5,
      });

      const updated = await SweetModel.purchase(sweet.id, 10);
      expect(updated).toBeNull();
    });
  });

  describe('restock', () => {
    it('should increase quantity when restocking', async () => {
      const sweet = await SweetModel.create({
        name: 'Restock Test',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      });

      const updated = await SweetModel.restock(sweet.id, 20);
      expect(updated).toBeDefined();
      expect(updated?.quantity).toBe(70);
    });
  });
});

