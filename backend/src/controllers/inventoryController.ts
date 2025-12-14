import { Request, Response } from 'express';
import { InventoryService } from '../services/inventoryService';
import { validationResult } from 'express-validator';

export class InventoryController {
  static async purchaseSweet(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const sweetId = parseInt(req.params.id);
      const quantity = parseInt(req.body.quantity);

      const sweet = await InventoryService.purchaseSweet(sweetId, quantity);
      res.status(200).json({
        message: 'Purchase successful',
        sweet,
      });
    } catch (error: any) {
      if (error.message === 'Sweet not found' || error.message === 'Purchase failed') {
        res.status(404).json({ error: error.message });
      } else if (error.message === 'Insufficient stock') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  static async restockSweet(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const sweetId = parseInt(req.params.id);
      const quantity = parseInt(req.body.quantity);

      const sweet = await InventoryService.restockSweet(sweetId, quantity);
      res.status(200).json({
        message: 'Restock successful',
        sweet,
      });
    } catch (error: any) {
      if (error.message === 'Sweet not found' || error.message === 'Restock failed') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }
}

