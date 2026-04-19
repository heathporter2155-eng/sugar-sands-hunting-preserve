import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section — everything on the photo, no separate header */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col overflow-hidden">
        <Image
          src="/images/hero-pine-plantation.jpg"
          alt="Pine plantation at Sugar Sands Hunting Preserve"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Title — top of photo, below navbar */}
        <div className="relative z-10 text-center px-4 pt-24 sm:pt-28">
          <h1 className="sr-only">Sugar Sands Hunting Preserve — Private Hunting Club in Watersound, South Walton, Florida</h1>
          <p className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-cream-50 tracking-tight leading-tight">
            Sugar Sands
          </p>
          <p className="font-display text-xl sm:text-3xl md:text-4xl font-medium text-earth-400 mt-1 sm:mt-2 tracking-[0.15em]">
            Hunting Preserve
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tagline + buttons — bottom of photo */}
        <div className="relative z-10 text-center px-4 pb-8 sm:pb-20">
          <div className="divider-ornament my-3 sm:my-6 max-w-xs mx-auto">
            <span className="text-earth-400 text-2xl">⟡</span>
          </div>

          <p className="font-display text-lg sm:text-2xl text-cream-200/90 italic max-w-2xl mx-auto leading-relaxed">
            Where the love of the outdoors, the love of family,
            <br className="hidden sm:block" />
            and the love of stewardship merge as one.
          </p>

          <p className="mt-3 sm:mt-4 text-cream-300/60 text-sm tracking-[0.3em] uppercase font-body">
            South Walton&apos;s Finest &middot; Est. 1999
          </p>

          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/about" className="btn-primary">
              Our Story
            </Link>
            <Link href="/contact" className="btn-secondary">
              Membership Inquiry
            </Link>
          </div>
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
              { src: "/images/gallery/photo-IMG_20190323_090827023_BURST000_COVER_TOP.jpg", alt: "The preserve", span: true },
              { src: "/images/gallery/wildlife-trailcam-3.jpg", alt: "Trail camera — buck" },
              { src: "/images/gallery/photo-IMG_20230803_062552870_HDR.jpg", alt: "Property grounds" },
              { src: "/images/gallery/photo-IMG_20240519_074304334.jpg", alt: "Pine plantation" },
              { src: "/images/gallery/wildlife-trailcam-5.jpg", alt: "Deer at food plot" },
              { src: "/images/gallery/photo-IMG_20241130_151433345.jpg", alt: "Preserve landscape", span: true },
              { src: "/images/gallery/wildlife-trailcam-10.jpg", alt: "Buck sighting" },
              { src: "/images/gallery/photo-IMG_20201115_163605524.jpg", alt: "Property" },
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

      {/* SEO Content Section */}
      <section className="aged-paper py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-earth-500 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
              About the Preserve
            </p>
            <h2 className="section-heading">
              South Walton&apos;s Premier
              <span className="block text-pine-700 italic font-medium">Private Hunting Club</span>
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-bark-700 leading-relaxed space-y-6">
            <p>
              Sugar Sands Hunting Preserve is a private, members-only hunting club located in
              Watersound, Florida — in the heart of South Walton County along the Emerald Coast.
              Established in 1999, our preserve spans hundreds of acres of managed longleaf pine
              plantation, native Florida hardwoods, food plots, and natural wildlife corridors.
            </p>
            <p>
              Our members enjoy deer hunting, turkey hunting, and bear hunting in one of the
              Florida Panhandle&apos;s most carefully managed private properties. We practice
              year-round wildlife management including food plot cultivation, controlled burns,
              timber management, and trail camera monitoring to maintain a healthy, thriving
              ecosystem.
            </p>
            <p>
              Located near Destin, 30A, Freeport, and Santa Rosa Beach, Sugar Sands offers
              a rare opportunity for hunters in the Northwest Florida and Walton County area
              to access quality private hunting land. Unlike public hunting areas, our preserve
              provides an exclusive, well-managed environment where members and their families
              can enjoy the outdoors in a safe, controlled setting.
            </p>
            <p>
              Whether you&apos;re an experienced hunter looking for private hunting land near
              Panama City Beach, a family seeking a hunting club in the Florida Panhandle, or
              someone passionate about wildlife stewardship in South Walton — Sugar Sands
              Hunting Preserve is where tradition, family, and conservation come together.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-earth">
              Inquire About Membership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
