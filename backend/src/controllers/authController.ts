import { Request, Response } from 'express';
import { AuthService, RegisterData, LoginData } from '../services/authService';
import { validationResult } from 'express-validator';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data: RegisterData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      };

      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data: LoginData = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await AuthService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

