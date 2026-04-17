"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/rules", label: "Rules & Regulations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pine-950/95 backdrop-blur-sm border-b border-pine-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-cream-100 hover:text-cream-200 transition-colors">
            <Logo size="sm" />
            <div className="hidden sm:block">
              <p className="font-display text-lg font-semibold leading-tight tracking-wide">Sugar Sands</p>
              <p className="font-display text-xs tracking-[0.2em] uppercase text-earth-400">Hunting Preserve</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-body font-medium text-cream-200 hover:text-cream-50 hover:bg-pine-800/50 rounded-sm transition-colors tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="ml-4 px-5 py-2 text-sm font-display font-semibold text-pine-950 bg-earth-400 hover:bg-earth-300 rounded-sm transition-colors tracking-wide"
            >
              Member Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-cream-200 hover:text-cream-50"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-pine-950/98 border-t border-pine-800/50">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-cream-200 hover:text-cream-50 hover:bg-pine-800/50 rounded-sm font-body tracking-wide uppercase text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 mt-2 text-center font-display font-semibold text-pine-950 bg-earth-400 hover:bg-earth-300 rounded-sm tracking-wide"
            >
              Member Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
