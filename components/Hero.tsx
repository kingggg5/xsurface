import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const bannerImages = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
  ];

  return (
    <div className="w-full aspect-[1440/472] relative flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <img
        src={bannerImages[currentSlide]}
        alt="Banner XSURFACE"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <h1 className="text-4xl md:text-7xl font-bold text-white tracking-widest drop-shadow-md relative z-10">XSURFACE</h1>
      <p className="mt-4 text-white text-xl md:text-3xl font-medium relative z-10">Premium Surface Solutions</p>

      {/* Carousel Indicators - 4 slides */}
      <div className="absolute bottom-8 flex gap-3 z-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-1 rounded-full cursor-pointer transition-colors ${currentSlide === index ? 'bg-red-500' : 'bg-white hover:bg-gray-200'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
