import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';
import { addMembership, removeMembership, getUserMemberships } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const session = await validateSession(sessionCookie.value);
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const memberships = await getUserMemberships(session.id);
    return NextResponse.json(memberships, { status: 200 });
  } catch (error) {
    console.error('[v0] Error fetching memberships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memberships' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const session = await validateSession(sessionCookie.value);
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const { clubId } = await request.json();
    if (!clubId) {
      return NextResponse.json(
        { error: 'Club ID is required' },
        { status: 400 }
      );
    }

    console.log('[v0] Adding membership:', session.id, clubId);

    const result = await addMembership(session.id, clubId);
    if (!result) {
      return NextResponse.json(
        { error: 'Already a member of this club' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully joined club' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Error adding membership:', error);
    return NextResponse.json(
      { error: 'Failed to join club' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const session = await validateSession(sessionCookie.value);
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const { clubId } = await request.json();
    if (!clubId) {
      return NextResponse.json(
        { error: 'Club ID is required' },
        { status: 400 }
      );
    }

    console.log('[v0] Removing membership:', session.id, clubId);

    await removeMembership(session.id, clubId);

    return NextResponse.json(
      { message: 'Successfully left club' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Error removing membership:', error);
    return NextResponse.json(
      { error: 'Failed to leave club' },
      { status: 500 }
    );
  }
}
