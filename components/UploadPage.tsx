import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface UploadPageProps {
    onSuccess?: () => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ onSuccess }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        price: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.code || !formData.price || !formData.image) {
            alert('Please fill all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price.replace(/[^0-9.]/g, '')), // Clean price
                    inStock: true,
                    isExclusive: false
                })
            });

            if (response.ok) {
                alert('Product created successfully!');
                setFormData({ name: '', code: '', price: '', image: '' });
                onSuccess?.(); // Navigate to list and refetch
            } else {
                throw new Error('Failed to create product');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error creating product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto bg-white min-h-screen relative font-poppins text-[#252525] p-8 md:p-24">

            {/* Title */}
            <h1 className="text-[32px] font-semibold mb-12 text-[#252525]">Upload Product</h1>

            <div className="max-w-[924px] mx-auto flex flex-col gap-8">

                {/* Drag & Drop Area */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-[350px] border border-dashed border-[#D9D9D9] rounded-[24px] bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative"
                >
                    {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain rounded-[24px]" />
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-[50px] h-[50px] bg-[#6C6C70] rounded-full flex items-center justify-center text-white mb-2">
                                <Upload size={24} />
                            </div>
                            <div className="text-center">
                                <p className="text-[14px] text-[#6C6C70] tracking-[0.4px] mb-2">Click to upload image</p>
                                <p className="text-[12px] font-light text-[#6C6C70] tracking-[0.4px]">JPG. or PNG Max 50MB.</p>
                            </div>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Product Name */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Product name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-[56px] border border-[#D9D9D9] rounded-[24px] px-6 text-[16px] placeholder-[#D9D9D9] focus:outline-none focus:border-[#E04132] transition-colors"
                        />
                    </div>

                    {/* Code */}
                    <div>
                        <input
                            type="text"
                            placeholder="Code"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            className="w-full h-[56px] border border-[#D9D9D9] rounded-[24px] px-6 text-[16px] placeholder-[#D9D9D9] focus:outline-none focus:border-[#E04132] transition-colors"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <input
                            type="text"
                            placeholder="Price (e.g. 1000)"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            className="w-full h-[56px] border border-[#D9D9D9] rounded-[24px] px-6 text-[16px] placeholder-[#D9D9D9] focus:outline-none focus:border-[#E04132] transition-colors font-prompt"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end mt-4">
                    <button className="w-[190px] h-[56px] border border-[#D9D9D9] rounded-[24px] text-[#E13B30] font-prompt text-[16px] hover:bg-red-50 transition-colors">
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-[185px] h-[56px] bg-[#E04132] rounded-[24px] text-white font-prompt text-[16px] hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'ยืนยัน'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UploadPage;
