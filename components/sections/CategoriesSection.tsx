import React, { memo } from 'react';
import { Category } from '../../types';

interface CategoriesSectionProps {
    categories: Category[];
    onCategoryClick?: (category: Category) => void;
}

export const CategoriesSection = memo(function CategoriesSection({
    categories,
    onCategoryClick
}: CategoriesSectionProps) {
    return (
        <section className="bg-white py-12">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-[190px]">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-[40px] justify-items-center">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex flex-col items-center gap-3 group cursor-pointer w-full max-w-[120px]"
                            onClick={() => onCategoryClick?.(cat)}
                        >
                            <div className="w-full aspect-square rounded-xl overflow-hidden group-hover:-translate-y-1 transition-all duration-300">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-red-600 transition-colors text-center">
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
