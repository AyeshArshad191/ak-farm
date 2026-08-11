import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, PhoneCall } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsapp: React.FC = () => {
  const { siteSettings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const whatsappNum = siteSettings.whatsapp.replace(/[^0-9]/g, '');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = userMsg.trim() || 'Assalam-o-Alaikum! I have an inquiry regarding AK Farm products.';
    const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setUserMsg('');
  };

  const quickMessages = [
    'Pure Desi Ghee price inquiry?',
    'Is home delivery free in my city?',
    'How do I place an order on WhatsApp?'
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#1b4d2e] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow">
                  AK
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  AK Farm Support
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </h4>
                <p className="text-[11px] text-emerald-100/90">Typically replies in 5 minutes</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#f8f6f0] space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs border border-stone-200/80 text-stone-800 space-y-1">
              <p className="font-medium">Assalam-o-Alaikum! 👋</p>
              <p className="text-stone-600">Welcome to AK Farm. How can we help you today with pure organic honey, desi ghee, or pickles?</p>
              <span className="text-[9px] text-stone-400 block text-right">Online Now</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Quick Inquiries:</p>
              <div className="flex flex-col gap-1.5">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;
                      window.open(url, '_blank');
                    }}
                    className="text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer text-[11px]"
                  >
                    💬 {msg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Type message or question..."
              className="flex-1 text-xs px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:border-[#1b4d2e]"
            />
            <button
              type="submit"
              className="p-2 bg-[#1b4d2e] hover:bg-[#133921] text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center"
              title="Send on WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct call option */}
          <div className="bg-stone-50 px-4 py-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span>Direct Call: <strong className="text-stone-800">{siteSettings.phone}</strong></span>
            <a
              href={`tel:${siteSettings.phone.replace(/[^0-9]/g, '')}`}
              className="text-[#1b4d2e] font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" /> Call Now
            </a>
          </div>

        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-white/80 active:scale-95"
        aria-label="Order on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
        </div>
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          WhatsApp Order & Inquiry
        </span>
      </button>

    </div>
  );
};
