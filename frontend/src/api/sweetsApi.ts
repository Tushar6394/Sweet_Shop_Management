import api from './axios';

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSweetData {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface SearchFilters {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const sweetsApi = {
  getAll: async (): Promise<Sweet[]> => {
    const response = await api.get('/sweets');
    return response.data;
  },

  getById: async (id: number): Promise<Sweet> => {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  search: async (filters: SearchFilters): Promise<Sweet[]> => {
    const response = await api.get('/sweets/search', { params: filters });
    return response.data;
  },

  create: async (data: CreateSweetData): Promise<Sweet> => {
    const response = await api.post('/sweets', data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateSweetData>): Promise<Sweet> => {
    const response = await api.put(`/sweets/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/sweets/${id}`);
  },

  purchase: async (id: number, quantity: number): Promise<Sweet> => {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data.sweet;
  },

  restock: async (id: number, quantity: number): Promise<Sweet> => {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data.sweet;
  },
};

