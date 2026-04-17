import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-cream-200 border-t border-pine-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 text-cream-100 mb-4">
              <Logo size="sm" />
              <div>
                <p className="font-display text-xl font-semibold tracking-wide">Sugar Sands</p>
                <p className="font-display text-xs tracking-[0.2em] uppercase text-earth-400">
                  Hunting Preserve
                </p>
              </div>
            </div>
            <p className="text-cream-300/70 text-sm leading-relaxed mt-4">
              A private hunting preserve nestled in the pine plantations of South Walton County, Florida.
              Where the love of the outdoors, family, and stewardship come together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream-100 mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/rules", label: "Rules & Regulations" },
                { href: "/gallery", label: "Photo Gallery" },
                { href: "/contact", label: "Contact & Waiting List" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-300/70 hover:text-cream-100 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream-100 mb-4 tracking-wide">
              Location
            </h3>
            <p className="text-cream-300/70 text-sm leading-relaxed">
              South Walton County, Florida
              <br />
              Freeport, FL
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-earth-400 hover:text-earth-300 transition-colors text-sm font-medium"
              >
                Join Our Waiting List
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-pine-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-400/50 text-xs">
            &copy; {new Date().getFullYear()} Sugar Sands Hunting Preserve. All rights reserved.
          </p>
          <p className="text-cream-400/50 text-xs">
            South Walton County, Florida
          </p>
        </div>
      </div>
    </footer>
  );
}
