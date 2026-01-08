import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SimpleProductCard from './SimpleProductCard';

interface SimpleProductSliderProps {
    itemCount?: number;
}

const SimpleProductSlider: React.FC<SimpleProductSliderProps> = ({ itemCount = 6 }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 4;

    // Configuration for 6 items in 1060px space
    // User requested: 125px width, 25px gap.
    const isSixItems = itemCount === 6;
    const cardWidthClass = isSixItems ? 'w-[125px]' : 'w-[155px]';
    const gapClass = isSixItems ? 'gap-[25px]' : 'gap-10';
    const scrollStep = isSixItems ? 150 : 300; // 125 + 25 = 150

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
        <div className="relative py-4">
            {/* Left Button - 120px from left edge, 20px gap from cards */}
            {/* Left Button - Hidden on mobile */}
            <button
                onClick={() => scroll('left')}
                className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-red-500 hover:bg-red-50 transition-colors left-4 lg:left-[120px]"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Cards Container - Responsive margins */}
            <div className="max-w-[1440px] mx-auto">
                <div className="px-4 lg:px-[190px]">
                    <div
                        ref={scrollContainerRef}
                        className={`flex ${gapClass} overflow-x-auto no-scrollbar pb-4 lg:justify-center`}
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {Array.from({ length: itemCount }).map((_, index) => (
                            <SimpleProductCard key={index} className={`flex-shrink-0 ${cardWidthClass}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Button - Hidden on mobile */}
            <button
                onClick={() => scroll('right')}
                className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-red-500 hover:bg-red-50 transition-colors right-4 lg:right-[120px]"
            >
                <ChevronRight size={24} />
            </button>

            {/* Scroll Indicator - 4 indicators */}
            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`w-8 h-1 rounded-full transition-colors cursor-pointer ${currentSlide === index ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SimpleProductSlider;
