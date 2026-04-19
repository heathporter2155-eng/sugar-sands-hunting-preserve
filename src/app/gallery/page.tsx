"use client";

import { useState } from "react";
import Image from "next/image";

const PHOTOS = [
  { id: 1, src: "/images/gallery/property-pines-1.jpg", alt: "Pine plantation rows", category: "property" },
  { id: 2, src: "/images/gallery/property-pines-2.jpg", alt: "Pine forest landscape", category: "property" },
  { id: 3, src: "/images/gallery/property-pines-3.jpg", alt: "Longleaf pine stand", category: "property" },
  { id: 4, src: "/images/gallery/property-land-1.jpg", alt: "Preserve grounds", category: "property" },
  { id: 5, src: "/images/gallery/property-aerial-1.jpg", alt: "Aerial view of preserve", category: "property" },
  { id: 6, src: "/images/gallery/wildlife-trailcam-1.jpg", alt: "Trail camera — deer sighting", category: "wildlife" },
  { id: 7, src: "/images/gallery/wildlife-trailcam-2.jpg", alt: "Trail camera — nighttime capture", category: "wildlife" },
  { id: 8, src: "/images/gallery/wildlife-trailcam-3.jpg", alt: "Trail camera — buck", category: "wildlife" },
  { id: 9, src: "/images/gallery/wildlife-trailcam-4.jpg", alt: "Trail camera — wildlife activity", category: "wildlife" },
  { id: 10, src: "/images/gallery/wildlife-trailcam-5.jpg", alt: "Trail camera — deer at food plot", category: "wildlife" },
  { id: 11, src: "/images/gallery/wildlife-trailcam-6.jpg", alt: "Trail camera — whitetail", category: "wildlife" },
  { id: 12, src: "/images/gallery/wildlife-trailcam-7.jpg", alt: "Trail camera — wildlife", category: "wildlife" },
  { id: 13, src: "/images/gallery/wildlife-trailcam-8.jpg", alt: "Trail camera — deer", category: "wildlife" },
  { id: 14, src: "/images/gallery/wildlife-trailcam-9.jpg", alt: "Trail camera — game activity", category: "wildlife" },
  { id: 15, src: "/images/gallery/wildlife-trailcam-10.jpg", alt: "Trail camera — buck sighting", category: "wildlife" },
  { id: 16, src: "/images/gallery/wildlife-trailcam-11.jpg", alt: "Trail camera — deer movement", category: "wildlife" },
  { id: 17, src: "/images/gallery/wildlife-trailcam-12.jpg", alt: "Trail camera — wildlife monitoring", category: "wildlife" },
  { id: 18, src: "/images/gallery/wildlife-trailcam-13.jpg", alt: "Trail camera — game", category: "wildlife" },
  { id: 19, src: "/images/gallery/wildlife-trailcam-14.jpg", alt: "Trail camera — deer at dusk", category: "wildlife" },
  { id: 20, src: "/images/gallery/wildlife-trailcam-15.jpg", alt: "Trail camera — whitetail buck", category: "wildlife" },
  { id: 21, src: "/images/gallery/wildlife-deer-1.jpg", alt: "Whitetail deer on the preserve", category: "wildlife" },
  { id: 22, src: "/images/gallery/hunting-harvest-1.jpg", alt: "Successful deer harvest", category: "harvest" },
  { id: 23, src: "/images/gallery/hunting-harvest-2.jpg", alt: "Hunting season harvest", category: "harvest" },
  { id: 24, src: "/images/gallery/hunting-harvest-3.jpg", alt: "Youth hunting success", category: "harvest" },
  { id: 25, src: "/images/gallery/hunting-harvest-4.jpg", alt: "Turkey harvest", category: "harvest" },
  { id: 26, src: "/images/gallery/hunting-harvest-5.jpg", alt: "Hunting at the preserve", category: "harvest" },
  { id: 27, src: "/images/gallery/hunting-harvest-6.jpg", alt: "Field harvest", category: "harvest" },
];

const CATEGORIES = ["all", "property", "wildlife", "harvest"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === activeCategory);

  const currentIndex = lightbox !== null ? filtered.findIndex((p) => p.id === lightbox) : -1;

  const navigateLightbox = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;
    const newIndex = direction === "prev"
      ? (currentIndex - 1 + filtered.length) % filtered.length
      : (currentIndex + 1) % filtered.length;
    setLightbox(filtered[newIndex].id);
  };

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
              {cat === "all" ? "All Photos" : cat}
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
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
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
            className="absolute top-4 right-4 text-cream-200 hover:text-cream-50 text-3xl z-10"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-200 hover:text-cream-50 text-4xl z-10 p-2"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-200 hover:text-cream-50 text-4xl z-10 p-2"
            aria-label="Next photo"
          >
            ›
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PHOTOS.find((p) => p.id === lightbox)?.src || ""}
              alt={PHOTOS.find((p) => p.id === lightbox)?.alt || ""}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream-300/70 text-sm font-body">
            {PHOTOS.find((p) => p.id === lightbox)?.alt}
          </p>
        </div>
      )}
    </>
  );
}
