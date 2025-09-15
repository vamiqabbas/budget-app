"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-500/80 via-sky-500/80 to-emerald-400/80 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">🏗️ BudgetApp</span>
        </div>
        <div className="hidden md:flex gap-2">
          <Link href="/projects"><Button variant="ghost" className="text-white hover:bg-white/10 transition-all duration-150">Projects</Button></Link>
          <Link href="/materials"><Button variant="ghost" className="text-white hover:bg-white/10 transition-all duration-150">Materials</Button></Link>
          <Link href="/budget"><Button variant="ghost" className="text-white hover:bg-white/10 transition-all duration-150">Budget</Button></Link>
          <Link href="/settings"><Button variant="ghost" className="text-white hover:bg-white/10 transition-all duration-150">Settings</Button></Link>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden text-white" aria-label="Open menu" onClick={() => setOpen(v => !v)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden bg-gradient-to-b from-indigo-500/90 via-sky-500/90 to-emerald-400/90 backdrop-blur-md`}> 
        <div className="flex flex-col gap-2 px-6 pb-4 pt-2">
          <Link href="/projects" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full text-white hover:bg-white/10">Projects</Button></Link>
          <Link href="/materials" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full text-white hover:bg-white/10">Materials</Button></Link>
          <Link href="/budget" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full text-white hover:bg-white/10">Budget</Button></Link>
          <Link href="/settings" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full text-white hover:bg-white/10">Settings</Button></Link>
        </div>
      </div>
    </nav>
  );
}
