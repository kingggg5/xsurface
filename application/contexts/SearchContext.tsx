import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react';
import { Product } from '../../domain/entities';
import { useDebounce } from '../hooks/useDebounce';
import { useProductContext } from './ProductContext';

interface SearchContextValue {
    query: string;
    debouncedQuery: string;
    results: Product[];
    isSearching: boolean;
    setQuery: (query: string) => void;
    clearSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

interface SearchProviderProps {
    children: ReactNode;
    debounceMs?: number;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children, debounceMs = 300 }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedQuery = useDebounce(query, debounceMs);
    const { searchProducts } = useProductContext();

    React.useEffect(() => {
        const performSearch = async () => {
            if (!debouncedQuery.trim()) {
                setResults([]);
                return;
            }
            setIsSearching(true);
            try {
                const searchResults = await searchProducts(debouncedQuery);
                setResults(searchResults);
            } finally {
                setIsSearching(false);
            }
        };
        performSearch();
    }, [debouncedQuery, searchProducts]);

    const clearSearch = useCallback(() => {
        setQuery('');
        setResults([]);
    }, []);

    const value = useMemo(() => ({
        query, debouncedQuery, results, isSearching, setQuery, clearSearch,
    }), [query, debouncedQuery, results, isSearching, clearSearch]);

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = (): SearchContextValue => {
    const context = useContext(SearchContext);
    if (!context) throw new Error('useSearchContext must be used within a SearchProvider');
    return context;
};
