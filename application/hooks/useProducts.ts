import { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types';

interface UseProductsReturn {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useProducts(): UseProductsReturn {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const API_URL = 'http://localhost:3001/api/products';
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            setProducts(data.data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
}

