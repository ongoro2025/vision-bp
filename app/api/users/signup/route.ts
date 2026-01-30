import { NextRequest, NextResponse } from 'next/server';
import { validateSignupForm } from '@/lib/validation';
import { hashPassword, generateVerificationToken, createSession } from '@/lib/auth';
import { findUserByEmail, createUser, addMembership, findAllClubs } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword, clubType } = await request.json();

    // Validation
    const validation = validateSignupForm({ name, email, password, confirmPassword, clubType });
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    console.log('[v0] User signup attempt:', email);

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    const verificationToken = generateVerificationToken();

    // Create user
    const result = await createUser({
      name,
      email,
      password: hashedPassword,
      clubType,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const userId = result.insertedId.toString();

    // Auto-join user to their selected club type
    const clubs = await findAllClubs();
    const selectedClub = clubs.find((club: any) => club.type === clubType);
    if (selectedClub) {
      await addMembership(userId, selectedClub._id.toString());
    }

    // Create session
    const session = await createSession({
      id: userId,
      email,
      name,
      clubType,
    });

    // TODO: Send verification email with link containing verificationToken
    console.log('[v0] Verification token:', verificationToken);

    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        userId,
        clubType,
      },
      { status: 201 }
    );

    // Set session cookie
    response.cookies.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[v0] Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
