import { NextRequest, NextResponse } from 'next/server';
import { exchangeGoogleCode, getGoogleUserInfo, createSession } from '@/lib/auth';
import { 
  findUserByGoogleId, 
  findUserByEmail, 
  createUser, 
  addMembership, 
  findAllClubs,
  addSubscriber,
  updateUser 
} from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/login?error=no_code', request.url));
    }

    // Exchange code for user info
    const tokens = await exchangeGoogleCode(code);
    const userInfo = await getGoogleUserInfo(tokens.access_token);

    // Find or Create User
    let user = await findUserByGoogleId(userInfo.id);
    if (!user) {
      user = await findUserByEmail(userInfo.email);
    }

    if (!user) {
      // Create new user
      const result = await createUser({
        name: userInfo.name,
        email: userInfo.email,
        googleId: userInfo.id,
        avatar: userInfo.picture,
        emailVerified: true,
      });

      const userId = result.insertedId.toString();

      // AUTO-SUBSCRIBE to newsletter
      await addSubscriber(userInfo.email, 'google_signup');

      // Auto-join to the Personal Growth club
      const clubs = await findAllClubs();
      const personalClub = clubs.find((club: any) => club.type === 'personal');
      if (personalClub) {
        await addMembership(userId, personalClub._id.toString());
      }

      user = {
        _id: result.insertedId,
        name: userInfo.name,
        email: userInfo.email,
        clubType: 'personal',
      };
    } else if (!user.googleId) {
      // Link Google account to existing email account
      await updateUser(user._id.toString(), {
        googleId: userInfo.id,
        avatar: userInfo.picture,
        emailVerified: true,
      });
    }

    // Create session
    const session = await createSession({
      id: user._id?.toString(),
      email: user.email,
      name: user.name,
    });

    // Explicitly set cookie on the redirect response
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    
    response.cookies.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}