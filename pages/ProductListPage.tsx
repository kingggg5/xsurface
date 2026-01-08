import React, { memo, useMemo } from 'react';
import { Product } from '../types';
import { Search } from 'lucide-react';
import { useProductSearch } from '../application/hooks/useProductSearch';

interface ProductListPageProps {
    products: Product[];
    onProductClick?: (product: Product) => void;
}

const ProductListCard = memo(function ProductListCard({
    product,
    onClick,
    isActive = false
}: {
    product: Product;
    onClick?: (product: Product) => void;
    isActive?: boolean;
}) {
    return (
        <div
            className="w-full bg-white rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
            onClick={() => onClick?.(product)}
        >
            <div
                className="w-full aspect-square bg-gray-100 rounded-t-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 flex gap-1">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-4 h-0.5 rounded-sm ${i === 0 ? 'bg-[#E13B30]' : 'bg-[#D9D9D9]'}`} />
                    ))}
                </div>
            </div>
            <div className="p-3 md:p-4 relative min-h-[100px] md:min-h-[120px]">
                <h3 className="font-semibold text-sm md:text-base leading-5 md:leading-6 text-[#252525] line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {product.name}
                </h3>
                <p className="text-[10px] md:text-xs text-[#6C6C70] mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {product.code}
                </p>
                <p className="font-semibold text-base md:text-xl text-[#E13B30] text-right mt-2" style={{ fontFamily: 'Prompt, sans-serif' }}>
                    ฿{product.price.toLocaleString()}
                </p>
            </div>
        </div>
    );
});

export const ProductListPage = memo(function ProductListPage({ products, onProductClick }: ProductListPageProps) {
    const { query, setQuery, results, clearSearch } = useProductSearch(products);
    const productCount = useMemo(() => results.length, [results]);

    return (
        <div className="w-full max-w-[1440px] mx-auto min-h-screen bg-white px-4 md:px-8 lg:px-[100px] py-8 md:py-16 lg:py-24">
            <h1 className="font-semibold text-xl md:text-2xl lg:text-[32px] leading-tight text-[#252525] mb-4 md:mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Product list
            </h1>

            <div className="w-full max-w-[1240px] h-14 mb-8 md:mb-16 lg:mb-24 relative">
                <div className="absolute inset-0 bg-white border border-[#D9D9D9] rounded-3xl" />
                <Search className="absolute left-6 top-5 w-4 h-4 text-[#BCBCC0]" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Name, Catalogue, Code"
                    className="absolute left-12 top-4 w-[calc(100%-60px)] h-6 text-base bg-transparent outline-none text-[#252525] placeholder-[#BCBCC0]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                />
            </div>

            {productCount > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {results.map((product, index) => (
                        <ProductListCard key={product.code || product.id || index} product={product} onClick={onProductClick} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-lg font-medium text-gray-700 mb-2">ไม่พบสินค้าที่ค้นหา</h2>
                    <p className="text-sm text-gray-500 mb-4">ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกด</p>
                    <button onClick={clearSearch} className="text-red-600 hover:text-red-700 text-sm font-medium">ล้างการค้นหา</button>
                </div>
            )}
        </div>
    );
});
