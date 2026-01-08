import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  onLinkClick?: () => void;
  textColor?: string;
  linkColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
    title, 
    linkText = "สินค้าทั้งหมด", 
    onLinkClick,
    textColor = "text-gray-800",
    linkColor = "text-red-500"
}) => {
  return (
    <div className="flex justify-between items-center mb-6 px-4 md:px-0">
      <h2 className={`text-xl md:text-2xl font-medium ${textColor}`}>
        {title.includes('/') ? (
            <>
                <span className="font-bold">{title.split('/')[0]}</span> / {title.split('/')[1]}
            </>
        ) : title === "Xclusive Deal" ? (
             <><span className="text-red-500">X</span>clusive Deal</>
        ) : (
            title
        )}
      </h2>
      {linkText && (
        <button 
            onClick={onLinkClick} 
            className={`flex items-center text-sm ${linkColor} hover:underline transition-all`}
        >
          {linkText} <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
