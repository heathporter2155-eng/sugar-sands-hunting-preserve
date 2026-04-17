import Link from "next/link";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport with plantation atmosphere */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background - will be replaced with real photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-pine-plantation.jpg')",
            backgroundColor: "#1a2e14",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Decorative border frame */}
        <div className="absolute inset-4 sm:inset-8 border border-cream-200/20 rounded-sm pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Logo size="lg" className="text-cream-100" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-cream-50 tracking-tight leading-tight">
            Sugar Sands
            <span className="block text-earth-400 text-3xl sm:text-4xl md:text-5xl font-medium mt-2 tracking-[0.15em]">
              Hunting Preserve
            </span>
          </h1>

          <div className="divider-ornament my-8 max-w-xs mx-auto">
            <span className="text-earth-400 text-2xl">⟡</span>
          </div>

          <p className="font-display text-xl sm:text-2xl text-cream-200/90 italic max-w-2xl mx-auto leading-relaxed">
            Where the love of the outdoors, the love of family,
            <br className="hidden sm:block" />
            and the love of stewardship come together.
          </p>

          <p className="mt-4 text-cream-300/60 text-sm tracking-[0.3em] uppercase font-body">
            South Walton County, Florida &middot; Est. on Pine Plantation Land
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/about" className="btn-primary">
              Our Story
            </Link>
            <Link href="/contact" className="btn-secondary">
              Membership Inquiry
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-cream-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mission Preview */}
      <section className="aged-paper py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-500 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Our Mission
          </p>
          <h2 className="section-heading">
            Rooted in Tradition,
            <span className="block text-pine-700 italic font-medium">Grounded in Stewardship</span>
          </h2>
          <div className="divider-ornament my-8 max-w-xs mx-auto">
            <span className="text-earth-400 text-xl">✦</span>
          </div>
          <p className="text-lg text-bark-700 leading-relaxed max-w-3xl mx-auto">
            Sugar Sands Hunting Preserve is more than a hunting club — it&apos;s a covenant with the land.
            Nestled among the longleaf pines of South Walton County, our preserve brings together
            families and friends who share a deep reverence for Florida&apos;s wild places. We believe
            that responsible stewardship, time-honored traditions, and the bonds forged in the field
            are the foundation of a life well lived.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-8 text-pine-700 hover:text-pine-800 font-display font-semibold text-lg transition-colors"
          >
            Read Our Full Story
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-pine-950 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
              Our Pillars
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
              Three Loves, One Land
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌲",
                title: "The Outdoors",
                description:
                  "Hundreds of acres of managed pine plantation, food plots, and native Florida habitat. From dawn hunts to evening campfires, this land is alive with purpose.",
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family",
                description:
                  "Sugar Sands is a place where generations come together. Where children learn to respect the land, and where memories are made that last a lifetime.",
              },
              {
                icon: "🌿",
                title: "Stewardship",
                description:
                  "We are caretakers, not just hunters. Through habitat management, controlled burns, and wildlife conservation, we ensure this land thrives for generations to come.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="text-center p-8 border border-pine-800/50 rounded-sm bg-pine-900/30"
              >
                <span className="text-5xl block mb-6">{pillar.icon}</span>
                <h3 className="font-display text-2xl font-semibold text-cream-100 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-cream-300/70 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Strip / Gallery Preview */}
      <section className="aged-paper py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-earth-500 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Life at the Preserve
          </p>
          <h2 className="section-heading mb-12">From the Field</h2>

          {/* Photo grid placeholder - will use real photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-sm ${
                  i === 1 || i === 6 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="aspect-square bg-pine-200 flex items-center justify-center">
                  <span className="text-pine-400 text-sm font-body">Photo {i}</span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/gallery" className="btn-earth mt-12">
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* CTA - Join */}
      <section className="relative py-24 px-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/cta-pines.jpg')", backgroundColor: "#2a3b24" }}>
        <div className="absolute inset-0 bg-pine-950/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-50 tracking-tight mb-6">
            Become Part of the Tradition
          </h2>
          <p className="text-cream-200/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Membership at Sugar Sands is by invitation and availability. If you share our values
            of conservation, family, and respect for the land, we&apos;d love to hear from you.
          </p>
          <Link href="/contact" className="btn-primary text-xl px-12 py-4">
            Join the Waiting List
          </Link>
        </div>
      </section>
    </>
  );
}
