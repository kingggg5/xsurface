import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode } from 'react';
import { Product } from '../../domain/entities';
import { productRepository } from '../../infrastructure/api';

interface ProductState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    lastFetched: Date | null;
}

type ProductAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Product[] }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'ADD_PRODUCT'; payload: Product }
    | { type: 'UPDATE_PRODUCT'; payload: Product }
    | { type: 'DELETE_PRODUCT'; payload: string };

const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: null,
    lastFetched: null,
};

function productReducer(state: ProductState, action: ProductAction): ProductState {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, isLoading: false, lastFetched: new Date() };
        case 'FETCH_ERROR':
            return { ...state, isLoading: false, error: action.payload };
        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.payload] };
        case 'UPDATE_PRODUCT':
            return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
        case 'DELETE_PRODUCT':
            return { ...state, products: state.products.filter(p => p.id !== action.payload) };
        default:
            return state;
    }
}

interface ProductContextValue {
    state: ProductState;
    fetchProducts: () => Promise<void>;
    searchProducts: (query: string) => Promise<Product[]>;
    getProductById: (id: string) => Product | undefined;
    getProductByCode: (code: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextValue | null>(null);

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    const fetchProducts = useCallback(async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const products = await productRepository.findAll();
            dispatch({ type: 'FETCH_SUCCESS', payload: products });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: (error as Error).message });
        }
    }, []);

    const searchProducts = useCallback(async (query: string): Promise<Product[]> => {
        return productRepository.search(query);
    }, []);

    const getProductById = useCallback((id: string): Product | undefined => {
        return state.products.find(p => p.id === id);
    }, [state.products]);

    const getProductByCode = useCallback((code: string): Product | undefined => {
        return state.products.find(p => p.code.toLowerCase() === code.toLowerCase());
    }, [state.products]);

    const value = useMemo(() => ({
        state, fetchProducts, searchProducts, getProductById, getProductByCode,
    }), [state, fetchProducts, searchProducts, getProductById, getProductByCode]);

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = (): ProductContextValue => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProductContext must be used within a ProductProvider');
    return context;
};
