import { db } from '@/db';
import { users } from '@/db/schema';
import { setupMasterAccount, login } from '@/actions/auth';
import { LockKeyhole, User, ShieldCheck, Database, ChevronRight, Fingerprint } from 'lucide-react';

export default async function LoginPage() {
  const existingUsers = db.select().from(users).all();
  const hasMaster = existingUsers.length > 0;

  return (
    <div className="flex w-screen h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* Kolom Kiri - Branding Dark Mode */}
      <div className="hidden lg:flex flex-[1.2] flex-col justify-between p-16 bg-zinc-950 border-r border-zinc-800/80 relative overflow-hidden">
        
        {/* Efek Cahaya Biru Samar di Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-100">Personal Vault</span>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-100 mb-6 leading-tight">
            Secure your <br /> digital life, <br />
            <span className="text-blue-500">offline.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
            All your master credentials stored locally on your device with robust SQLite isolation.
          </p>
        </div>

        {/* Ilustrasi Keamanan Dark Mode */}
        <div className="relative z-10 opacity-80">
          <Database className="w-48 h-48 text-zinc-800/50" />
          <Fingerprint className="w-20 h-20 text-blue-500 absolute top-[40%] left-[20%] -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Kolom Kanan - Form Login Dark Mode */}
      <div className="flex-[1] flex items-center justify-center p-8 relative bg-[#09090b]">
        
        <div className="w-full max-w-md space-y-8 z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-full border border-zinc-800 mb-6">
              <LockKeyhole className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mb-2">
              {hasMaster ? 'Vault Authentication' : 'Initialize Vault'}
            </h2>
            <p className="text-zinc-400">
              {hasMaster 
                ? 'Enter your master credentials to decrypt.' 
                : 'Create a master account to secure your vault.'}
            </p>
          </div>

          <div className="bg-zinc-900/60 p-8 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-md">
            <form action={hasMaster ? login : setupMasterAccount} className="space-y-5">
              
              <div>
                <label className="text-xs font-semibold text-zinc-400 mb-2 block uppercase tracking-wider">Master Username</label>
                <div className="relative group">
                  <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                    placeholder="e.g. root"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 mb-2 block uppercase tracking-wider">Master Password</label>
                <div className="relative group">
                  <LockKeyhole className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600 font-mono"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-6 flex justify-center items-center gap-2"
              >
                {hasMaster ? 'Decrypt & Enter' : 'Create Master Account'}
                <ChevronRight className="w-4 h-4" />
              </button>

            </form>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xs text-zinc-600 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Local storage only. Zero internet required.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
