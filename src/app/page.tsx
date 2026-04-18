import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Logo Header — above hero photo */}
      <div className="bg-pine-950 pt-8 pb-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-sm tracking-[0.5em] uppercase text-cream-400/40 mb-3">
            ✦ &nbsp; ✦ &nbsp; ✦
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream-50 tracking-wide leading-none uppercase">
            Sugar Sands
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-px flex-1 max-w-16 bg-earth-400/40" />
            <span className="text-earth-400 text-lg">⟡</span>
            <div className="h-px flex-1 max-w-16 bg-earth-400/40" />
          </div>
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-cream-100 tracking-[0.25em] uppercase">
            Hunting Preserve
          </p>
          <p className="mt-3 text-cream-400/50 text-xs tracking-[0.3em] uppercase font-body">
            Est. 1999
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col overflow-hidden">
        <Image
          src="/images/hero-pine-plantation.jpg"
          alt="Pine plantation at Sugar Sands Hunting Preserve"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Spacer to push tagline down */}
        <div className="flex-1" />

        {/* Tagline + buttons — bottom of hero */}
        <div className="relative z-10 text-center px-4 pb-20 sm:pb-28">
          <div className="divider-ornament my-6 max-w-xs mx-auto">
            <span className="text-earth-400 text-2xl">⟡</span>
          </div>

          <p className="font-display text-xl sm:text-2xl text-cream-200/90 italic max-w-2xl mx-auto leading-relaxed">
            Where the love of the outdoors, the love of family,
            <br className="hidden sm:block" />
            and the love of stewardship merge as one.
          </p>

          <p className="mt-4 text-cream-300/60 text-sm tracking-[0.3em] uppercase font-body">
            South Walton&apos;s Finest &middot; Est. 1999
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/about" className="btn-primary">
              Our Story
            </Link>
            <Link href="/contact" className="btn-secondary">
              Membership Inquiry
            </Link>
          </div>
        </div>

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
                  "We are caretakers, not just hunters. Through habitat management, wildlife conservation, and responsible land stewardship, we ensure this land thrives for generations to come.",
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

      {/* Photo Strip */}
      <section className="aged-paper py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-earth-500 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Life at the Preserve
          </p>
          <h2 className="section-heading mb-12">From the Field</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "/images/gallery/property-pines-1.jpg", alt: "Pine plantation", span: true },
              { src: "/images/gallery/wildlife-trailcam-1.jpg", alt: "Trail camera wildlife" },
              { src: "/images/gallery/hunting-harvest-1.jpg", alt: "Successful harvest" },
              { src: "/images/gallery/property-pines-2.jpg", alt: "Pine rows" },
              { src: "/images/gallery/wildlife-deer-1.jpg", alt: "Whitetail deer" },
              { src: "/images/gallery/hunting-harvest-4.jpg", alt: "Turkey harvest", span: true },
              { src: "/images/gallery/property-land-1.jpg", alt: "Preserve landscape" },
              { src: "/images/gallery/wildlife-trailcam-2.jpg", alt: "Trail cam capture" },
            ].map((photo, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-sm ${
                  photo.span ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="aspect-square relative">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes={photo.span ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link href="/gallery" className="btn-earth mt-12">
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 overflow-hidden">
        <Image
          src="/images/cta-pines.jpg"
          alt="Pine forest"
          fill
          className="object-cover"
          quality={70}
        />
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
