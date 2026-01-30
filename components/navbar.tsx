'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isAuthenticated = false; // TODO: Replace with actual auth state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vision%20blueprints%20official%20logo_edited-O1YteXWBdAO7THJJJB788HQ2eeeG5c.png"
              alt="Vision Blueprints"
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline text-lg font-bold text-gray-900">Vision Blueprints</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-gray-700 hover:text-[#d4af37] transition">
              About
            </Link>
            <Link href="#benefits" className="text-gray-700 hover:text-[#d4af37] transition">
              Benefits
            </Link>
            <Link href="#products" className="text-gray-700 hover:text-[#d4af37] transition">
              Resources
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-[#d4af37] transition">
              Testimonials
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-[#d4af37] transition">
              Contact
            </Link>
          </div>

          {/* Auth & User Menu */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  aria-label="User menu"
                >
                  <UserCircle size={20} className="text-gray-700" />
                  <span className="hidden sm:inline text-sm text-gray-700">Profile</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/clubs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      My Clubs
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 text-sm flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hidden sm:inline-flex">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#1a1a1a] hover:bg-gray-900 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="#about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#benefits"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Benefits
            </Link>
            <Link
              href="#products"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="#testimonials"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <div className="pt-2 space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-gray-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#1a1a1a] hover:bg-gray-900 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
