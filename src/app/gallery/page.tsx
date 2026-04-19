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
  { id: 28, src: "/images/gallery/photo-117773.jpg", alt: "117773", category: "property" },
  { id: 29, src: "/images/gallery/photo-30673.jpg", alt: "30673", category: "property" },
  { id: 30, src: "/images/gallery/photo-FB_IMG_1552229397079.jpg", alt: "FB IMG 1552229397079", category: "property" },
  { id: 31, src: "/images/gallery/photo-FB_IMG_1554126148997.jpg", alt: "FB IMG 1554126148997", category: "property" },
  { id: 32, src: "/images/gallery/photo-FB_IMG_1593607524106.jpg", alt: "FB IMG 1593607524106", category: "property" },
  { id: 33, src: "/images/gallery/photo-IMG_20120212_103918.jpg", alt: "IMG 20120212 103918", category: "property" },
  { id: 34, src: "/images/gallery/photo-IMG_20120213_102344.jpg", alt: "IMG 20120213 102344", category: "property" },
  { id: 35, src: "/images/gallery/photo-IMG_20120311_140442.jpg", alt: "IMG 20120311 140442", category: "property" },
  { id: 36, src: "/images/gallery/photo-IMG_20120314_092851.jpg", alt: "IMG 20120314 092851", category: "property" },
  { id: 37, src: "/images/gallery/photo-IMG_20161009_175656982.jpg", alt: "IMG 20161009 175656982", category: "property" },
  { id: 38, src: "/images/gallery/photo-IMG_20161022_125925541_HDR.jpg", alt: "IMG 20161022 125925541 HDR", category: "property" },
  { id: 39, src: "/images/gallery/photo-IMG_20170204_224036834.jpg", alt: "IMG 20170204 224036834", category: "property" },
  { id: 40, src: "/images/gallery/photo-IMG_20170219_174600754_HDR.jpg", alt: "IMG 20170219 174600754 HDR", category: "property" },
  { id: 41, src: "/images/gallery/photo-IMG_20170401_092234515.jpg", alt: "IMG 20170401 092234515", category: "property" },
  { id: 42, src: "/images/gallery/photo-IMG_20170408_074103096.jpg", alt: "IMG 20170408 074103096", category: "property" },
  { id: 43, src: "/images/gallery/photo-IMG_20170428_111638316.jpg", alt: "IMG 20170428 111638316", category: "property" },
  { id: 44, src: "/images/gallery/photo-IMG_20170506_105502019.jpg", alt: "IMG 20170506 105502019", category: "property" },
  { id: 45, src: "/images/gallery/photo-IMG_20190323_090827023_BURST000_COVER_TOP.jpg", alt: "IMG 20190323 090827023 BURST000 COVER TOP", category: "property" },
  { id: 46, src: "/images/gallery/photo-IMG_20190324_092056300_HDR.jpg", alt: "IMG 20190324 092056300 HDR", category: "property" },
  { id: 47, src: "/images/gallery/photo-IMG_20190329_122200333.jpg", alt: "IMG 20190329 122200333", category: "property" },
  { id: 48, src: "/images/gallery/photo-IMG_20190331_064748362.jpg", alt: "IMG 20190331 064748362", category: "property" },
  { id: 49, src: "/images/gallery/photo-IMG_20191226_222642648.jpg", alt: "IMG 20191226 222642648", category: "property" },
  { id: 50, src: "/images/gallery/photo-IMG_20191226_231022802.jpg", alt: "IMG 20191226 231022802", category: "property" },
  { id: 51, src: "/images/gallery/photo-IMG_20200101_225124425.jpg", alt: "IMG 20200101 225124425", category: "property" },
  { id: 52, src: "/images/gallery/photo-IMG_20200101_225201612.jpg", alt: "IMG 20200101 225201612", category: "property" },
  { id: 53, src: "/images/gallery/photo-IMG_20200314_073657074.jpg", alt: "IMG 20200314 073657074", category: "property" },
  { id: 54, src: "/images/gallery/photo-IMG_20200314_074459600.jpg", alt: "IMG 20200314 074459600", category: "property" },
  { id: 55, src: "/images/gallery/photo-IMG_20200315_092343954_BURST000_COVER_TOP.jpg", alt: "IMG 20200315 092343954 BURST000 COVER TOP", category: "property" },
  { id: 56, src: "/images/gallery/photo-IMG_20201001_180059120.jpg", alt: "IMG 20201001 180059120", category: "property" },
  { id: 57, src: "/images/gallery/photo-IMG_20201115_163605524.jpg", alt: "IMG 20201115 163605524", category: "property" },
  { id: 58, src: "/images/gallery/photo-IMG_20201222_165014002.jpg", alt: "IMG 20201222 165014002", category: "property" },
  { id: 59, src: "/images/gallery/photo-IMG_20221231_172223889_BURST000_COVER_TOP.jpg", alt: "IMG 20221231 172223889 BURST000 COVER TOP", category: "property" },
  { id: 60, src: "/images/gallery/photo-IMG_20230803_062552870_HDR.jpg", alt: "IMG 20230803 062552870 HDR", category: "property" },
  { id: 61, src: "/images/gallery/photo-IMG_20231125_171617560_HDR.jpg", alt: "IMG 20231125 171617560 HDR", category: "property" },
  { id: 62, src: "/images/gallery/photo-IMG_20231125_184951831_BURST000_COVER_TOP.jpg", alt: "IMG 20231125 184951831 BURST000 COVER TOP", category: "property" },
  { id: 63, src: "/images/gallery/photo-IMG_20240519_074304334.jpg", alt: "IMG 20240519 074304334", category: "property" },
  { id: 64, src: "/images/gallery/photo-IMG_20240519_074752904.jpg", alt: "IMG 20240519 074752904", category: "property" },
  { id: 65, src: "/images/gallery/photo-IMG_20241130_151433345.jpg", alt: "IMG 20241130 151433345", category: "property" },
  { id: 66, src: "/images/gallery/photo-IMG_20251101_175630987_HDR.jpg", alt: "IMG 20251101 175630987 HDR", category: "property" },
  { id: 67, src: "/images/gallery/photo-IMG_20251207_174336315.jpg", alt: "IMG 20251207 174336315", category: "property" },
  { id: 68, src: "/images/gallery/photo-IMG_20260116_220030.jpg", alt: "IMG 20260116 220030", category: "property" },
  { id: 69, src: "/images/gallery/photo-IMG_20260417_135047.jpg", alt: "IMG 20260417 135047", category: "property" },
  { id: 70, src: "/images/gallery/photo-IMG_20260417_135135.jpg", alt: "IMG 20260417 135135", category: "property" },
  { id: 71, src: "/images/gallery/photo-IMG_20260417_135138.jpg", alt: "IMG 20260417 135138", category: "property" },
  { id: 72, src: "/images/gallery/photo-IMG_20260417_135142.jpg", alt: "IMG 20260417 135142", category: "property" },
  { id: 73, src: "/images/gallery/photo-IMG_20260417_135148.jpg", alt: "IMG 20260417 135148", category: "property" },
  { id: 74, src: "/images/gallery/photo-IMG_20260417_135151.jpg", alt: "IMG 20260417 135151", category: "property" },
  { id: 75, src: "/images/gallery/photo-IMG_20260417_135201.jpg", alt: "IMG 20260417 135201", category: "property" },
  { id: 76, src: "/images/gallery/photo-IMG_20260417_135207.jpg", alt: "IMG 20260417 135207", category: "property" },
  { id: 77, src: "/images/gallery/photo-IMG_20260417_135257.jpg", alt: "IMG 20260417 135257", category: "property" },
  { id: 78, src: "/images/gallery/photo-IMG_2811.jpg", alt: "IMG 2811", category: "property" },
  { id: 79, src: "/images/gallery/photo-IMG_2812.jpg", alt: "IMG 2812", category: "property" },
  { id: 80, src: "/images/gallery/photo-IMG_2821.jpg", alt: "IMG 2821", category: "property" },
  { id: 81, src: "/images/gallery/photo-IMG_2826.jpg", alt: "IMG 2826", category: "property" },
  { id: 82, src: "/images/gallery/photo-IMG_2903.jpg", alt: "IMG 2903", category: "property" },
  { id: 83, src: "/images/gallery/photo-IMG_2951.jpg", alt: "IMG 2951", category: "property" },
  { id: 84, src: "/images/gallery/photo-IMG_2982.jpg", alt: "IMG 2982", category: "property" },
  { id: 85, src: "/images/gallery/photo-IMG_3055.jpg", alt: "IMG 3055", category: "property" },
  { id: 86, src: "/images/gallery/photo-IMG_3063.jpg", alt: "IMG 3063", category: "property" },
  { id: 87, src: "/images/gallery/photo-IMG_3151.jpg", alt: "IMG 3151", category: "property" },
  { id: 88, src: "/images/gallery/photo-IMG_3165.jpg", alt: "IMG 3165", category: "property" },
  { id: 89, src: "/images/gallery/photo-IMG_3203.jpg", alt: "IMG 3203", category: "property" },
  { id: 90, src: "/images/gallery/photo-IMG_3246.jpg", alt: "IMG 3246", category: "property" },
  { id: 91, src: "/images/gallery/photo-IMG_3251.jpg", alt: "IMG 3251", category: "property" },
  { id: 92, src: "/images/gallery/photo-IMG_3498.jpg", alt: "IMG 3498", category: "property" },
  { id: 93, src: "/images/gallery/photo-IMG_9288.jpg", alt: "IMG 9288", category: "property" },
  { id: 94, src: "/images/gallery/photo-IMG_9504.jpg", alt: "IMG 9504", category: "property" },
  { id: 95, src: "/images/gallery/photo-Screenshot_20200220-094738_2.jpg", alt: "Screenshot 20200220-094738 2", category: "property" },
  { id: 96, src: "/images/gallery/photo-Screenshot_20200220-094832_2.jpg", alt: "Screenshot 20200220-094832 2", category: "property" },
  { id: 97, src: "/images/gallery/photo-Simply_HDR_1558273674562.jpg", alt: "Simply HDR 1558273674562", category: "property" },
  { id: 98, src: "/images/gallery/photo-Temp_2965249-20251216104713-100MFCAM_MFDC8319.jpg", alt: "Temp 2965249-20251216104713-100MFCAM MFDC8319", category: "property" },
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
