import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

interface MongoCache {
  conn: Db | null;
  promise: Promise<Db> | null;
}

let cached = (global as any).mongooseConnection as MongoCache | undefined;

if (!cached) {
  cached = (global as any).mongooseConnection = { conn: null, promise: null };
}

export async function connectDB(): Promise<Db> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    cached!.promise = (async () => {
      const client = new MongoClient(mongoUri);
      await client.connect();
      const db = client.db('vision-blueprints');
      cachedClient = client;
      await createIndexes(db);
      return db;
    })();
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

async function createIndexes(db: Db) {
  try {
    // Users
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ googleId: 1 }, { sparse: true });
    
    // Clubs
    await db.collection('clubs').createIndex({ slug: 1 }, { unique: true });
    
    // Memberships
    await db.collection('memberships').createIndex({ userId: 1, clubId: 1 }, { unique: true });

    // Newsletter Subscribers
    await db.collection('subscribers').createIndex({ email: 1 }, { unique: true });

    // Contact form submissions
    await db.collection('contact_submissions').createIndex({ createdAt: -1 });
    
    console.log('[v0] Database indexes verified');
  } catch (error) {
    console.log('[v0] Index creation error:', error);
  }
}

/** NEWSLETTER & CONTACT OPERATIONS **/

export async function addSubscriber(email: string, source = 'newsletter_footer') {
  const db = await connectDB();
  const normalizedEmail = email.toLowerCase();
  
  return await db.collection('subscribers').updateOne(
    { email: normalizedEmail },
    { 
      $set: { email: normalizedEmail, lastInteraction: new Date() },
      $setOnInsert: { 
        subscribedAt: new Date(), 
        status: 'active',
        source: source 
      } 
    },
    { upsert: true }
  );
}

export async function storeContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const db = await connectDB();
  return await db.collection('contact_submissions').insertOne({
    ...data,
    email: data.email.toLowerCase(),
    createdAt: new Date(),
    status: 'unread'
  });
}

/** USER OPERATIONS **/

export async function findUserByEmail(email: string) {
  const db = await connectDB();
  return db.collection('users').findOne({ email: email.toLowerCase() });
}

export async function findUserByGoogleId(googleId: string) {
  const db = await connectDB();
  return db.collection('users').findOne({ googleId });
}

export async function findUserById(id: string) {
  const db = await connectDB();
  try {
    return db.collection('users').findOne({ _id: new ObjectId(id) });
  } catch {
    return null;
  }
}

export async function createUser(userData: any) {
  const db = await connectDB();
  const result = await db.collection('users').insertOne({
    ...userData,
    email: userData.email.toLowerCase(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result;
}

export async function updateUser(id: string, updates: any) {
  const db = await connectDB();
  try {
    return db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );
  } catch {
    return null;
  }
}

/** CLUB & MEMBERSHIP OPERATIONS **/

export async function findClubBySlug(slug: string) {
  const db = await connectDB();
  return db.collection('clubs').findOne({ slug });
}

export async function findAllClubs() {
  const db = await connectDB();
  return db.collection('clubs').find({}).toArray();
}

export async function addMembership(userId: string, clubId: string) {
  const db = await connectDB();
  try {
    return db.collection('memberships').insertOne({
      userId: new ObjectId(userId),
      clubId: new ObjectId(clubId),
      joinedAt: new Date(),
      status: 'active',
    });
  } catch (error) {
    return null;
  }
}

export async function getUserMemberships(userId: string) {
  const db = await connectDB();
  try {
    return db.collection('memberships').find({ userId: new ObjectId(userId) }).toArray();
  } catch {
    return [];
  }
}

export async function removeMembership(userId: string, clubId: string) {
  const db = await connectDB();
  try {
    return db.collection('memberships').deleteOne({
      userId: new ObjectId(userId),
      clubId: new ObjectId(clubId),
    });
  } catch {
    return null;
  }
}

declare global {
  var mongooseConnection: MongoCache | undefined;
}