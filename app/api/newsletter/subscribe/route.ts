import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/lib/validation';
import { sendEmail, getNewsletterWelcomeTemplate } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('[v0] Newsletter subscription for:', email);

    // TODO: Check if email already subscribed in database
    // TODO: Generate and store verification token
    // TODO: Send verification email

    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to Vision Blueprints Newsletter',
        html: getNewsletterWelcomeTemplate(email),
      });
    } catch (emailError) {
      console.error('[v0] Email sending failed:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      { message: 'Subscription initiated. Check your email to confirm.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
