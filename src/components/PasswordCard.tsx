'use client';

import { useState } from 'react';
import { updatePassword, deletePassword } from '@/actions/vault';
import { Eye, EyeOff, Copy, Check, Trash2, Edit2, Globe, User } from 'lucide-react';

export default function PasswordCard({ pw }: { pw: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pw.accountPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isEditing) {
    return (
      <div className="bg-zinc-900/80 backdrop-blur p-5 rounded-xl border border-blue-500/50 shadow-2xl transition-all">
        <form action={updatePassword} onSubmit={() => setIsEditing(false)} className="space-y-4">
          <input type="hidden" name="id" value={pw.id} />
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1 block">Platform / Website</label>
            <input type="text" name="websiteName" defaultValue={pw.websiteName} required className="w-full bg-zinc-950/50 border border-zinc-700 rounded-lg p-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1 block">Username / Email</label>
            <input type="text" name="accountUsername" defaultValue={pw.accountUsername} required className="w-full bg-zinc-950/50 border border-zinc-700 rounded-lg p-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1 block">Password</label>
            <input type="text" name="accountPassword" defaultValue={pw.accountPassword} required className="w-full bg-zinc-950/50 border border-zinc-700 rounded-lg p-2 text-sm text-white focus:border-blue-500 outline-none transition-colors font-mono" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors flex-1">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 transition-colors flex-1">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-all group relative shadow-sm hover:shadow-md">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-zinc-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            {pw.websiteName}
          </h3>
          <p className="text-sm text-zinc-400 flex items-center gap-2 mt-1">
            <User className="w-3 h-3 text-zinc-500" />
            {pw.accountUsername}
          </p>
        </div>
        
        {/* Action Buttons (Edit & Delete) */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <form action={deletePassword}>
            <input type="hidden" name="id" value={pw.id} />
            <button type="submit" className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Password Field */}
      <div className="bg-zinc-950 p-1 rounded-lg border border-zinc-800/80 flex items-center justify-between group/pw">
        <code className="text-sm px-3 py-1.5 text-zinc-300 font-mono tracking-wider overflow-hidden text-ellipsis">
          {showPassword ? pw.accountPassword : '••••••••••••'}
        </code>
        <div className="flex gap-1 pr-1">
          <button onClick={() => setShowPassword(!showPassword)} className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-md transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button onClick={copyToClipboard} className="p-1.5 text-zinc-500 hover:text-green-400 hover:bg-green-500/10 rounded-md transition-colors" title="Copy">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
