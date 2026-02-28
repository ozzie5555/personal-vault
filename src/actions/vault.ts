'use server';
import { db } from '@/db';
import { passwords, users } from '@/db/schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq, and } from 'drizzle-orm';

// Helper function untuk cek login
async function getUserOrRedirect() {
  const cookieStore = await cookies();
  const session = cookieStore.get('auth_session')?.value;
  if (!session) redirect('/login');
  const user = db.select().from(users).where(eq(users.username, session)).get();
  if (!user) redirect('/login');
  return user;
}

export async function addPassword(formData: FormData) {
  const user = await getUserOrRedirect();
  db.insert(passwords).values({
    userId: user.id,
    websiteName: formData.get('websiteName') as string,
    accountUsername: formData.get('accountUsername') as string,
    accountPassword: formData.get('accountPassword') as string,
  }).run();
  redirect('/');
}

export async function updatePassword(formData: FormData) {
  const user = await getUserOrRedirect();
  const id = Number(formData.get('id'));
  
  db.update(passwords).set({
    websiteName: formData.get('websiteName') as string,
    accountUsername: formData.get('accountUsername') as string,
    accountPassword: formData.get('accountPassword') as string,
  }).where(and(eq(passwords.id, id), eq(passwords.userId, user.id))).run();
  
  redirect('/');
}

export async function deletePassword(formData: FormData) {
  const user = await getUserOrRedirect();
  const id = Number(formData.get('id'));
  
  db.delete(passwords).where(and(eq(passwords.id, id), eq(passwords.userId, user.id))).run();
  redirect('/');
}
