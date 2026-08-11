import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'info');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to AK Farm newsletter!', 'success');
  };

  return (
    <section className="py-14 bg-[#1b4d2e] text-white relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 bg-radial from-amber-300 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
        
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
          JOIN THE AK FARM FAMILY
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-black leading-tight">
          Stay Connected With Nature
        </h2>

        <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Get new product launches, special seasonal harvest discounts, and authentic organic health tips delivered straight to your inbox.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 bg-emerald-800/90 border border-emerald-500/50 px-6 py-3.5 rounded-2xl text-xs font-bold text-amber-300 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span>Thank you for subscribing! You are now on our VIP harvest list.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-white text-stone-900 placeholder-stone-400 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs rounded-2xl shadow transition-colors cursor-pointer shrink-0"
            >
              Subscribe Now
            </button>
          </form>
        )}

        <p className="text-[10px] text-emerald-200/60">
          We respect your privacy. Unsubscribe anytime with 1 click.
        </p>

      </div>
    </section>
  );
};
