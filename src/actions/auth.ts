'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setupMasterAccount(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const existingUsers = db.select().from(users).all();
  if (existingUsers.length > 0) return { error: 'Master account already exists!' };
  
  const hash = await bcrypt.hash(password, 10);
  db.insert(users).values({ username, passwordHash: hash }).run();
  
  const cookieStore = await cookies();
  cookieStore.set('auth_session', username, { httpOnly: true });
  redirect('/');
}

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const user = db.select().from(users).where(eq(users.username, username)).get();
  if (!user) throw new Error('Invalid credentials');
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid credentials');
  
  const cookieStore = await cookies();
  cookieStore.set('auth_session', username, { httpOnly: true });
  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_session');
  redirect('/login');
}
