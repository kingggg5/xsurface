import { useMemo, useState, useCallback } from 'react';
import { Product } from '../../domain/entities';
import { useDebounce } from './useDebounce';

interface UseProductSearchOptions {
    debounceMs?: number;
}

interface UseProductSearchReturn {
    query: string;
    setQuery: (query: string) => void;
    results: Product[];
    isSearching: boolean;
    clearSearch: () => void;
}

export function useProductSearch(
    products: Product[],
    options: UseProductSearchOptions = {}
): UseProductSearchReturn {
    const { debounceMs = 300 } = options;
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const debouncedQuery = useDebounce(query, debounceMs);

    const results = useMemo(() => {
        if (!debouncedQuery.trim()) return products;
        setIsSearching(true);
        const lowerQuery = debouncedQuery.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.code.toLowerCase().includes(lowerQuery)
        );
        setIsSearching(false);
        return filtered;
    }, [products, debouncedQuery]);

    const clearSearch = useCallback(() => setQuery(''), []);

    return { query, setQuery, results, isSearching, clearSearch };
}
