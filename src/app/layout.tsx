import type { Metadata } from "next";
import "./globals.css";
import { Github } from "lucide-react";

// 1. Ganti Metadata untuk Title Tab Browser & SEO
export const metadata: Metadata = {
  title: "Personal Vault | By Itsmeozzie",
  description: "Secure offline password manager developed by Itsmeozzie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Setup Flexbox agar Footer selalu nempel di paling bawah layar */}
      <body className="bg-[#09090b] text-zinc-100 font-sans antialiased flex flex-col min-h-screen">
        
        {/* Area Konten Utama (Dashboard / Login) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* 3. Global Footer: Developer Credits Itsmeozzie */}
        <footer className="border-t border-zinc-800/80 bg-zinc-950 py-5 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-zinc-500 font-medium">
            <span>Securely engineered by</span>
            <a 
              href="https://github.com/ozzie5555?tab=overview&from=2026-02-01&to=2026-02-27" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 font-bold flex items-center gap-1.5 transition-colors bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 hover:bg-blue-500/20"
            >
              <Github className="w-4 h-4" />
              Itsmeozzie
            </a>
          </div>
        </footer>

      </body>
    </html>
  );
}
