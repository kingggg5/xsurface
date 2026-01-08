import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductSliderProps {
  products: Product[];
  bgColor?: string;
  darkBackground?: boolean;
  onProductClick?: (product: Product) => void;
  itemsPerView?: 4 | 5;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, bgColor, darkBackground, onProductClick, itemsPerView = 4 }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const isFiveItems = itemsPerView === 5;
  const cardWidthClass = isFiveItems
    ? 'w-[40vw] sm:w-[30vw] md:w-[22vw] lg:w-[200px]'
    : 'w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[250px]';
  const gapClass = isFiveItems ? 'gap-4' : 'gap-4 md:gap-10';
  const scrollStep = isFiveItems ? 216 : 300;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth',
      });
      setCurrentSlide(prev => {
        if (direction === 'left') {
          return prev > 0 ? prev - 1 : 0;
        } else {
          return prev < totalSlides - 1 ? prev + 1 : totalSlides - 1;
        }
      });
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    if (scrollContainerRef.current) {
      const scrollAmount = slideIndex * scrollStep;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <div className={`relative group ${bgColor || ''} ${darkBackground ? 'py-12' : 'py-4'}`}>
      <button
        onClick={() => scroll('left')}
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-red-500 hover:bg-red-50 transition-all left-4 lg:left-[120px]"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="max-w-[1440px] mx-auto relative">
        <div className="px-4 lg:px-[190px]">
          <div
            ref={scrollContainerRef}
            className={`flex ${gapClass} overflow-x-auto no-scrollbar pb-8 pt-2`}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.code || product.id || index}
                product={product}
                onClick={onProductClick}
                className={`flex-shrink-0 ${cardWidthClass}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-8 h-1 rounded-full transition-colors cursor-pointer ${currentSlide === index ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll('right')}
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-red-500 hover:bg-red-50 transition-all right-4 lg:right-[120px]"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ProductSlider;
