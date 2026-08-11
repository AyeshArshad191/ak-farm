import React from 'react';
import akFarmLogoImg from '../assets/images/ak_farm_logo_1786299900077.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightBackground?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false, // emblem contains text inside, default to false or clean
  lightBackground = true
}) => {
  const badgeSizes = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16 sm:h-20 sm:w-20',
    lg: 'h-24 w-24 sm:h-28 sm:w-28',
    xl: 'h-32 w-32 sm:h-40 sm:w-40',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Gold & Green Circular Emblem Logo */}
      <div className="relative flex-shrink-0 group cursor-pointer">
        {/* Subtle Gold Aura Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/80 via-emerald-600/60 to-amber-500/80 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition duration-300" />
        
        <div className={`relative ${badgeSizes[size]} rounded-full overflow-hidden border-2 border-amber-400/90 shadow-xl ring-2 ring-[#1b4d2e]/80 transition-transform duration-300 group-hover:scale-105 bg-[#faf8f2]`}>
          <img
            src={akFarmLogoImg}
            alt="AK FARM Pure Organic Products Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full scale-105"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-xl sm:text-2xl font-black tracking-wider leading-none ${lightBackground ? 'text-[#1b4d2e]' : 'text-white'}`}>
            AK <span className="text-[#d97706]">FARM</span>
          </span>
          <span className={`text-[9px] font-bold tracking-[0.2em] uppercase border-t border-amber-500/40 pt-0.5 mt-0.5 ${lightBackground ? 'text-[#1b4d2e]' : 'text-emerald-200'}`}>
            PURE • NATURAL • TRUSTED
          </span>
        </div>
      )}
    </div>
  );
};


