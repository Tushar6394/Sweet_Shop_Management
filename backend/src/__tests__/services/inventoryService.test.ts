import { InventoryService } from '../../services/inventoryService';
import { SweetModel } from '../../models/Sweet';

jest.mock('../../models/Sweet');

describe('InventoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('purchaseSweet', () => {
    it('should successfully purchase a sweet', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      };

      (SweetModel.findById as jest.Mock).mockResolvedValue(mockSweet);
      (SweetModel.purchase as jest.Mock).mockResolvedValue({
        ...mockSweet,
        quantity: 45,
      });

      const result = await InventoryService.purchaseSweet(1, 5);

      expect(result.quantity).toBe(45);
      expect(SweetModel.purchase).toHaveBeenCalledWith(1, 5);
    });

    it('should throw error if sweet not found', async () => {
      (SweetModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(InventoryService.purchaseSweet(999, 5)).rejects.toThrow(
        'Sweet not found'
      );
    });

    it('should throw error if insufficient stock', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 10.99,
        quantity: 3,
      };

      (SweetModel.findById as jest.Mock).mockResolvedValue(mockSweet);

      await expect(InventoryService.purchaseSweet(1, 5)).rejects.toThrow(
        'Insufficient stock'
      );
    });

    it('should throw error if quantity is zero or negative', async () => {
      await expect(InventoryService.purchaseSweet(1, 0)).rejects.toThrow(
        'Purchase quantity must be greater than 0'
      );

      await expect(InventoryService.purchaseSweet(1, -1)).rejects.toThrow(
        'Purchase quantity must be greater than 0'
      );
    });
  });

  describe('restockSweet', () => {
    it('should successfully restock a sweet', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 10.99,
        quantity: 50,
      };

      (SweetModel.findById as jest.Mock).mockResolvedValue(mockSweet);
      (SweetModel.restock as jest.Mock).mockResolvedValue({
        ...mockSweet,
        quantity: 70,
      });

      const result = await InventoryService.restockSweet(1, 20);

      expect(result.quantity).toBe(70);
      expect(SweetModel.restock).toHaveBeenCalledWith(1, 20);
    });

    it('should throw error if sweet not found', async () => {
      (SweetModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(InventoryService.restockSweet(999, 20)).rejects.toThrow(
        'Sweet not found'
      );
    });

    it('should throw error if quantity is zero or negative', async () => {
      await expect(InventoryService.restockSweet(1, 0)).rejects.toThrow(
        'Restock quantity must be greater than 0'
      );

      await expect(InventoryService.restockSweet(1, -1)).rejects.toThrow(
        'Restock quantity must be greater than 0'
      );
    });
  });
});

