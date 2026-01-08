import React, { useState, useRef, useEffect } from 'react';
import { Search, Layers, BookImage, LayoutPanelLeft, ShoppingCart, User, LogIn, MoreHorizontal, Menu, Upload, Package } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'upload' | 'list' | 'collection' | 'album' | 'board' | 'cart' | 'profile' | 'login') => void;
  currentPage?: string;
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, cartItemCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-2 px-4 md:px-8 font-sans">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 h-10">
        {/* Logo - Original Style */}
        <div
          className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate?.('home')}
        >
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 13L27 27M27 13L13 27" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <rect x="18" y="18" width="4" height="4" transform="rotate(45 20 20)" fill="#DC2626" />
            <path d="M10 20L20 10L30 20L20 30L10 20Z" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M14 20L20 14L26 20L20 26L14 20Z" fill="#DC2626" />
            <rect x="8.5" y="20" width="16" height="16" rx="2" transform="rotate(-45 8.5 20)" stroke="#374151" strokeWidth="2" fill="none" />
            <rect x="19.5" y="20" width="16" height="16" rx="2" transform="rotate(-45 19.5 20)" stroke="#374151" strokeWidth="2" fill="none" />
            <rect x="18.5" y="18.5" width="3" height="3" rx="0.5" transform="rotate(-45 18.5 18.5)" fill="#DC2626" />
          </svg>
          <span className="text-xl font-bold tracking-wide text-gray-800"><span className="text-red-600">X</span>SURFACE</span>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md relative mx-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="ค้นหาสินค้า"
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-9 pr-28 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-white hover:bg-gray-50 text-red-500 text-xs px-3 rounded-full border border-red-200 flex items-center gap-1 transition-colors">
            <Search size={12} /> ค้นหาด้วยรูป
          </button>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-1 md:gap-3 text-gray-600 text-[10px] md:text-[11px] font-medium">

          {/* Desktop Nav Items (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Collection */}
            <div
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors px-2 py-1 rounded hover:text-red-600 ${currentPage === 'collection' ? 'text-red-600' : ''}`}
              onClick={() => onNavigate?.('collection')}
            >
              <Layers size={20} strokeWidth={1.5} />
              <span className="whitespace-nowrap">คอลเลคชั่น</span>
            </div>

            {/* Material Album */}
            <div
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors px-2 py-1 rounded hover:text-red-600 ${currentPage === 'album' ? 'text-red-600' : ''}`}
              onClick={() => onNavigate?.('album')}
            >
              <BookImage size={20} strokeWidth={1.5} />
              <span className="whitespace-nowrap">แมททีเรียลอัลบั้ม</span>
            </div>

            {/* Material Board */}
            <div
              className={`hidden lg:flex flex-col items-center gap-0.5 cursor-pointer transition-colors px-2 py-1 rounded hover:text-red-600 ${currentPage === 'board' ? 'text-red-600' : ''}`}
              onClick={() => onNavigate?.('board')}
            >
              <LayoutPanelLeft size={20} strokeWidth={1.5} />
              <span className="whitespace-nowrap">แมททีเรียลบอร์ด</span>
            </div>

            {/* Cart */}
            <div
              className={`hidden lg:flex flex-col items-center gap-0.5 cursor-pointer transition-colors px-2 py-1 rounded hover:text-red-600 relative ${currentPage === 'cart' ? 'text-red-600' : ''}`}
              onClick={() => onNavigate?.('cart')}
            >
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold px-0.5">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </div>
              <span>ตะกร้า</span>
            </div>

            {/* Profile */}
            <div
              className={`hidden lg:flex flex-col items-center gap-0.5 cursor-pointer transition-colors px-2 py-1 rounded hover:text-red-600 ${currentPage === 'profile' ? 'text-red-600' : ''}`}
              onClick={() => onNavigate?.('profile')}
            >
              <User size={20} strokeWidth={1.5} />
              <span>โปรไฟล์</span>
            </div>

            {/* Login Button */}
            <button
              onClick={() => onNavigate?.('login')}
              className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            >
              <LogIn size={16} strokeWidth={1.5} />
              <span>Login</span>
            </button>
          </div>

          {/* More Menu (...) for Desktop - keeping existing logic but ensuring it doesn't overlap mobile */}
          <div className="relative hidden md:block" ref={moreMenuRef}>
            <div
              className={`flex items-center justify-center cursor-pointer transition-colors p-2 rounded-full hover:bg-gray-100 ${showMoreMenu ? 'bg-gray-100 text-red-600' : ''}`}
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            >
              <MoreHorizontal size={20} strokeWidth={1.5} />
            </div>

            {/* Dropdown Menu */}
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors ${currentPage === 'upload' ? 'text-red-600 bg-red-50' : ''}`}
                  onClick={() => {
                    onNavigate?.('upload');
                    setShowMoreMenu(false);
                  }}
                >
                  <Upload size={18} strokeWidth={1.5} />
                  <span>Upload</span>
                </button>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors ${currentPage === 'list' ? 'text-red-600 bg-red-50' : ''}`}
                  onClick={() => {
                    onNavigate?.('list');
                    setShowMoreMenu(false);
                  }}
                >
                  <Package size={18} strokeWidth={1.5} />
                  <span>Product List</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div onClick={() => { onNavigate?.('collection'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Layers size={20} className="text-gray-500" />
            <span className="font-medium text-gray-700">คอลเลคชั่น</span>
          </div>
          <div onClick={() => { onNavigate?.('album'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <BookImage size={20} className="text-gray-500" />
            <span className="font-medium text-gray-700">แมททีเรียลอัลบั้ม</span>
          </div>
          <div onClick={() => { onNavigate?.('board'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <LayoutPanelLeft size={20} className="text-gray-500" />
            <span className="font-medium text-gray-700">แมททีเรียลบอร์ด</span>
          </div>
          <div onClick={() => { onNavigate?.('cart'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="relative">
              <ShoppingCart size={20} className="text-gray-500" />
              {cartItemCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
            </div>
            <span className="font-medium text-gray-700">ตะกร้า</span>
          </div>
          <div onClick={() => { onNavigate?.('profile'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <User size={20} className="text-gray-500" />
            <span className="font-medium text-gray-700">โปรไฟล์</span>
          </div>
          <div onClick={() => { onNavigate?.('upload'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Upload size={20} className="text-gray-500" />
            <span className="font-medium text-gray-700">Upload</span>
          </div>
          <div onClick={() => { onNavigate?.('list'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Package size={20} className="text-gray-500" />
            <span className="font-medium text-gray-700">Product List</span>
          </div>
          <div className="h-px bg-gray-100 my-2" />
          <button
            onClick={() => { onNavigate?.('login'); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-full font-medium hover:bg-red-700"
          >
            <LogIn size={18} />
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
