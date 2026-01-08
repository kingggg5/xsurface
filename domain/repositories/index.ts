import { Product, Category, ProductId, CategoryId } from '../entities';

export interface ProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: ProductId): Promise<Product | null>;
    findByCode(code: string): Promise<Product | null>;
    search(query: string): Promise<Product[]>;
    findByCategory(categoryId: CategoryId): Promise<Product[]>;
}

export interface CategoryRepository {
    findAll(): Promise<Category[]>;
    findById(id: CategoryId): Promise<Category | null>;
}

export interface ProductQueryOptions {
    readonly search?: string;
    readonly categoryId?: CategoryId;
    readonly inStock?: boolean;
    readonly isExclusive?: boolean;
    readonly minPrice?: number;
    readonly maxPrice?: number;
    readonly sortBy?: 'name' | 'price' | 'createdAt';
    readonly sortOrder?: 'asc' | 'desc';
    readonly page?: number;
    readonly limit?: number;
}

export interface PaginatedResult<T> {
    readonly data: T[];
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
}
