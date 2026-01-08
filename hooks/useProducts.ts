import { useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '../types';
import { productApi } from '../services/api';

interface UseProductsOptions {
    initialSearch?: string;
    debounceMs?: number;
}

interface UseProductsReturn {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    hasSearched: boolean;
    refetch: () => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
    const { initialSearch = '', debounceMs = 500 } = options;

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [hasSearched, setHasSearched] = useState(false);

    const fetchProducts = useCallback(async (query: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await productApi.getAll({ search: query || undefined });
            const mappedProducts: Product[] = response.data.map(p => ({
                id: p._id,
                code: p.code,
                name: p.name,
                price: p.price,
                originalPrice: p.originalPrice,
                discount: p.discount,
                image: p.image,
                dimensions: p.dimensions,
                unit: p.unit,
                inStock: p.inStock,
                isExclusive: p.isExclusive,
            }));
            setProducts(mappedProducts);
            if (query) setHasSearched(true);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch products';
            setError(message);
            console.error('useProducts error:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        fetchProducts(searchTerm);
    }, [fetchProducts, searchTerm]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProducts(searchTerm);
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, debounceMs, fetchProducts]);

    return useMemo(() => ({
        products,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        hasSearched,
        refetch,
    }), [products, isLoading, error, searchTerm, hasSearched, refetch]);
}
