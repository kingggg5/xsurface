import React, { useCallback, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadPage from './components/UploadPage';
import ProductDetailPage from './components/ProductDetailPage';
import { HomePage, ProductListPage } from './pages';
import { useNavigation, PageType } from './hooks';
import { useProducts } from './application/hooks/useProducts';
import { CartProvider } from './context';
import { CATEGORIES } from './constants';
import { Product } from './types';

function AppContent() {
    const { currentPage, selectedProduct, navigate, navigateToProduct, goBack } = useNavigation();
    const { products, loading, refetch } = useProducts();

    const handleNavigate = useCallback((page: PageType) => {
        navigate(page);
    }, [navigate]);

    const handleProductClick = useCallback((product: Product) => {
        navigateToProduct(product);
    }, [navigateToProduct]);

    const handleUploadSuccess = useCallback(() => {
        refetch();
        navigate('list');
    }, [refetch, navigate]);

    const pageContent = useMemo(() => {
        if (loading && products.length === 0) {
            // Simple Loading State or skeleton could go here
            return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
        }

        switch (currentPage) {
            case 'upload':
                return <UploadPage onSuccess={handleUploadSuccess} />;

            case 'list':
                return <ProductListPage products={products} onProductClick={handleProductClick} />;

            case 'detail':
                return selectedProduct ? (
                    <ProductDetailPage
                        product={selectedProduct}
                        onBack={goBack}
                        onProductClick={handleProductClick}
                    />
                ) : null;

            case 'home':
            default:
                return (
                    <HomePage
                        categories={CATEGORIES}
                        products={products}
                        onProductClick={handleProductClick}
                    />
                );
        }
    }, [currentPage, selectedProduct, handleProductClick, goBack, products, loading]);

    return (
        <div className="min-h-screen bg-white pb-0">
            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            {pageContent}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <CartProvider>
            <AppContent />
        </CartProvider>
    );
}

export default App;
