import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 z-30 p-3 bg-stone-900/90 hover:bg-[#1b4d2e] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer border border-stone-700"
      aria-label="Scroll to top"
      title="Scroll to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
