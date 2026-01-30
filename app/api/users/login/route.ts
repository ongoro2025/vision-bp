import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/lib/validation';
import { comparePasswords, createSession } from '@/lib/auth';
import { findUserByEmail } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('[v0] Login attempt:', email);

    // Fetch user from database
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify email is confirmed
    if (!user.emailVerified && !user.googleId) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
        { status: 403 }
      );
    }

    // Compare password
    const passwordMatch = await comparePasswords(password, user.password || '');
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session
    const session = await createSession({
      id: user._id?.toString(),
      email: user.email,
      name: user.name,
      clubType: user.clubType,
    });

    const response = NextResponse.json(
      {
        message: 'Login successful',
        userId: user._id?.toString(),
      },
      { status: 200 }
    );

    response.cookies.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('[v0] Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
