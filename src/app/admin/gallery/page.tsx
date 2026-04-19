"use client";

import { useState } from "react";
import Image from "next/image";

// Same photo list as gallery — this is the source of truth
const PHOTOS = [
  { id: 1, src: "/images/gallery/property-pines-1.jpg", alt: "Pine plantation rows", category: "harvest" },
  { id: 2, src: "/images/gallery/property-pines-2.jpg", alt: "Pine forest landscape", category: "harvest" },
  { id: 3, src: "/images/gallery/property-pines-3.jpg", alt: "Longleaf pine stand", category: "harvest" },
  { id: 4, src: "/images/gallery/property-land-1.jpg", alt: "Preserve grounds", category: "harvest" },
  { id: 5, src: "/images/gallery/property-aerial-1.jpg", alt: "Aerial view of preserve", category: "harvest" },
  { id: 6, src: "/images/gallery/wildlife-trailcam-1.jpg", alt: "Trail camera — deer sighting", category: "harvest" },
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
  { id: 21, src: "/images/gallery/wildlife-deer-1.jpg", alt: "Whitetail deer on the preserve", category: "harvest" },
  { id: 22, src: "/images/gallery/hunting-harvest-1.jpg", alt: "Successful deer harvest", category: "harvest" },
  { id: 23, src: "/images/gallery/hunting-harvest-2.jpg", alt: "Hunting season harvest", category: "property" },
  { id: 24, src: "/images/gallery/hunting-harvest-3.jpg", alt: "Youth hunting success", category: "harvest" },
  { id: 25, src: "/images/gallery/hunting-harvest-4.jpg", alt: "Turkey harvest", category: "harvest" },
  { id: 26, src: "/images/gallery/hunting-harvest-5.jpg", alt: "Hunting at the preserve", category: "harvest" },
  { id: 27, src: "/images/gallery/hunting-harvest-6.jpg", alt: "Field harvest", category: "property" },
  { id: 28, src: "/images/gallery/photo-117773.jpg", alt: "117773", category: "property" },
  { id: 29, src: "/images/gallery/photo-30673.jpg", alt: "30673", category: "harvest" },
  { id: 30, src: "/images/gallery/photo-FB_IMG_1552229397079.jpg", alt: "FB IMG 1552229397079", category: "harvest" },
  { id: 31, src: "/images/gallery/photo-FB_IMG_1554126148997.jpg", alt: "FB IMG 1554126148997", category: "harvest" },
  { id: 32, src: "/images/gallery/photo-FB_IMG_1593607524106.jpg", alt: "FB IMG 1593607524106", category: "property" },
  { id: 33, src: "/images/gallery/photo-IMG_20120212_103918.jpg", alt: "IMG 20120212 103918", category: "harvest" },
  { id: 34, src: "/images/gallery/photo-IMG_20120213_102344.jpg", alt: "IMG 20120213 102344", category: "harvest" },
  { id: 35, src: "/images/gallery/photo-IMG_20120311_140442.jpg", alt: "IMG 20120311 140442", category: "harvest" },
  { id: 36, src: "/images/gallery/photo-IMG_20120314_092851.jpg", alt: "IMG 20120314 092851", category: "harvest" },
  { id: 37, src: "/images/gallery/photo-IMG_20161009_175656982.jpg", alt: "IMG 20161009 175656982", category: "harvest" },
  { id: 38, src: "/images/gallery/photo-IMG_20161022_125925541_HDR.jpg", alt: "IMG 20161022 125925541 HDR", category: "harvest" },
  { id: 39, src: "/images/gallery/photo-IMG_20170204_224036834.jpg", alt: "IMG 20170204 224036834", category: "harvest" },
  { id: 40, src: "/images/gallery/photo-IMG_20170219_174600754_HDR.jpg", alt: "IMG 20170219 174600754 HDR", category: "harvest" },
  { id: 41, src: "/images/gallery/photo-IMG_20170401_092234515.jpg", alt: "IMG 20170401 092234515", category: "harvest" },
  { id: 42, src: "/images/gallery/photo-IMG_20170408_074103096.jpg", alt: "IMG 20170408 074103096", category: "harvest" },
  { id: 43, src: "/images/gallery/photo-IMG_20170428_111638316.jpg", alt: "IMG 20170428 111638316", category: "harvest" },
  { id: 44, src: "/images/gallery/photo-IMG_20170506_105502019.jpg", alt: "IMG 20170506 105502019", category: "harvest" },
  { id: 45, src: "/images/gallery/photo-IMG_20190323_090827023_BURST000_COVER_TOP.jpg", alt: "IMG 20190323 090827023 BURST000 COVER TOP", category: "property" },
  { id: 46, src: "/images/gallery/photo-IMG_20190324_092056300_HDR.jpg", alt: "IMG 20190324 092056300 HDR", category: "property" },
  { id: 47, src: "/images/gallery/photo-IMG_20190329_122200333.jpg", alt: "IMG 20190329 122200333", category: "property" },
  { id: 48, src: "/images/gallery/photo-IMG_20190331_064748362.jpg", alt: "IMG 20190331 064748362", category: "property" },
  { id: 49, src: "/images/gallery/photo-IMG_20191226_222642648.jpg", alt: "IMG 20191226 222642648", category: "harvest" },
  { id: 50, src: "/images/gallery/photo-IMG_20191226_231022802.jpg", alt: "IMG 20191226 231022802", category: "harvest" },
  { id: 51, src: "/images/gallery/photo-IMG_20200101_225124425.jpg", alt: "IMG 20200101 225124425", category: "harvest" },
  { id: 52, src: "/images/gallery/photo-IMG_20200101_225201612.jpg", alt: "IMG 20200101 225201612", category: "harvest" },
  { id: 53, src: "/images/gallery/photo-IMG_20200314_073657074.jpg", alt: "IMG 20200314 073657074", category: "harvest" },
  { id: 54, src: "/images/gallery/photo-IMG_20200314_074459600.jpg", alt: "IMG 20200314 074459600", category: "property" },
  { id: 55, src: "/images/gallery/photo-IMG_20200315_092343954_BURST000_COVER_TOP.jpg", alt: "IMG 20200315 092343954 BURST000 COVER TOP", category: "harvest" },
  { id: 56, src: "/images/gallery/photo-IMG_20201001_180059120.jpg", alt: "IMG 20201001 180059120", category: "harvest" },
  { id: 57, src: "/images/gallery/photo-IMG_20201115_163605524.jpg", alt: "IMG 20201115 163605524", category: "property" },
  { id: 58, src: "/images/gallery/photo-IMG_20201222_165014002.jpg", alt: "IMG 20201222 165014002", category: "harvest" },
  { id: 59, src: "/images/gallery/photo-IMG_20221231_172223889_BURST000_COVER_TOP.jpg", alt: "IMG 20221231 172223889 BURST000 COVER TOP", category: "harvest" },
  { id: 60, src: "/images/gallery/photo-IMG_20230803_062552870_HDR.jpg", alt: "IMG 20230803 062552870 HDR", category: "property" },
  { id: 61, src: "/images/gallery/photo-IMG_20231125_171617560_HDR.jpg", alt: "IMG 20231125 171617560 HDR", category: "harvest" },
  { id: 62, src: "/images/gallery/photo-IMG_20231125_184951831_BURST000_COVER_TOP.jpg", alt: "IMG 20231125 184951831 BURST000 COVER TOP", category: "harvest" },
  { id: 63, src: "/images/gallery/photo-IMG_20240519_074304334.jpg", alt: "IMG 20240519 074304334", category: "property" },
  { id: 64, src: "/images/gallery/photo-IMG_20240519_074752904.jpg", alt: "IMG 20240519 074752904", category: "property" },
  { id: 65, src: "/images/gallery/photo-IMG_20241130_151433345.jpg", alt: "IMG 20241130 151433345", category: "property" },
  { id: 66, src: "/images/gallery/photo-IMG_20251101_175630987_HDR.jpg", alt: "IMG 20251101 175630987 HDR", category: "harvest" },
  { id: 67, src: "/images/gallery/photo-IMG_20251207_174336315.jpg", alt: "IMG 20251207 174336315", category: "harvest" },
  { id: 68, src: "/images/gallery/photo-IMG_20260116_220030.jpg", alt: "IMG 20260116 220030", category: "wildlife" },
  { id: 69, src: "/images/gallery/photo-IMG_20260417_135047.jpg", alt: "IMG 20260417 135047", category: "wildlife" },
  { id: 70, src: "/images/gallery/photo-IMG_20260417_135135.jpg", alt: "IMG 20260417 135135", category: "wildlife" },
  { id: 71, src: "/images/gallery/photo-IMG_20260417_135138.jpg", alt: "IMG 20260417 135138", category: "wildlife" },
  { id: 72, src: "/images/gallery/photo-IMG_20260417_135142.jpg", alt: "IMG 20260417 135142", category: "wildlife" },
  { id: 73, src: "/images/gallery/photo-IMG_20260417_135148.jpg", alt: "IMG 20260417 135148", category: "wildlife" },
  { id: 74, src: "/images/gallery/photo-IMG_20260417_135151.jpg", alt: "IMG 20260417 135151", category: "wildlife" },
  { id: 75, src: "/images/gallery/photo-IMG_20260417_135201.jpg", alt: "IMG 20260417 135201", category: "wildlife" },
  { id: 76, src: "/images/gallery/photo-IMG_20260417_135207.jpg", alt: "IMG 20260417 135207", category: "wildlife" },
  { id: 77, src: "/images/gallery/photo-IMG_20260417_135257.jpg", alt: "IMG 20260417 135257", category: "wildlife" },
  { id: 78, src: "/images/gallery/photo-IMG_2811.jpg", alt: "IMG 2811", category: "wildlife" },
  { id: 79, src: "/images/gallery/photo-IMG_2812.jpg", alt: "IMG 2812", category: "wildlife" },
  { id: 80, src: "/images/gallery/photo-IMG_2821.jpg", alt: "IMG 2821", category: "wildlife" },
  { id: 81, src: "/images/gallery/photo-IMG_2826.jpg", alt: "IMG 2826", category: "wildlife" },
  { id: 82, src: "/images/gallery/photo-IMG_2903.jpg", alt: "IMG 2903", category: "wildlife" },
  { id: 83, src: "/images/gallery/photo-IMG_2951.jpg", alt: "IMG 2951", category: "wildlife" },
  { id: 84, src: "/images/gallery/photo-IMG_2982.jpg", alt: "IMG 2982", category: "wildlife" },
  { id: 85, src: "/images/gallery/photo-IMG_3055.jpg", alt: "IMG 3055", category: "wildlife" },
  { id: 86, src: "/images/gallery/photo-IMG_3063.jpg", alt: "IMG 3063", category: "wildlife" },
  { id: 87, src: "/images/gallery/photo-IMG_3151.jpg", alt: "IMG 3151", category: "property" },
  { id: 88, src: "/images/gallery/photo-IMG_3165.jpg", alt: "IMG 3165", category: "property" },
  { id: 89, src: "/images/gallery/photo-IMG_3203.jpg", alt: "IMG 3203", category: "wildlife" },
  { id: 90, src: "/images/gallery/photo-IMG_3246.jpg", alt: "IMG 3246", category: "wildlife" },
  { id: 91, src: "/images/gallery/photo-IMG_3251.jpg", alt: "IMG 3251", category: "wildlife" },
  { id: 92, src: "/images/gallery/photo-IMG_3498.jpg", alt: "IMG 3498", category: "harvest" },
  { id: 93, src: "/images/gallery/photo-IMG_9288.jpg", alt: "IMG 9288", category: "harvest" },
  { id: 94, src: "/images/gallery/photo-IMG_9504.jpg", alt: "IMG 9504", category: "harvest" },
  { id: 95, src: "/images/gallery/photo-Screenshot_20200220-094738_2.jpg", alt: "Screenshot 20200220-094738 2", category: "harvest" },
  { id: 96, src: "/images/gallery/photo-Screenshot_20200220-094832_2.jpg", alt: "Screenshot 20200220-094832 2", category: "harvest" },
  { id: 97, src: "/images/gallery/photo-Simply_HDR_1558273674562.jpg", alt: "Simply HDR 1558273674562", category: "harvest" },
  { id: 98, src: "/images/gallery/photo-Temp_2965249-20251216104713-100MFCAM_MFDC8319.jpg", alt: "Temp 2965249-20251216104713-100MFCAM MFDC8319", category: "wildlife" },
];

