import { NextRequest, NextResponse } from 'next/server';
import { findAllClubs } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const clubs = await findAllClubs();
    return NextResponse.json(clubs, { status: 200 });
  } catch (error) {
    console.error('[v0] Error fetching clubs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
}
