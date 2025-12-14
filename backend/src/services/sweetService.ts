import { SweetModel, CreateSweetData, UpdateSweetData, SearchFilters } from '../models/Sweet';

export class SweetService {
  static async getAllSweets() {
    return await SweetModel.findAll();
  }

  static async getSweetById(id: number) {
    const sweet = await SweetModel.findById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }

  static async searchSweets(filters: SearchFilters) {
    return await SweetModel.search(filters);
  }

  static async createSweet(data: CreateSweetData) {
    return await SweetModel.create(data);
  }

  static async updateSweet(id: number, data: UpdateSweetData) {
    const sweet = await SweetModel.update(id, data);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }

  static async deleteSweet(id: number) {
    const deleted = await SweetModel.delete(id);
    if (!deleted) {
      throw new Error('Sweet not found');
    }
    return { message: 'Sweet deleted successfully' };
  }
}

