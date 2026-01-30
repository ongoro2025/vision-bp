import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, sanitizeInput } from '@/lib/validation';
import { storeContactSubmission, addSubscriber } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Ensure all fields exist to avoid 'undefined' errors during validation
    const data = {
      name: body.name || '',
      email: body.email || '',
      subject: body.subject || '',
      message: body.message || ''
    };

    const validation = validateContactForm(data);
    
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Please check your inputs', errors: validation.errors },
        { status: 400 }
      );
    }

    await Promise.all([
      storeContactSubmission(data),
      addSubscriber(data.email, 'contact_form')
    ]);

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}