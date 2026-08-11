import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, Sparkles } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      initials: 'SC',
      name: 'Mrs. Saima Chaudhry',
      location: 'Lahore',
      rating: 5,
      date: '2 days ago',
      product: 'Homemade Mango Murabba',
      comment: 'AK FARM ka Mango Murabba bilkul bachpan ki yaad dila deta ha! Khushbu aur mithaas itni asli ha ke pura ghar khush ho gaya.',
      verified: true
    },
    {
      id: 2,
      initials: 'TM',
      name: 'Dr. Tariq Mehmood',
      location: 'Islamabad',
      rating: 5,
      date: '3 days ago',
      product: 'Pure Bilona Desi Ghee',
      comment: 'Ghee Quality is 10/10. Pure granular texture with authentic aroma. Clean glass jar packing. Highly recommended for every healthy kitchen.',
      verified: true
    },
    {
      id: 3,
      initials: 'MR',
      name: 'Haji Muhammad Rizwan',
      location: 'Karachi',
      rating: 5,
      date: '1 week ago',
      product: 'Spicy Farm Mango Achar',
      comment: 'Achar ka zaiqa kamaal ha, Kachi Ghani Sarso ke khalis tel me bana hua ha. Delivery bhi 2 din me Karachi punch gayi.',
      verified: true
    },
    {
      id: 4,
      initials: 'FK',
      name: 'Fatima Khan',
      location: 'Multan',
      rating: 5,
      date: '2 weeks ago',
      product: 'Raw Wildflower Sidr Honey',
      comment: '100% natural and unrefined. The richness and amber color prove it is raw forest honey. My children love it on warm parathas.',
      verified: true
    },
    {
      id: 5,
      initials: 'AB',
      name: 'Asad Baig',
      location: 'Rawalpindi',
      rating: 5,
      date: '3 weeks ago',
      product: 'Organic Desi Gur & Shakkar',
      comment: 'Chemical-free and rich jaggery flavor. Replaced white refined sugar completely in our home chai and desserts.',
      verified: true
    },
    {
      id: 6,
      initials: 'ZA',
      name: 'Zubair Ahmed',
      location: 'Faisalabad',
      rating: 5,
      date: '1 month ago',
      product: 'Kachi Ghani Sarso Oil',
      comment: 'Pure cold-pressed mustard oil with natural pungency and deep yellow tone. Perfect for traditional cooking and hair care.',
      verified: true
    }
  ];

  return (
    <section className="py-14 bg-[#f6f3eb] border-y border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            REAL FAMILY FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1b4d2e]">
            What Our Customers Say
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Over 5,000+ satisfied families across Pakistan trust AK FARM for daily organic nutrition and authentic farm taste.
          </p>
        </div>

        {/* 6 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-amber-100 absolute top-4 right-4 pointer-events-none" />

              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-stone-700 ml-1">5.0</span>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-medium italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1b4d2e] text-amber-300 font-serif font-black text-xs flex items-center justify-center shrink-0">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1">
                      <span>{rev.name}</span>
                      {rev.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                      )}
                    </h4>
                    <span className="text-[10px] text-stone-500 block">
                      {rev.location} • <span className="text-amber-800 font-bold">{rev.product}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[9px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  <ThumbsUp className="w-3 h-3 text-emerald-600" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
