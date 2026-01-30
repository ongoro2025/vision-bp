'use client';

import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column - Larger Span */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="logo.png"
                alt="Vision Blueprints Logo"
                className="h-24 w-auto brightness-110"
              />
              <span className="text-2xl font-bold tracking-tighter">
                VISION <span className="text-[#d4af37]">BLUEPRINTS</span>
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Architecting personal growth and educational excellence through curated wisdom, school resources and global community.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-[#d4af37]" />
                <span className="text-sm">Kimathi st-Nairobi , Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-[#d4af37]" />
                <span className="text-sm">+254 (0) 725-107712</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37] mb-6">Platform</h3>
            <ul className="space-y-4">
              {['About Us', 'Membership', 'Resources', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Clubs */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37] mb-6">Our Clubs</h3>
            <ul className="space-y-4">
              {['Growth Club', 'Schools Edition', 'Corporate', 'Events'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37] mb-6">Stay Inspired</h3>
            <p className="text-gray-400 text-sm mb-4">Get weekly blueprints for personal success directly in your inbox.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-gray-900 border-gray-800 text-white focus-visible:ring-[#d4af37]"
              />
              <Button className="bg-[#d4af37] hover:bg-[#b8962d] text-[#1a1a1a]">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-900">
          <div className="text-gray-500 text-sm mb-6 md:mb-0">
            {new Date().getFullYear()} <span className="text-gray-300 font-medium">Vision Blueprints</span>. 
            All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={20} />} label="Facebook" href="https://web.facebook.com/profile.php?id=61576386442703"/>
            <SocialIcon icon={<Instagram size={20} />} label="Instagram" href=""/>
            <SocialIcon icon={<Twitter size={20} />} label="Twitter" href=""/>
            <SocialIcon icon={<Linkedin size={20} />} label="LinkedIn" href=""/>
            <SocialIcon icon={<Youtube size={20} />} label="YouTube" href="https://www.youtube.com/"/>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300 border border-gray-800"
    >
      {icon}
    </a>
  );
}