const CATEGORIES = ["property", "wildlife", "harvest"];

const CATEGORY_COLORS: Record<string, string> = {
  property: "bg-blue-100 text-blue-800 border-blue-300",
  wildlife: "bg-green-100 text-green-800 border-green-300",
  harvest: "bg-amber-100 text-amber-800 border-amber-300",
};

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState(PHOTOS);
  const [changes, setChanges] = useState<Record<number, string>>({});
  const [deletions, setDeletions] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");

  const changeCategory = (id: number, newCategory: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category: newCategory } : p))
    );
    setChanges((prev) => ({ ...prev, [id]: newCategory }));
  };

  const toggleDelete = (id: number) => {
    setDeletions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activePhotos = photos.filter((p) => !deletions.has(p.id));
  const filteredPhotos = filterCat === "all" ? photos : photos.filter((p) => p.category === filterCat);
  const changedCount = Object.keys(changes).length;
  const deletedCount = deletions.size;

  const exportChanges = () => {
    const remaining = photos.filter((p) => !deletions.has(p.id));
    const output = remaining.map(
      (p) => `  { id: ${p.id}, src: "${p.src}", alt: "${p.alt}", category: "${p.category}" },`
    ).join("\n");

    const summary = remaining.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const deletedList = deletions.size > 0
      ? `\n\nDeleted photos (${deletions.size}):\n${[...deletions].map((id) => {
          const photo = PHOTOS.find((p) => p.id === id);
          return `  #${id} "${photo?.alt}" (was ${photo?.category})`;
        }).join("\n")}`
      : "";

    const text = `PHOTO ASSIGNMENTS (${new Date().toLocaleString()})\n\nSummary: ${Object.entries(summary).map(([k, v]) => `${k}: ${v}`).join(", ")} (${remaining.length} total)${deletedList}\n\nChanged photos:\n${Object.entries(changes).filter(([id]) => !deletions.has(Number(id))).map(([id, cat]) => {
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
      {(changedCount > 0 || deletedCount > 0) && (
        <div className="sticky top-20 z-40 bg-earth-100 border-b border-earth-300 py-3 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-bark-700 text-sm font-medium">
              {changedCount > 0 && `${changedCount} changed`}
              {changedCount > 0 && deletedCount > 0 && " · "}
              {deletedCount > 0 && <span className="text-red-600">{deletedCount} marked for deletion</span>}
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
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setFilterCat("all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filterCat === "all" ? "bg-pine-700 text-cream-50 border-pine-700" : "bg-white text-bark-600 border-earth-200 hover:bg-earth-100"
              }`}
            >
              All ({photos.length - deletions.size})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filterCat === cat ? CATEGORY_COLORS[cat] + " ring-1 ring-current" : "bg-white text-bark-600 border-earth-200 hover:bg-earth-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)} ({activePhotos.filter((p) => p.category === cat).length})
              </button>
            ))}
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => {
              const isChanged = changes[photo.id] !== undefined;
              const isDeleted = deletions.has(photo.id);
              return (
                <div
                  key={photo.id}
                  className={`rounded-sm overflow-hidden border-2 ${
                    isDeleted ? "border-red-400 opacity-50" : isChanged ? "border-earth-400" : "border-transparent"
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
                    {isDeleted && (
                      <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                        <span className="text-white text-lg font-bold bg-red-600 px-3 py-1 rounded">DELETED</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-bark-600 text-xs mb-2 truncate">{photo.alt}</p>
                    <div className="flex gap-1 mb-1">
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
                    <button
                      onClick={() => toggleDelete(photo.id)}
                      className={`w-full mt-1 py-1 rounded text-xs font-medium transition-colors ${
                        isDeleted
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {isDeleted ? "↩ Undo Delete" : "🗑 Delete"}
                    </button>
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
