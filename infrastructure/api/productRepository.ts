import { Product, ProductId, CategoryId } from '../../domain/entities';
import { ProductRepository, ProductQueryOptions, PaginatedResult } from '../../domain/repositories';
import { MOCK_PRODUCTS } from '../../constants';

class ProductRepositoryImpl implements ProductRepository {
    private products: Product[] = MOCK_PRODUCTS;

    async findAll(): Promise<Product[]> {
        await this.delay(100);
        return [...this.products];
    }

    async findById(id: ProductId): Promise<Product | null> {
        await this.delay(50);
        return this.products.find(p => p.id === id) || null;
    }

    async findByCode(code: string): Promise<Product | null> {
        await this.delay(50);
        return this.products.find(p => p.code.toLowerCase() === code.toLowerCase()) || null;
    }

    async search(query: string): Promise<Product[]> {
        await this.delay(100);
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) return [...this.products];
        return this.products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.code.toLowerCase().includes(lowerQuery)
        );
    }

    async findByCategory(categoryId: CategoryId): Promise<Product[]> {
        await this.delay(100);
        return [...this.products];
    }

    async findWithOptions(options: ProductQueryOptions): Promise<PaginatedResult<Product>> {
        await this.delay(150);
        let filtered = [...this.products];

        if (options.search) {
            const query = options.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.code.toLowerCase().includes(query)
            );
        }

        if (options.inStock !== undefined) {
            filtered = filtered.filter(p => p.inStock === options.inStock);
        }

        if (options.isExclusive !== undefined) {
            filtered = filtered.filter(p => p.isExclusive === options.isExclusive);
        }

        if (options.minPrice !== undefined) {
            filtered = filtered.filter(p => p.price >= options.minPrice!);
        }
        if (options.maxPrice !== undefined) {
            filtered = filtered.filter(p => p.price <= options.maxPrice!);
        }

        if (options.sortBy) {
            filtered.sort((a, b) => {
                const aVal = a[options.sortBy!];
                const bVal = b[options.sortBy!];
                const order = options.sortOrder === 'desc' ? -1 : 1;
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return aVal.localeCompare(bVal) * order;
                }
                return ((aVal as number) - (bVal as number)) * order;
            });
        }

        const page = options.page || 1;
        const limit = options.limit || 10;
        const startIndex = (page - 1) * limit;
        const paginatedData = filtered.slice(startIndex, startIndex + limit);

        return {
            data: paginatedData,
            total: filtered.length,
            page,
            limit,
            totalPages: Math.ceil(filtered.length / limit)
        };
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export const productRepository = new ProductRepositoryImpl();
