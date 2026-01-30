'use client';

import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { BookOpen, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';


export function HeroSection() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section
      id="hero"
      ref={contentRef}
      className="relative min-h-screen bg-gradient-to-br from-white via-slate-50 to-orange-50/30 flex items-center pt-20 overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#ffd700]/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <div
            className={`flex flex-col gap-8 transition-all duration-1000 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-full w-fit shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">New: 2026 Schools Edition</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Master Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] via-[#d4af37] to-[#1a1a1a] bg-size-200 animate-gradient">
                  Own Evolution
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Vision Blueprints is your architectural guide to personal growth. Access curated wisdom and a community that holds you accountable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 bg-[#1a1a1a] hover:bg-gray-800 text-white px-10 group">
                Join the Club
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 border-2 border-gray-200 hover:border-[#d4af37] px-10">
                Explore Schools
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Members', val: '5k+' },
                { label: 'Resources', val: '500+' },
                { label: 'Success Rate', val: '98%' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-gray-900">{stat.val}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Feature Preview */}
          <div
            className={`hidden lg:block relative transition-all duration-1000 delay-300 ${
              contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 border border-gray-100 animate-float">
              <div className="space-y-8">
                <FeatureItem 
                  icon={<BookOpen className="text-gray-900" />} 
                  title="Curated Content" 
                  desc="Hand-picked self-help books and programs." 
                />
                <FeatureItem 
                  icon={<Users className="text-gray-900" />} 
                  title="Global Community" 
                  desc="Connect with high-performers worldwide." 
                />
                <FeatureItem 
                  icon={<Star className="text-gray-900" />} 
                  title="Expert Guidance" 
                  desc="Direct access to industry-leading mentors." 
                />
              </div>
            </div>
            {/* Background Accent for Card */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#d4af37] rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-xl bg-[#ffd700] flex items-center justify-center flex-shrink-0 shadow-inner">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}