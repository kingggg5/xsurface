import React, { memo } from 'react';

type BadgeVariant = 'exclusive' | 'discount' | 'inStock' | 'outOfStock';

interface BadgeProps {
    variant: BadgeVariant;
    children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
    exclusive: 'bg-black text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider',
    discount: 'bg-red-600 text-white text-[10px] font-bold px-2 py-0.5',
    inStock: 'text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full',
    outOfStock: 'text-[10px] text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full',
};

export const Badge = memo(function Badge({ variant, children }: BadgeProps) {
    return (
        <span className={`rounded-[2px] shadow-sm ${variantStyles[variant]}`}>
            {children}
        </span>
    );
});
