import { Request, Response } from 'express';
import { SweetService } from '../services/sweetService';
import { validationResult } from 'express-validator';

export class SweetController {
  static async getAllSweets(req: Request, res: Response): Promise<void> {
    try {
      const sweets = await SweetService.getAllSweets();
      res.status(200).json(sweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getSweetById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const sweet = await SweetService.getSweetById(id);
      res.status(200).json(sweet);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async searchSweets(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        name: req.query.name as string | undefined,
        category: req.query.category as string | undefined,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      };

      const sweets = await SweetService.searchSweets(filters);
      res.status(200).json(sweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createSweet(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data = {
        name: req.body.name,
        category: req.body.category,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        description: req.body.description,
      };

      const sweet = await SweetService.createSweet(data);
      res.status(201).json(sweet);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateSweet(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id);
      const data: any = {};

      if (req.body.name) data.name = req.body.name;
      if (req.body.category) data.category = req.body.category;
      if (req.body.price) data.price = parseFloat(req.body.price);
      if (req.body.quantity !== undefined) data.quantity = parseInt(req.body.quantity);
      if (req.body.description !== undefined) data.description = req.body.description;

      const sweet = await SweetService.updateSweet(id, data);
      res.status(200).json(sweet);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async deleteSweet(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await SweetService.deleteSweet(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

