import { jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'ieiogdjksdhjhklwuio58u4786898wuiyghjkhdsjghgh'
);

// JWT token functions
export async function signToken(payload: any, expiresIn: string = '7d') {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (expiresIn === '7d' ? 7 * 24 * 60 * 60 : 24 * 60 * 60);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate verification token
export function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Google OAuth helper
export function getGoogleAuthUrl(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/google/callback`;
  
  const scope = encodeURIComponent('openid profile email');
  const responseType = 'code';
  const accessType = 'offline';
  
  return `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=${responseType}&` +
    `scope=${scope}&` +
    `access_type=${accessType}`;
}

// Exchange Google auth code for tokens
export async function exchangeGoogleCode(code: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange Google code');
  }

  return response.json();
}

// Get Google user info
export async function getGoogleUserInfo(accessToken: string) {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Google user info');
  }

  return response.json();
}

// Session management
export interface UserSession {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  clubType?: 'personal' | 'schools';
  memberships?: string[];
  iat?: number;
  exp?: number;
}

export async function createSession(user: Partial<UserSession>): Promise<string> {
  return signToken(user, '7d');
}

export async function validateSession(token: string): Promise<UserSession | null> {
  const payload = await verifyToken(token);
  if (!payload) return null;
  return payload as UserSession;
}
