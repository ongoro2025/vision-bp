'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Check your email to confirm subscription!');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Please try again later.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#1a1a1a] to-gray-900 rounded-lg p-12 md:p-16 border border-[#d4af37] border-opacity-30">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive exclusive insights, new resources, and special member opportunities delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              disabled={status === 'loading'}
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === 'loading'}
              className="bg-[#d4af37] hover:bg-[#c19a1a] text-[#1a1a1a] font-semibold px-8 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 text-center text-[#ffd700] text-sm font-semibold">
              ✓ {message}
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 text-center text-red-400 text-sm font-semibold">
              ✗ {message}
            </div>
          )}

          <p className="text-center text-gray-400 text-xs mt-8">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
