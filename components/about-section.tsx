'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Sparkles, GraduationCap } from 'lucide-react';

export function AboutSection() {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Two Paths to Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're seeking personal transformation or educational advancement, Vision Blueprints has the right path for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Personal Growth Club */}
          <div
            className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-700 ${
              aboutVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-lg bg-[#d4af37] flex items-center justify-center mb-4">
                <Sparkles size={32} className="text-[#1a1a1a]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Personal Growth Club</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover transformative self-help books, personal development programs, and strategies for meaningful life change. Our carefully curated collection helps you unlock your potential and achieve your goals.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                <span className="text-gray-700">Bestselling Self-Help Books</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                <span className="text-gray-700">Personal Development Programs</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                <span className="text-gray-700">Weekly Mentorship Sessions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                <span className="text-gray-700">Community Support Network</span>
              </li>
            </ul>
          </div>

          {/* Schools Edition */}
          <div
            className={`bg-gradient-to-br from-[#1a1a1a] to-gray-900 rounded-xl p-8 border border-[#d4af37] hover:shadow-lg transition-all duration-700 delay-100 ${
              aboutVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-lg bg-[#ffd700] flex items-center justify-center mb-4">
                <GraduationCap size={32} className="text-[#1a1a1a]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Schools Edition</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empower educational institutions with comprehensive resources, professional development tools, and strategies for organizational growth. Perfect for schools, universities, and educational organizations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
                <span className="text-gray-300">Educational Resources Library</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
                <span className="text-gray-300">Staff Development Programs</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
                <span className="text-gray-300">Institutional Leadership Training</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
                <span className="text-gray-300">Organizational Excellence Tools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
