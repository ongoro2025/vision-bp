'use client';

import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Vision Blueprints transformed my approach to personal development. Getting quality self-help books delivered in Nairobi has never been easier!",
      author: 'Wanjiku Kamau',
      role: 'Personal Development Club Member',
      initials: 'WK',
    },
    {
      quote: "As a Principal in Nakuru, I find their Schools Edition supplies to be top-tier. Their exams and lab equipment are always CBC compliant.",
      author: 'Mr. Otieno Ochieng',
      role: 'School Principal, Highridge Academy',
      initials: 'OO',
    },
    {
      quote: "The community support and expert guidance exceeded my expectations. Vision Blueprints is a movement for Kenyan excellence.",
      author: 'Amara Njeri',
      role: 'Entrepreneur & Member',
      initials: 'AN',
    },
    {
      quote: "The stationery and revision materials are affordable and of high quality. My kids' performance has improved significantly.",
      author: 'Kipchumba Bett',
      role: 'Parent & Civil Servant',
      initials: 'KB',
    },
    {
      quote: "Same-day delivery in Nairobi for bulk orders is a game changer for our office supplies. Efficient and reliable!",
      author: 'Fatuma Hassan',
      role: 'Operations Manager',
      initials: 'FH',
    },
    {
      quote: "Finally, a one-stop shop for laboratory equipment and textbooks. They have streamlined our procurement process.",
      author: 'Dr. Musyoka Mutua',
      role: 'Education Director',
      initials: 'MM',
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Trusted by Kenyans Nationwide
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From Nairobi to Kisumu, see how we're powering education and personal growth.
        </p>
      </div>

      {/* Scrolling Carousel Container */}
      <div className="relative">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />

        <div className="flex animate-scroll hover:[animation-play-state:paused] gap-8 py-4 w-max">
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...testimonials, ...testimonials].map((t, index) => (
            <div
              key={index}
              className="w-[350px] md:w-[400px] bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#d4af37] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#d4af37] fill-[#d4af37]" />
                  ))}
                </div>
                <Quote size={32} className="text-[#ffd700] opacity-30 mb-2" />
                <p className="text-gray-700 mb-8 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center font-bold text-[#ffd700] text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}