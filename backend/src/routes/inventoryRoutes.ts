import { Router } from 'express';
import { InventoryController } from '../controllers/inventoryController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { body } from 'express-validator';

const router = Router();

// Validation rules
const purchaseValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

const restockValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

// Purchase route (authenticated users)
router.post('/:id/purchase', authenticate, purchaseValidation, InventoryController.purchaseSweet);

// Restock route (admin only)
router.post('/:id/restock', authenticate, requireAdmin, restockValidation, InventoryController.restockSweet);

export default router;

