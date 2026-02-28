"use client"

import { useState } from 'react'
import { Search, ShieldCheck } from 'lucide-react'
import PasswordCard from '@/components/PasswordCard'

export default function SearchableList({ passwords }: { passwords: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  // Logika filter pintar (Cari berdasarkan nama web atau username)
  const filteredPasswords = passwords.filter((pw) => {
    // Fallback property name jaga-jaga kalau nama kolom DB kamu beda
    const website = (pw.websiteName || pw.website || pw.title || '').toLowerCase()
    const username = (pw.accountUsername || pw.username || pw.email || '').toLowerCase()
    const query = searchQuery.toLowerCase()
    
    return website.includes(query) || username.includes(query)
  })

  return (
    <div className="flex flex-col gap-6">
      
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Cari website atau username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Stored Credentials</h2>
        <span className="text-xs font-medium text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
          {filteredPasswords.length} items
        </span>
      </div>

      {/* List Hasil */}
      {filteredPasswords.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500 flex flex-col items-center justify-center bg-zinc-900/20">
          <ShieldCheck className="w-12 h-12 mb-4 text-zinc-700" />
          <p>{searchQuery ? 'Pencarian tidak ditemukan.' : 'Your vault is empty.'}</p>
          <p className="text-sm mt-1">{searchQuery ? 'Coba kata kunci lain bos.' : 'Start securing your passwords using the form on the left.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPasswords.map((pw) => (
            <PasswordCard key={pw.id} pw={pw} />
          ))}
        </div>
      )}
    </div>
  )
}
