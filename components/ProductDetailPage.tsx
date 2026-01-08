import React, { useState } from 'react';
import { Star, Heart, Share2, Minus, Plus, ShoppingCart, ChevronRight, Calculator, ArrowLeft, Maximize2, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import ProductSlider from './ProductSlider';
import { MOCK_PRODUCTS } from '../constants';
import { PrimaryButton, SecondaryButton } from './StyledElements'; // Import Styled Components

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onProductClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'delivery'>('details');
  
  // Calculator State
  const [showCalculator, setShowCalculator] = useState(false);
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');

  const calculateArea = () => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    if (!isNaN(w) && !isNaN(l)) {
      return (w * l).toFixed(2);
    }
    return '0.00';
  };

  const calculatedCost = () => {
    const area = parseFloat(calculateArea());
    return (area * product.price).toLocaleString();
  };

  return (
    <div className="bg-white min-h-screen font-poppins pb-16">
      {/* Breadcrumb & Back */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 flex items-center gap-2 text-sm text-gray-500">
        <button onClick={onBack} className="hover:text-red-600 flex items-center gap-1">
            <ArrowLeft size={16} /> Back
        </button>
        <ChevronRight size={14} />
        <span>Products</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        
        {/* Left Column: Gallery */}
        <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 relative group">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-md text-gray-700 hover:text-red-600 transition-colors">
                    <Maximize2 size={20} />
                </button>
                {product.isExclusive && (
                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                        Exclusive
                    </div>
                )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${i === 1 ? 'border-red-500' : 'border-transparent hover:border-gray-200'}`}>
                        <img src={`https://picsum.photos/200/200?random=${parseInt(product.id) + i}`} className="w-full h-full object-cover" alt="thumbnail" />
                    </div>
                ))}
            </div>
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">CODE: {product.code}</span>
                        <div className="flex items-center text-yellow-400">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} className="text-gray-300" />
                            <span className="text-gray-400 ml-1 text-xs">(128 reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-colors text-gray-500">
                        <Heart size={20} />
                    </button>
                    <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            {/* Price Block */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-prompt text-4xl font-bold text-red-600">฿{product.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-lg">{product.unit}</span>
                    {product.originalPrice && (
                        <span className="text-gray-400 text-lg line-through decoration-red-300 decoration-2 ml-2">
                            ฿{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                    {product.discount && (
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full ml-2">
                            {product.discount} OFF
                        </span>
                    )}
                </div>
                <p className="text-sm text-green-600 flex items-center gap-2 font-medium">
                    <ShieldCheck size={16} /> In Stock - Ready to ship
                </p>
            </div>

            {/* Freestyle Add-on: Calculator */}
            <div className="border border-red-100 rounded-2xl p-5 mb-8 bg-white shadow-sm">
                <button 
                    onClick={() => setShowCalculator(!showCalculator)}
                    className="flex items-center justify-between w-full text-left"
                >
                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                        <Calculator className="text-red-500" size={20} />
                        <span>Area Calculator</span>
                        <span className="text-xs font-normal text-gray-400 ml-2">(Estimate your usage)</span>
                    </div>
                    <ChevronRight size={20} className={`text-gray-400 transition-transform ${showCalculator ? 'rotate-90' : ''}`} />
                </button>
                
                {showCalculator && (
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Width (m)</label>
                            <input 
                                type="number" 
                                value={width} 
                                onChange={(e) => setWidth(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-red-500 outline-none" 
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Length (m)</label>
                            <input 
                                type="number" 
                                value={length} 
                                onChange={(e) => setLength(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-red-500 outline-none" 
                                placeholder="0"
                            />
                        </div>
                        <div className="col-span-2 bg-gray-50 rounded-lg p-3 flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-600">Total Area: <strong className="text-gray-900">{calculateArea()} sq.m.</strong></span>
                            <span className="text-sm text-gray-600">Est. Cost: <strong className="text-red-600">฿{calculatedCost()}</strong></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions using Styled Components */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-full w-fit px-4 py-3 h-[52px]">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-red-600">
                        <Minus size={18} />
                    </button>
                    <input 
                        type="text" 
                        value={quantity} 
                        readOnly 
                        className="w-12 text-center text-lg font-medium outline-none text-gray-800" 
                    />
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-red-600">
                        <Plus size={18} />
                    </button>
                </div>
                
                <div className="flex-1">
                    <PrimaryButton style={{ width: '100%' }}>
                        <ShoppingCart size={20} /> Add to Cart
                    </PrimaryButton>
                </div>
                
                <div className="flex-1">
                    <SecondaryButton style={{ width: '100%' }}>
                        Buy Now
                    </SecondaryButton>
                </div>
            </div>

            {/* Info Tabs */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex gap-8 border-b border-gray-100 mb-6">
                    {['details', 'specs', 'delivery'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-3 text-sm font-medium capitalize transition-all relative ${
                                activeTab === tab ? 'text-red-600' : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-full"></div>}
                        </button>
                    ))}
                </div>
                
                <div className="text-gray-600 text-sm leading-relaxed min-h-[150px]">
                    {activeTab === 'details' && (
                        <div className="space-y-4">
                            <p>
                                Elevate your space with the <strong>{product.name}</strong>. Designed for both durability and aesthetic appeal, 
                                this material is perfect for modern interiors. Its unique finish reflects light beautifully, adding depth to any room.
                            </p>
                            <p>
                                Suitable for various applications including wall cladding, furniture surfacing, and more. Easy to clean and maintain.
                            </p>
                        </div>
                    )}
                    {activeTab === 'specs' && (
                        <ul className="space-y-2">
                            <li className="grid grid-cols-3 border-b border-gray-50 pb-2"><span className="text-gray-400">Dimensions</span> <span className="col-span-2 font-medium text-gray-800">{product.dimensions}</span></li>
                            <li className="grid grid-cols-3 border-b border-gray-50 pb-2"><span className="text-gray-400">Material</span> <span className="col-span-2 font-medium text-gray-800">Premium Composite</span></li>
                            <li className="grid grid-cols-3 border-b border-gray-50 pb-2"><span className="text-gray-400">Weight</span> <span className="col-span-2 font-medium text-gray-800">2.5 kg / unit</span></li>
                            <li className="grid grid-cols-3 border-b border-gray-50 pb-2"><span className="text-gray-400">Country</span> <span className="col-span-2 font-medium text-gray-800">Thailand</span></li>
                        </ul>
                    )}
                    {activeTab === 'delivery' && (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <Truck className="text-red-500 mt-1" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Standard Delivery</h4>
                                    <p className="text-xs text-gray-500">2-4 Business Days</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <ShieldCheck className="text-green-500 mt-1" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Warranty</h4>
                                    <p className="text-xs text-gray-500">1 Year Manufacturer Warranty</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-20 border-t border-gray-100 pt-16 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
                <a href="#" className="text-red-600 text-sm font-medium hover:underline">View all</a>
             </div>
             <ProductSlider products={MOCK_PRODUCTS} onProductClick={onProductClick} />
        </div>
      </div>

    </div>
  );
};

export default ProductDetailPage;
