'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserSession {
  id: string;
  email: string;
  name: string;
  clubType?: 'personal' | 'schools';
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user session from server
    // For now, we'll show a placeholder
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <LayoutDashboard size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 mb-8">Please log in to view your dashboard</p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-[#1a1a1a] hover:bg-gray-900 text-white">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-[#d4af37] text-[#1a1a1a]">
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
            <p className="text-gray-300">{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-2">Club Type</p>
            <p className="text-lg font-semibold text-[#d4af37]">
              {user.clubType === 'personal' ? 'Personal Growth' : 'Schools Edition'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/clubs"
                className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-l-4 border-[#d4af37]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Users size={28} className="text-[#d4af37]" />
                    <div>
                      <h3 className="font-bold text-gray-900">Browse Clubs</h3>
                      <p className="text-sm text-gray-600">Discover and join communities</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </div>
              </Link>

              <Link
                href="/profile"
                className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-l-4 border-blue-400"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Settings size={28} className="text-blue-400" />
                    <div>
                      <h3 className="font-bold text-gray-900">Profile Settings</h3>
                      <p className="text-sm text-gray-600">Manage your account</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </div>
              </Link>

              <button
                onClick={() => {
                  fetch('/api/auth/logout', { method: 'POST' })
                    .then(() => {
                      window.location.href = '/';
                    })
                    .catch(err => console.error('[v0] Logout error:', err));
                }}
                className="w-full p-6 bg-red-50 rounded-lg shadow hover:shadow-lg transition border-l-4 border-red-400 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <LogOut size={28} className="text-red-400" />
                    <div>
                      <h3 className="font-bold text-gray-900">Sign Out</h3>
                      <p className="text-sm text-gray-600">Logout from your account</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </div>
              </button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="animate-fade-in-delay">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Activity</h2>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-[#d4af37] to-[#ffd700] rounded-lg text-[#1a1a1a]">
                <p className="text-sm opacity-80 mb-2">Active Memberships</p>
                <p className="text-4xl font-bold">-</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg text-white">
                <p className="text-sm opacity-80 mb-2">Member Since</p>
                <p className="text-xl font-bold">Today</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-400 to-green-500 rounded-lg text-white">
                <p className="text-sm opacity-80 mb-2">Profile Completeness</p>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div className="bg-white rounded-full h-2 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 animate-fade-in-stagger" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
          <div className="bg-white rounded-lg shadow p-8 border-l-4 border-[#d4af37]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37] text-[#1a1a1a] flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Complete Your Profile</p>
                  <p className="text-sm text-gray-600">Add a profile picture and bio to personalize your account</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37] text-[#1a1a1a] flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Join Your First Club</p>
                  <p className="text-sm text-gray-600">Browse clubs and join communities aligned with your goals</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37] text-[#1a1a1a] flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Start Engaging</p>
                  <p className="text-sm text-gray-600">Participate in discussions and connect with other members</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
