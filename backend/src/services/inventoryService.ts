import { SweetModel } from '../models/Sweet';

export class InventoryService {
  static async purchaseSweet(sweetId: number, quantity: number) {
    if (quantity <= 0) {
      throw new Error('Purchase quantity must be greater than 0');
    }

    const sweet = await SweetModel.findById(sweetId);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    const updatedSweet = await SweetModel.purchase(sweetId, quantity);
    if (!updatedSweet) {
      throw new Error('Purchase failed');
    }

    return updatedSweet;
  }

  static async restockSweet(sweetId: number, quantity: number) {
    if (quantity <= 0) {
      throw new Error('Restock quantity must be greater than 0');
    }

    const sweet = await SweetModel.findById(sweetId);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    const updatedSweet = await SweetModel.restock(sweetId, quantity);
    if (!updatedSweet) {
      throw new Error('Restock failed');
    }

    return updatedSweet;
  }
}

