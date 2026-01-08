import React, { memo, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../ProductCard';

interface CollectionsSectionProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export const CollectionsSection = memo(function CollectionsSection({
    products,
    onProductClick
}: CollectionsSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = Math.ceil(products.length / 2);

    const scroll = (direction: 'left' | 'right') => {
        setCurrentSlide(prev => {
            if (direction === 'left') {
                return prev > 0 ? prev - 1 : 0;
            } else {
                return prev < totalSlides - 1 ? prev + 1 : totalSlides - 1;
            }
        });
    };

    const scrollToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    return (
        <section className="py-16 relative" style={{ background: 'linear-gradient(to bottom, #E5DED8 290px, #ffffff 290px)' }}>
            <button
                onClick={() => scroll('left')}
                className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-red-500 hover:bg-red-50 transition-all"
                style={{ left: '120px' }}
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={() => scroll('right')}
                className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-red-500 hover:bg-red-50 transition-all"
                style={{ right: '120px' }}
            >
                <ChevronRight size={24} />
            </button>

            <div className="max-w-[1440px] mx-auto px-4 lg:px-[190px]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Collections</h2>
                    <a href="#" className="text-red-500 text-sm font-medium flex items-center gap-1 hover:underline">
                        คอลเลคชั่นทั้งหมด <ChevronRight size={16} />
                    </a>
                </div>

                <p className="text-gray-500 text-sm mb-10 max-w-lg leading-relaxed">
                    ค้นหาแรงบันดาลใจ ผ่านการออกแบบ<br />
                    และคัดสรรวัสดุที่น่าสนใจเข้าไว้ด้วยกัน
                </p>

                <div className="flex flex-col xl:flex-row gap-4 md:gap-[28px] h-auto xl:h-[340px]">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl w-full xl:w-[614px] h-[200px] sm:h-[250px] md:h-[300px] xl:h-[340px] flex-shrink-0 group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
                            alt="Collection Interior"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white drop-shadow-lg">
                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-white/20 backdrop-blur rounded-full text-[10px] md:text-xs font-medium mb-2 md:mb-3 inline-block border border-white/20">
                                Featured Collection
                            </span>
                            <h3 className="text-xl md:text-2xl xl:text-3xl font-bold mb-1 md:mb-2">Modern Loft Style</h3>
                            <p className="text-xs md:text-sm opacity-90 font-light">ดิบ เท่ อย่างมีสไตล์ ผสมผสานวัสดุธรรมชาติ</p>
                        </div>
                    </div>

                    <div
                        className="lg:hidden flex-1 w-full flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
                        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.slice(0, 4).map((product, index) => (
                            <div key={`mobile-${product.code || product.id || index}`} className="w-[160px] snap-start flex-shrink-0">
                                <ProductCard
                                    product={product}
                                    onClick={onProductClick}
                                    className="w-full"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:grid flex-1 grid-cols-2 gap-[18px] h-[340px] items-center">
                        {products.slice(currentSlide * 2, (currentSlide * 2) + 2).map((product, index) => (
                            <div key={`desktop-${product.code || product.id || index}`} className="w-full">
                                <ProductCard
                                    product={product}
                                    onClick={onProductClick}
                                    className="w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                    {[0, 1, 2, 3].map((index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={`w-8 h-1 rounded-full transition-colors cursor-pointer ${currentSlide === index ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>
        </section >
    );
});
