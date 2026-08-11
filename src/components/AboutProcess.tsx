import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MessageSquare, CheckCircle, Sparkles, Tractor, Sprout, ShieldCheck, Package, Home, Flame } from 'lucide-react';

interface AboutProcessProps {
  activeSection: 'about' | 'process' | 'contact';
}

export const AboutProcess: React.FC<AboutProcessProps> = ({ activeSection }) => {
  const { siteSettings } = useStore();

  const processSteps = [
    {
      num: 1,
      icon: Sprout,
      title: 'Farm Sourcing',
      desc: 'Sourced directly from certified organic local orchards and cattle farms across Punjab and Sindh.'
    },
    {
      num: 2,
      icon: Tractor,
      title: 'Sun Harvest',
      desc: 'Fruits, sugarcane, mustard seeds, and flora handpicked at peak seasonal ripeness.'
    },
    {
      num: 3,
      icon: Flame,
      title: 'Traditional Processing',
      desc: 'Bilona churned curd, slow brass simmered preserves, and unheated raw honey filtration.'
    },
    {
      num: 4,
      icon: ShieldCheck,
      title: 'Quality Check',
      desc: 'Rigorous batch testing for zero pesticides, zero artificial colors, and chemical purity.'
    },
    {
      num: 5,
      icon: Package,
      title: 'Hygienic Packaging',
      desc: 'Sealed in food-grade glass jars and eco-friendly protective packaging.'
    },
    {
      num: 6,
      icon: Home,
      title: 'Your Home',
      desc: 'Express delivered to your doorstep with freshness, care, and cash-on-delivery simplicity.'
    }
  ];

  return (
    <div className="py-12 bg-[#fcfbf7] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* OUR PROCESS SECTION */}
        {(activeSection === 'process' || activeSection === 'about') && (
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                TRANSPARENT ORGANIC JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1b4d2e]">
                From Our Farm to Your Home
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm">
                How we preserve pure natural goodness without artificial chemicals or preservatives.
              </p>
            </div>

            {/* 6 Process Steps Timeline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#1b4d2e] hover:shadow-md transition-all space-y-3 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-xl bg-[#1b4d2e] text-amber-300 font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                          {step.num}
                        </span>
                        <Icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="font-serif font-bold text-stone-900 text-sm">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ABOUT US SECTION */}
        {(activeSection === 'about') && (
          <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d97706]">
                ABOUT AK FARM
              </span>
              <h2 className="text-3xl font-serif font-black text-[#1b4d2e]">
                Bringing Purity Back To Your Dining Table
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                AK FARM was founded with a simple vision: to give Pakistani families access to 100% unadulterated, farm-fresh, organic products made just like our grandmothers used to prepare at home.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                From our signature <strong>Homemade Mango Murabba</strong> to cold-pressed <strong>Sarso Ka Tail</strong>, pure <strong>Desi Bilona Ghee</strong>, raw <strong>Wildflower Honey</strong>, and unrefined <strong>Desi Sugar</strong>, we stand behind the purity of every single jar.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-bold text-stone-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b4d2e]" />
                  <span>100% Organic Ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b4d2e]" />
                  <span>Traditional Bilona Method</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b4d2e]" />
                  <span>No Artificial Flavors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1b4d2e]" />
                  <span>Cash on Delivery Nation-wide</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <img
                src="/assets/images/ak_farm_hero_1786299288820.jpg"
                alt="AK Farm Process"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover rounded-2xl shadow-md border border-stone-200"
              />
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        {(activeSection === 'contact' || activeSection === 'about') && (
          <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="font-serif font-black text-2xl text-amber-400">
                Get In Touch With AK FARM
              </h3>
              <p className="text-stone-300 text-xs">
                Have questions or need wholesale bulk orders? Contact our team directly!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700/80 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#1b4d2e] text-amber-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-bold uppercase">Call Us</div>
                  <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="font-serif font-bold text-lg hover:text-amber-300">
                    {siteSettings.phone}
                  </a>
                </div>
              </div>

              <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700/80 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#25D366] text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-bold uppercase">WhatsApp Order</div>
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif font-bold text-lg hover:text-[#25D366]"
                  >
                    Send Message
                  </a>
                </div>
              </div>

              <div className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700/80 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#1b4d2e] text-amber-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-bold uppercase">Email Support</div>
                  <a href={`mailto:${siteSettings.email}`} className="font-serif font-bold text-sm hover:text-amber-300">
                    {siteSettings.email}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
