import React, { memo } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    variant?: 'light' | 'dark';
    onClick?: (product: Product) => void;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(function ProductCard({
    product,
    variant = 'light',
    onClick,
    className
}) {
    return (
        <div
            className={`bg-white rounded-xl flex-shrink-0 group relative shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${className || 'w-full'}`}
            onClick={() => onClick?.(product)}
        >
            <div className="relative aspect-square bg-[#D3DFD7] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.isExclusive && (
                        <div className="bg-black text-white text-[9px] font-bold px-2 py-1 rounded-[2px] uppercase tracking-wider shadow-sm">
                            Exclusive
                        </div>
                    )}
                </div>

                {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-sm">
                        {product.discount}
                    </div>
                )}
            </div>

            <div className="p-3 bg-white flex flex-col gap-2 h-[135px]">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0.5 flex-1 pr-2">
                        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight group-hover:text-red-600 transition-colors" title={product.name}>
                            {product.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-medium">CODE{product.code}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <button
                            className="w-6 h-6 rounded border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500 flex items-center justify-center transition-colors bg-white shadow-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Plus size={14} />
                        </button>
                        <div className="flex items-center text-[10px] text-gray-400 gap-1">
                            <Eye size={10} /> 1000
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-0.5 -mt-1">
                    <p className="text-[10px] text-gray-500">กระเบื้อง</p>
                    <p className="text-[11px] text-gray-800 font-medium">{product.dimensions}</p>
                </div>

                <div className="flex justify-between items-end mt-1">
                    <div className="flex items-baseline gap-1">
                        {product.originalPrice && (
                            <span className="text-[10px] text-gray-300 line-through mr-1">฿{product.originalPrice}</span>
                        )}
                        <span className="text-red-600 font-bold text-lg leading-none">฿{product.price}</span>
                        <span className="text-[10px] text-gray-500">{product.unit}</span>
                    </div>
                    {product.inStock ? (
                        <span className="text-[10px] text-green-500 font-medium">In stock</span>
                    ) : (
                        <span className="text-[10px] text-red-500 font-medium">Out of stock</span>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ProductCard;
