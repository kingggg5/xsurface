import React, { memo } from 'react';

export const BrandHighlightSection = memo(function BrandHighlightSection() {
    return (
        <section className="max-w-[1440px] mx-auto py-16 px-4 md:px-8">
            <div className="relative rounded-3xl overflow-hidden shadow-lg w-full max-w-[1240px] min-h-[300px] md:min-h-0 md:aspect-[1240/580] mx-auto group">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
                    alt="Wallplast Banner"
                    className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.5] group-hover:scale-105 transition-all duration-[2s] absolute inset-0"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 text-white z-10">
                    {/* Wallplast Logo - Custom Geometric & Handwritten */}
                    <div className="flex flex-col items-start mb-2 md:mb-6 relative">
                        <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 md:w-20 md:h-16">
                                <svg viewBox="0 0 120 100" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-lg">
                                    <path d="M40 20 L90 30 L90 70 L40 60 Z" className="opacity-80" />
                                    <path d="M20 30 L70 40 L70 80 L20 70 Z" />
                                </svg>
                            </div>
                            <span className="text-2xl md:text-5xl text-white drop-shadow-xl" style={{ fontFamily: '"Brush Script MT", "Segoe Script", cursive' }}>
                                Wallplast
                            </span>
                        </div>
                    </div>
                    {/* White line - responsive width */}
                    <div className="w-full max-w-[450px] h-[1px] md:h-[2px] bg-white/80 mb-3 md:mb-4" />
                    <p className="max-w-[450px] text-[10px] sm:text-xs md:text-base leading-relaxed md:leading-loose mb-4 md:mb-10 text-gray-100 font-light">
                        บริการตกแต่งผนังที่คุณจะได้เลือกสไตล์ วัสดุ และ accessories ได้เอง
                        โดยมีระบบการผลิตที่เป็นมาตรฐานโดยใช้เครื่องจักรและการกำหนดค่า
                        ที่มีความละเอียดสูง รวมไปถึงระบบการติดตั้งที่ง่ายและรวดเร็ว
                    </p>
                    {/* View More button - responsive */}
                    <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full w-[120px] sm:w-[150px] md:w-[280px] h-[30px] md:h-[40px] flex items-center justify-center gap-2 md:gap-3 group/btn font-medium backdrop-blur-sm text-[10px] md:text-base">
                        View more <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
});
