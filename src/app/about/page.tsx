import Link from "next/link";

export const metadata = {
  title: "About Us | Sugar Sands Hunting Preserve",
  description: "Learn about Sugar Sands Hunting Preserve — our mission, our land, and our commitment to stewardship in South Walton County, Florida.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            About Us
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Our Story
          </h1>
          <p className="mt-4 font-display text-xl text-cream-200/80 italic">
            A legacy rooted in Florida&apos;s pine country
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="aged-paper py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Mission</h2>
            <div className="divider-ornament my-6 max-w-xs mx-auto">
              <span className="text-earth-400 text-xl">✦</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-bark-700 space-y-6 leading-relaxed">
            <p className="text-xl font-display italic text-pine-800 text-center">
              To bring together the love of the outdoors, the love of family,
              and the love of stewardship on the land we are blessed to call home.
            </p>

            <p>
              Sugar Sands Hunting Preserve was born from a simple truth: the best moments in life
              happen outdoors, with the people you love, on land you care for. Set among the towering
              longleaf pines and sugar-white sand trails of South Walton County, Florida, our preserve
              is a place where time slows down and what matters most comes into focus.
            </p>

            <p>
              This isn&apos;t a commercial operation. It&apos;s a private club of like-minded individuals
              and families who believe that hunting is more than a sport — it&apos;s a way of life.
              It&apos;s teaching your son or daughter to sit still in a deer stand at dawn. It&apos;s
              the satisfaction of managing habitat so wildlife can thrive. It&apos;s the fellowship
              around a campfire after a long day in the field.
            </p>

            <h3 className="font-display text-2xl font-semibold text-bark-900 mt-12">
              The Land
            </h3>
            <p>
              Our preserve sits on a working pine plantation in the heart of South Walton County —
              one of Florida&apos;s most beautiful and ecologically diverse regions. The property
              features managed pine stands, native understory, strategically placed food plots,
              and natural water features that support a thriving population of whitetail deer,
              Eastern wild turkey, black bear, and a rich variety of native wildlife.
            </p>

            <h3 className="font-display text-2xl font-semibold text-bark-900 mt-12">
              Stewardship First
            </h3>
            <p>
              We take our role as stewards seriously. Through prescribed burns, selective timber
              management, food plot cultivation, and wildlife monitoring, we actively manage the
              land to promote biodiversity and healthy game populations. Every decision we make
              is guided by a simple question: <em>will this land be better for the next generation?</em>
            </p>

            <h3 className="font-display text-2xl font-semibold text-bark-900 mt-12">
              Family & Fellowship
            </h3>
            <p>
              Sugar Sands is a place where families grow together. Where children learn respect
              for nature, patience, and responsibility. Where friendships are forged over shared
              experiences in the field. Our members aren&apos;t just hunters — they&apos;re
              conservationists, mentors, and neighbors who share a deep connection to this land
              and to each other.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-pine-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-cream-50 text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🦌", title: "Conservation", desc: "Active wildlife management and habitat preservation for future generations." },
              { icon: "🔥", title: "Tradition", desc: "Honoring the time-tested practices that connect us to the land and each other." },
              { icon: "🤝", title: "Community", desc: "A brotherhood of families united by shared values and mutual respect." },
              { icon: "🌾", title: "Responsibility", desc: "Ethical hunting, safe practices, and accountability to the land and our members." },
            ].map((v) => (
              <div key={v.title} className="text-center p-6 border border-pine-800/50 rounded-sm">
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="font-display text-xl font-semibold text-cream-100 mb-2">{v.title}</h3>
                <p className="text-cream-300/70 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="aged-paper py-16 px-4 text-center">
        <h2 className="section-heading mb-4">Interested in Membership?</h2>
        <p className="text-bark-600 text-lg mb-8 max-w-xl mx-auto">
          We welcome inquiries from those who share our passion for the outdoors and commitment to stewardship.
        </p>
        <Link href="/contact" className="btn-primary">
          Join the Waiting List
        </Link>
      </section>
    </>
  );
}
