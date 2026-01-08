import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#333333] text-gray-400 pt-12 pb-8 text-sm">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">

                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        {/* Custom SVG Logo (White Stroke for Dark Footer) */}
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 13L27 27M27 13L13 27" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
                            <rect x="18" y="18" width="4" height="4" transform="rotate(45 20 20)" fill="#DC2626" />
                            {/* Outline Box style - Interlocking Squares */}
                            {/* Note: In header these were commented or stacked. Using the bottom implementation which seemed more detailed */}
                            <rect x="8.5" y="20" width="16" height="16" rx="2" transform="rotate(-45 8.5 20)" stroke="white" strokeWidth="2" fill="none" />
                            <rect x="19.5" y="20" width="16" height="16" rx="2" transform="rotate(-45 19.5 20)" stroke="white" strokeWidth="2" fill="none" />
                            <rect x="18.5" y="18.5" width="3" height="3" rx="0.5" transform="rotate(-45 18.5 18.5)" fill="#DC2626" />
                        </svg>
                        <span className="text-white text-2xl font-bold tracking-wider"><span className="text-red-600">X</span>SURFACE</span>
                    </div>
                    <p className="text-gray-500 text-xs text-center">เพื่อวัสดุปิดผิว การตกแต่ง มารวมกันในแพลตฟอร์มที่เน้นการออกแบบ</p>
                </div>

                {/* Links - Flex with specific spacing (Responsive Refactor) */}
                <div className="flex flex-col lg:flex-row mb-12 pt-10 px-4 lg:px-8 xl:px-[190px] gap-8 lg:gap-12 xl:gap-0 items-center lg:items-start text-center lg:text-left justify-between lg:justify-start">

                    {/* Column 1: About Us */}
                    <div className="flex-shrink-0">
                        <h3 className="text-white font-medium mb-4">เกี่ยวกับเรา</h3>
                        <ul className="space-y-3 text-xs flex flex-col items-center lg:items-start">
                            <li><a href="#" className="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">สมัครงาน</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Contact Us - Responsive margin/gap */}
                    <div className="flex-shrink-0 xl:ml-[150px]">
                        <h3 className="text-white font-medium mb-4">ติดต่อเรา</h3>
                        <ul className="space-y-3 text-xs flex flex-col items-center lg:items-start">
                            <li className="break-words max-w-[300px] lg:max-w-none">เอ็กซ์เซอร์เฟส 53 ซอย สุขุมวิท 62, บางจาก,<br />พระโขนง, กรุงเทพฯ 10260</li>
                            <li className="pt-2 flex flex-col sm:block">
                                <span>อีเมล: support@xsurface.com</span>
                                <span className="text-gray-500 sm:ml-1">เบอร์: +66 65-656-2887</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Newsletter - Responsive margin/gap */}
                    <div className="flex-shrink-0 xl:ml-[200px] flex flex-col items-center lg:items-start">
                        <h3 className="text-white font-medium mb-2 max-w-[300px] lg:max-w-full">สมัครง่ายๆ ก็ลงขายกับเราได้เลย <span className="text-red-500">ฟรี</span> ไม่มีค่าใช้จ่าย</h3>
                        <button className="bg-red-600 hover:bg-red-700 text-white text-sm rounded-full transition-colors mt-2 w-full max-w-[290px] h-[40px]">
                            ลงขายสินค้ากับเรา
                        </button>
                    </div>
                </div>

                {/* Social Icons - Centered */}
                <div className="flex justify-center gap-4 mb-8">
                    <a href="#" className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full transition-colors">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full transition-colors">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full transition-colors">
                        {/* TikTok Icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                        </svg>
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-xs text-center pt-6">
                    <p className="mb-2">© 2021 . Copyright of <span className="text-white font-medium">XSURFACE Co., Ltd.</span></p>
                    <div className="flex gap-6 justify-center text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
                        <a href="#" className="hover:text-white transition-colors">ข้อกำหนด และนโยบาย</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
