"use client";

import { useState } from "react";
import Image from "next/image";

// Same photo list as gallery — this is the source of truth
const INITIAL_PHOTOS = [
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

const CATEGORIES = ["property", "wildlife", "harvest"];

const CATEGORY_COLORS: Record<string, string> = {
  property: "bg-blue-100 text-blue-800 border-blue-300",
  wildlife: "bg-green-100 text-green-800 border-green-300",
  harvest: "bg-amber-100 text-amber-800 border-amber-300",
};

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [changes, setChanges] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);

  const changeCategory = (id: number, newCategory: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category: newCategory } : p))
    );
    setChanges((prev) => ({ ...prev, [id]: newCategory }));
  };

  const changedCount = Object.keys(changes).length;

  const exportChanges = () => {
    const output = photos.map(
      (p) => `  { id: ${p.id}, src: "${p.src}", alt: "${p.alt}", category: "${p.category}" },`
    ).join("\n");

    const summary = photos.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const text = `PHOTO ASSIGNMENTS (${new Date().toLocaleString()})\n\nSummary: ${Object.entries(summary).map(([k, v]) => `${k}: ${v}`).join(", ")}\n\nChanged photos:\n${Object.entries(changes).map(([id, cat]) => {
      const photo = photos.find((p) => p.id === Number(id));
      return `  #${id} "${photo?.alt}" → ${cat}`;
    }).join("\n")}\n\nFull array:\n[\n${output}\n]`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <>
      <section className="relative pt-32 pb-8 px-4 bg-pine-950">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            Gallery Manager
          </h1>
          <p className="text-cream-300/60 mt-3 text-sm">
            Tap a category button under each photo to reassign it. Then copy your changes and send to Carla.
          </p>
        </div>
      </section>

      {/* Sticky action bar */}
      {changedCount > 0 && (
        <div className="sticky top-20 z-40 bg-earth-100 border-b border-earth-300 py-3 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-bark-700 text-sm font-medium">
              {changedCount} photo{changedCount !== 1 ? "s" : ""} changed
            </p>
            <button
              onClick={exportChanges}
              className="btn-primary text-sm"
            >
              {copied ? "✅ Copied!" : "📋 Copy Changes"}
            </button>
          </div>
        </div>
      )}

      <section className="aged-paper py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border ${CATEGORY_COLORS[cat]}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)} ({photos.filter((p) => p.category === cat).length})
              </span>
            ))}
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => {
              const isChanged = changes[photo.id] !== undefined;
              return (
                <div
                  key={photo.id}
                  className={`rounded-sm overflow-hidden border-2 ${
                    isChanged ? "border-earth-400" : "border-transparent"
                  } bg-white shadow-sm`}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-pine-950/70 text-cream-100 text-xs px-2 py-0.5 rounded">
                        #{photo.id}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-bark-600 text-xs mb-2 truncate">{photo.alt}</p>
                    <div className="flex gap-1">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => changeCategory(photo.id, cat)}
                          className={`flex-1 px-1 py-1.5 rounded text-xs font-medium transition-all ${
                            photo.category === cat
                              ? CATEGORY_COLORS[cat] + " border ring-1 ring-offset-1 ring-current"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200 border border-gray-200"
                          }`}
                        >
                          {cat === "property" ? "🌲" : cat === "wildlife" ? "🦌" : "🎯"}{" "}
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
