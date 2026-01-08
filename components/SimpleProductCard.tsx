import React, { memo } from 'react';

interface SimpleProductCardProps {
    productName?: string;
    price?: number;
    unit?: string;
    className?: string;
}

const SimpleProductCard: React.FC<SimpleProductCardProps> = memo(function SimpleProductCard({
    productName = 'Product name...',
    price = 550,
    unit = '/ตร.ม.',
    className
}) {
    return (
        <div className={`bg-white rounded-xl flex-shrink-0 overflow-hidden flex flex-col ${className || 'w-full'}`}>
            {/* Image Placeholder */}
            <div className="aspect-square bg-[#D3DFD7] flex items-center justify-center">
                <span className="text-gray-400 text-sm text-center leading-tight">
                    Product<br />image
                </span>
            </div>

            {/* Content */}
            <div className="py-3 flex flex-col gap-1">
                <p className="text-gray-600 text-xs line-clamp-2 min-h-[32px]">{productName}</p>
                <div className="flex items-baseline gap-0.5">
                    <span className="text-red-600 font-bold text-base">฿{price}</span>
                    <span className="text-gray-400 text-[10px]">{unit}</span>
                </div>
            </div>
        </div>
    );
});

export default SimpleProductCard;
