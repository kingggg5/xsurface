const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface ProductFromDB {
  _id: string;
  code: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  dimensions: string;
  unit: string;
  inStock: boolean;
  isExclusive?: boolean;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
}

export const productApi = {
  getAll: async (params?: { search?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.set('search', params.search);
    if (params?.page) queryParams.set('page', String(params.page));
    if (params?.limit) queryParams.set('limit', String(params.limit));

    const url = `${API_BASE_URL}/products?${queryParams}`;
    const response = await fetch(url);
    return handleResponse<ApiResponse<ProductFromDB[]>>(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse<ProductFromDB>(response);
  },

  search: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`);
    return handleResponse<ApiResponse<ProductFromDB[]>>(response);
  },

  create: async (product: Omit<ProductFromDB, '_id'>) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return handleResponse<ProductFromDB>(response);
  },

  update: async (id: string, product: Partial<ProductFromDB>) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return handleResponse<ProductFromDB>(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
    return handleResponse<{ message: string }>(response);
  },

  seed: async () => {
    const response = await fetch(`${API_BASE_URL}/products/seed`, { method: 'POST' });
    return handleResponse<{ message: string; count: number }>(response);
  },
};
