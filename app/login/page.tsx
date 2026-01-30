'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Login successful! Redirecting...');
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        const error = await response.json();
        setStatus('error');
        setMessage(error.error || 'Login failed');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Please try again later');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Vision Blueprints account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d4af37] disabled:opacity-50"
              disabled={status === 'loading'}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d4af37] disabled:opacity-50"
              disabled={status === 'loading'}
            />
            <div className="text-right mt-2">
              <Link href="/forgot-password" className="text-sm text-[#d4af37] hover:text-[#c19a1a]">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#1a1a1a] hover:bg-gray-900 text-white font-semibold py-3 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
            {status === 'loading' ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm font-semibold">{message}</p>
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-semibold">{message}</p>
            </div>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-2 border-[#d4af37] text-[#1a1a1a] hover:bg-gray-100 flex items-center justify-center gap-2"
            onClick={() => {
              const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${window.location.origin}/api/auth/google/callback`)}&response_type=code&scope=openid%20profile%20email`;
              window.location.href = googleAuthUrl;
            }}
          >
            <Mail size={18} />
            Sign in with Google
          </Button>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#d4af37] hover:text-[#c19a1a] font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
