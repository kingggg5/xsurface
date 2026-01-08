import React, { memo } from 'react';

interface PriceDisplayProps {
    price: number;
    originalPrice?: number;
    unit?: string;
    discount?: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
    sm: { price: 'text-lg', original: 'text-[11px]', unit: 'text-[10px]' },
    md: { price: 'text-xl', original: 'text-sm', unit: 'text-sm' },
    lg: { price: 'text-4xl', original: 'text-lg', unit: 'text-lg' },
};

export const PriceDisplay = memo(function PriceDisplay({
    price,
    originalPrice,
    unit,
    discount,
    size = 'md',
}: PriceDisplayProps) {
    const styles = sizeStyles[size];

    return (
        <div className="flex items-baseline gap-2 flex-wrap">
            <span className={`font-prompt font-bold text-red-600 ${styles.price}`}>
                ฿{price.toLocaleString()}
            </span>

            {unit && (
                <span className={`text-gray-500 ${styles.unit}`}>{unit}</span>
            )}

            {originalPrice && (
                <span className={`text-gray-400 line-through ${styles.original}`}>
                    ฿{originalPrice.toLocaleString()}
                </span>
            )}

            {discount && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                    {discount} OFF
                </span>
            )}
        </div>
    );
});
