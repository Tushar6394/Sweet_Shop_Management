import { Router } from 'express';
import { SweetController } from '../controllers/sweetController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { body } from 'express-validator';

const router = Router();

// Validation rules
const createSweetValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

const updateSweetValidation = [
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

// Public routes
router.get('/', authenticate, SweetController.getAllSweets);
router.get('/search', authenticate, SweetController.searchSweets);
router.get('/:id', authenticate, SweetController.getSweetById);

// Protected admin routes
router.post('/', authenticate, requireAdmin, createSweetValidation, SweetController.createSweet);
router.put('/:id', authenticate, requireAdmin, updateSweetValidation, SweetController.updateSweet);
router.delete('/:id', authenticate, requireAdmin, SweetController.deleteSweet);

export default router;

