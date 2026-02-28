import { db } from '@/db';
import { passwords, users } from '@/db/schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq, desc } from 'drizzle-orm';
import { addPassword } from '@/actions/vault';
import { logout } from '@/actions/auth';
import { ShieldCheck, LogOut, Plus, LockKeyhole } from 'lucide-react';
import SearchableList from '@/components/SearchableList';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get('auth_session')?.value;
  if (!session) redirect('/login');

  const user = db.select().from(users).where(eq(users.username, session)).get();
  if (!user) redirect('/login');

  const userPasswords = db.select()
    .from(passwords)
    .where(eq(passwords.userId, user.id))
    .orderBy(desc(passwords.createdAt))
    .all();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-blue-500/30">
      
      {/* Top Navigation Bar */}
      <nav className="border-b border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/20">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Personal Vault</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {user.username}
            </div>
            <form action={logout}>
              <button type="submit" className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Add Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-500" />
                New Credential
              </h2>
              <form action={addPassword} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Platform / Website</label>
                  <input type="text" name="websiteName" required className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" placeholder="e.g. GitHub" />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Username / Email</label>
                  <input type="text" name="accountUsername" required className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" placeholder="ozzie@example.com" />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Password</label>
                  <input type="password" name="accountPassword" required className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-4 flex justify-center items-center gap-2">
                  <LockKeyhole className="w-4 h-4" />
                  Save to Vault
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel: Searchable Password List */}
          <div className="lg:col-span-8">
            <SearchableList passwords={userPasswords} />
          </div>

        </div>
      </main>
    </div>
  );
}
