import React, { memo, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
    className?: string;
    autoFocus?: boolean;
}

export const SearchInput = memo(function SearchInput({
    value,
    onChange,
    onClear,
    placeholder = 'ค้นหาสินค้าด้วยชื่อหรือรหัส...',
    className = '',
    autoFocus = false,
}: SearchInputProps) {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);
    const handleClear = useCallback(() => { onChange(''); onClear?.(); }, [onChange, onClear]);
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') handleClear();
    }, [handleClear]);

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            />
            {value && (
                <button onClick={handleClear} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors" aria-label="Clear search">
                    <X className="h-5 w-5" />
                </button>
            )}
        </div>
    );
});
