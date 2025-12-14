import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { body } from 'express-validator';

const router = Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().notEmpty().withMessage('Name is required'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerValidation, AuthController.register);
router.post('/login', loginValidation, AuthController.login);

export default router;

