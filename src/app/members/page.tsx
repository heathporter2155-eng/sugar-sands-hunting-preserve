import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Member Map | Sugar Sands Hunting Preserve",
  description: "Interactive Huntstand map for Sugar Sands Hunting Preserve members. View property boundaries, stand locations, and wildlife management areas.",
};

const HUNTSTAND_URL = "https://app.huntstand.com/dl2/share_huntarea?guid=8fd9b03b-35ff-4558-ba81-17656047bc77";

export default function MembersPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Members Only
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Property Map
          </h1>
          <p className="mt-4 font-display text-xl text-cream-200/80 italic">
            Interactive Huntstand map — property boundaries and stand locations
          </p>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <p className="text-bark-600 text-sm font-body">
              Use the map below to view property boundaries, stand locations, and food plot areas.
              For the best experience, open in the Huntstand app.
            </p>
          </div>

          <div className="relative w-full" style={{paddingBottom: '62.5%'}}>
            <iframe
              src={HUNTSTAND_URL}
              title="Sugar Sands Hunting Preserve — Huntstand Property Map"
              className="absolute inset-0 w-full h-full rounded-sm border border-earth-200"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <a
              href={HUNTSTAND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open in Huntstand App
            </a>
            <Link href="/contact" className="btn-earth">
              Contact Us
            </Link>
          </div>

          <p className="text-center text-bark-400 text-xs mt-6 font-body italic">
            Map access is for Sugar Sands members only. For access or questions,{" "}
            <Link href="/contact" className="text-pine-700 hover:text-pine-800 font-medium">
              contact the preserve
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
