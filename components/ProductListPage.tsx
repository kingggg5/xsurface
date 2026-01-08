import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../hooks';

interface ProductListPageProps {
  onProductClick?: (product: Product) => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ onProductClick }) => {
  const {
    products,
    isLoading,
    searchTerm,
    setSearchTerm,
    hasSearched
  } = useProducts();

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-white min-h-screen relative font-poppins p-8 md:p-12">

      {/* Title */}
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-[32px] font-semibold text-[#252525]">Product list</h1>
        {isLoading && (
          <span className="text-red-500 flex items-center gap-2 text-sm">
            <Loader2 className="animate-spin" size={16} /> Updating...
          </span>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#BCBCC0]">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search by Name or Code (e.g., 'FUVAL', 'CODE123')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-[56px] border border-[#D9D9D9] rounded-[24px] pl-16 pr-6 text-[16px] placeholder-[#BCBCC0] focus:outline-none focus:border-[#E04132] transition-colors"
        />
      </div>

      {/* Results Info */}
      {hasSearched && (
        <p className="mb-6 text-gray-500 text-sm">
          Found {products.length} items for "{searchTerm}"
        </p>
      )}

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="w-[200px] bg-white rounded-[16px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] overflow-hidden pb-4 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              onClick={() => onProductClick?.(product)}
            >
              {/* Image Container with Dots Overlay */}
              <div className="relative h-[200px] w-full bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Dots Indicator Overlay */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-4 h-[2px] bg-[#E13B30] rounded-sm" />
                  <div className="w-4 h-[2px] bg-[#D9D9D9] rounded-sm" />
                  <div className="w-4 h-[2px] bg-[#D9D9D9] rounded-sm" />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pt-4 relative">
                <h3
                  className="font-poppins font-semibold text-[16px] text-[#252525] truncate"
                  title={product.name}
                >
                  {product.name.split('(')[0]}
                </h3>
                <p className="font-poppins text-[12px] text-[#6C6C70] mt-1">
                  {product.code.substring(0, 10)}
                </p>

                <div className="flex justify-end mt-2">
                  <span className="font-prompt font-semibold text-[20px] text-[#E13B30]">
                    ฿{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p>No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
