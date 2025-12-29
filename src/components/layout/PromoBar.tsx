import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PromoBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="gradient-primary text-white py-2 px-4 text-center text-sm font-medium relative">
      <span>{t('promo.text')}</span>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Close promo"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
