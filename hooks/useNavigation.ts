import { useState, useCallback, useMemo } from 'react';
import { Product } from '../types';

export type PageType = 'home' | 'upload' | 'list' | 'detail' | 'collection' | 'album' | 'board' | 'cart' | 'profile' | 'login';

interface UseNavigationReturn {
    currentPage: PageType;
    selectedProduct: Product | null;
    navigate: (page: PageType) => void;
    navigateToProduct: (product: Product) => void;
    goBack: () => void;
}

export function useNavigation(initialPage: PageType = 'home'): UseNavigationReturn {
    const [currentPage, setCurrentPage] = useState<PageType>(initialPage);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [previousPage, setPreviousPage] = useState<PageType>('home');

    const navigate = useCallback((page: PageType) => {
        setPreviousPage(currentPage);
        setCurrentPage(page);

        if (page !== 'detail') {
            setSelectedProduct(null);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const navigateToProduct = useCallback((product: Product) => {
        setPreviousPage(currentPage);
        setSelectedProduct(product);
        setCurrentPage('detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const goBack = useCallback(() => {
        setCurrentPage(previousPage);
        setSelectedProduct(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [previousPage]);

    return useMemo(() => ({
        currentPage,
        selectedProduct,
        navigate,
        navigateToProduct,
        goBack,
    }), [currentPage, selectedProduct, navigate, navigateToProduct, goBack]);
}
