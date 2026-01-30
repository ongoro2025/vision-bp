'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Users, Star, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Club {
  _id: string;
  name: string;
  slug: string;
  description: string;
  type: 'personal' | 'schools';
  memberCount: number;
  icon?: string;
  color: string;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [memberships, setMemberships] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchClubsAndMemberships();
  }, []);

  const fetchClubsAndMemberships = async () => {
  try {
    const [clubsRes, membershipsRes] = await Promise.all([
      fetch('/api/clubs'),
      fetch('/api/memberships'),
    ]);

    const clubsData = await clubsRes.json();
    
    if (Array.isArray(clubsData)) {
      setClubs(clubsData);
    } else if (clubsData && Array.isArray(clubsData.clubs)) {
      setClubs(clubsData.clubs);
    } else {
      console.error('Expected array for clubs, got:', clubsData);
      setClubs([]); // Fallback to empty array
    }

    if (membershipsRes.ok) {
      const membershipsData = await membershipsRes.json();
      if (Array.isArray(membershipsData)) {
        setMemberships(membershipsData.map((m: any) => m.clubId));
      }
    }
  } catch (error) {
    console.error('[v0] Error fetching clubs:', error);
    setClubs([]);
  } finally {
    setLoading(false);
  }
};

  const handleJoinClub = async (clubId: string) => {
    setJoining(prev => ({ ...prev, [clubId]: true }));
    try {
      const response = await fetch('/api/memberships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clubId }),
      });

      if (response.ok) {
        setMemberships(prev => [...prev, clubId]);
      }
    } catch (error) {
      console.error('[v0] Error joining club:', error);
    } finally {
      setJoining(prev => ({ ...prev, [clubId]: false }));
    }
  };

  const handleLeaveClub = async (clubId: string) => {
    setJoining(prev => ({ ...prev, [clubId]: true }));
    try {
      const response = await fetch('/api/memberships', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clubId }),
      });

      if (response.ok) {
        setMemberships(prev => prev.filter(id => id !== clubId));
      }
    } catch (error) {
      console.error('[v0] Error leaving club:', error);
    } finally {
      setJoining(prev => ({ ...prev, [clubId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#d4af37]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Clubs & Communities
          </h1>
          <p className="text-xl text-gray-300 animate-fade-in-delay">
            Join communities of like-minded individuals and start your transformation journey
          </p>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(clubs) && clubs?.map((club, index) => {
            const isMember = memberships.includes(club._id);
            const isLoading = joining[club._id];

            return (
              <div
                key={club._id}
                className="group animate-fade-in-stagger"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  club.type === 'personal' ? 'border-[#d4af37]' : 'border-[#ffd700]'
                } p-8 h-full flex flex-col`}>
                  {/* Icon & Type Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${club.color} text-white`}>
                      {club.type === 'personal' ? (
                        <Users size={28} />
                      ) : (
                        <BookOpen size={28} />
                      )}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      club.type === 'personal'
                        ? 'bg-[#ffd700] text-[#1a1a1a]'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {club.type === 'personal' ? 'Personal Growth' : 'Schools Edition'}
                    </span>
                  </div>

                  {/* Club Name & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#d4af37] transition">
                    {club.name}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {club.description}
                  </p>

                  {/* Member Count */}
                  <div className="flex items-center gap-2 mb-6 text-gray-600">
                    <Users size={18} />
                    <span className="text-sm">{club.memberCount || 0} members</span>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    {isMember ? (
                      <>
                        <Button
                          onClick={() => handleLeaveClub(club._id)}
                          disabled={isLoading}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900"
                        >
                          {isLoading ? 'Leaving...' : 'Leave'}
                        </Button>
                        <Button
                          asChild
                          className="flex-1 bg-[#1a1a1a] hover:bg-gray-900 text-white"
                        >
                          <Link href={`/clubs/${club.slug}`}>
                            View Club
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleJoinClub(club._id)}
                        disabled={isLoading}
                        className="w-full bg-[#d4af37] hover:bg-[#c19a1a] text-[#1a1a1a] font-semibold"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Joining...
                          </>
                        ) : (
                          <>
                            Join Club
                            <ChevronRight size={16} />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {clubs.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No clubs available</h3>
            <p className="text-gray-600">Clubs will be added soon. Please check back later.</p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-[#1a1a1a] text-white py-16 px-4 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in-stagger" style={{ animationDelay: '100ms' }}>
            <div className="text-4xl font-bold text-[#d4af37] mb-2">{clubs.length}</div>
            <p className="text-gray-300">Active Clubs</p>
          </div>
          <div className="animate-fade-in-stagger" style={{ animationDelay: '200ms' }}>
            <div className="text-4xl font-bold text-[#d4af37] mb-2">
              {memberships.length}
            </div>
            <p className="text-gray-300">Your Memberships</p>
          </div>
          <div className="animate-fade-in-stagger" style={{ animationDelay: '300ms' }}>
            <div className="text-4xl font-bold text-[#d4af37] mb-2">
              {clubs.reduce((acc, club) => acc + (club.memberCount || 0), 0)}
            </div>
            <p className="text-gray-300">Total Members</p>
          </div>
        </div>
      </div>
    </div>
  );
}
