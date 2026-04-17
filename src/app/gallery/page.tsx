"use client";

import { useState } from "react";

// Placeholder photos - will be replaced with Supabase storage
const SAMPLE_PHOTOS = [
  { id: 1, src: "/images/gallery/photo-1.jpg", alt: "Pine plantation at sunrise", category: "property" },
  { id: 2, src: "/images/gallery/photo-2.jpg", alt: "Whitetail buck on trail cam", category: "wildlife" },
  { id: 3, src: "/images/gallery/photo-3.jpg", alt: "Turkey in the pines", category: "wildlife" },
  { id: 4, src: "/images/gallery/photo-4.jpg", alt: "Deer stand at dawn", category: "hunting" },
  { id: 5, src: "/images/gallery/photo-5.jpg", alt: "Food plot management", category: "stewardship" },
  { id: 6, src: "/images/gallery/photo-6.jpg", alt: "Successful harvest", category: "hunting" },
  { id: 7, src: "/images/gallery/photo-7.jpg", alt: "Pine rows at sunset", category: "property" },
  { id: 8, src: "/images/gallery/photo-8.jpg", alt: "Trail camera capture", category: "wildlife" },
];

const CATEGORIES = ["all", "property", "wildlife", "hunting", "stewardship"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? SAMPLE_PHOTOS
    : SAMPLE_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Photo Gallery
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            From the Field
          </h1>
          <p className="mt-4 font-display text-xl text-cream-200/80 italic">
            Moments captured on the preserve
          </p>
        </div>
      </section>

      {/* Member upload notice */}
      <section className="bg-earth-100 border-b border-earth-200 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-bark-600 text-sm">
            📸 Members can submit photos for the gallery after logging in.
          </p>
          <a href="/auth/login" className="text-pine-700 hover:text-pine-800 text-sm font-semibold">
            Member Login →
          </a>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="aged-paper py-8 px-4 border-b border-earth-200">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-sm text-sm font-body font-medium tracking-wide uppercase transition-colors ${
                activeCategory === cat
                  ? "bg-pine-700 text-cream-50"
                  : "bg-cream-100 text-bark-600 hover:bg-earth-200 border border-earth-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="aged-paper py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setLightbox(photo.id)}
                className="group relative aspect-square overflow-hidden rounded-sm bg-pine-100 focus:outline-none focus:ring-2 focus:ring-pine-500"
              >
                {/* Placeholder - will be real images */}
                <div className="absolute inset-0 bg-pine-200 flex items-center justify-center">
                  <span className="text-pine-400 text-xs font-body">{photo.alt}</span>
                </div>
                <div className="absolute inset-0 bg-pine-950/0 group-hover:bg-pine-950/30 transition-colors duration-300 flex items-end">
                  <p className="p-3 text-cream-50 text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.alt}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-bark-400 text-lg">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-pine-950/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-cream-200 hover:text-cream-50 text-3xl"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="max-w-4xl max-h-[80vh] bg-pine-200 rounded-sm flex items-center justify-center p-20">
            <p className="text-pine-500">
              {SAMPLE_PHOTOS.find((p) => p.id === lightbox)?.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
