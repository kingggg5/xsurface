import React, { memo } from 'react';

export const PartnersSection = memo(function PartnersSection() {
    return (
        <section className="max-w-[1440px] mx-auto py-16 px-4 md:px-8 text-center bg-white">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">ร้านค้าที่ร่วมขายกับเรา</h2>
                <div className="w-12 h-1 bg-red-500 rounded-full mb-12" />

                {/* Top Row - 4 logos */}
                <div className="flex flex-wrap justify-center gap-[64px] mb-[64px] max-w-5xl">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-[128px] h-[128px] flex items-center justify-center group bg-red-50 rounded-lg"
                        >
                            <div className="w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                <span className="font-bold text-gray-400 group-hover:text-gray-800 text-xl">
                                    LOGO {i}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Row - 3 logos */}
                <div className="flex flex-wrap justify-center gap-[64px] max-w-4xl">
                    {[5, 6, 7].map((i) => (
                        <div
                            key={i}
                            className="w-[128px] h-[128px] flex items-center justify-center group bg-red-50 rounded-lg"
                        >
                            <div className="w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                <span className="font-bold text-gray-400 group-hover:text-gray-800 text-xl">
                                    LOGO {i}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
