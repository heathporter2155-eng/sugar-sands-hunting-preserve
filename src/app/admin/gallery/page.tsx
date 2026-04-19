"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
  sort_order: number;
}

const CATEGORIES = ["property", "wildlife", "harvest"];

const CATEGORY_COLORS: Record<string, string> = {
  property: "bg-blue-100 text-blue-800 border-blue-300",
  wildlife: "bg-green-100 text-green-800 border-green-300",
  harvest: "bg-amber-100 text-amber-800 border-amber-300",
};

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [original, setOriginal] = useState<Photo[]>([]);
  const [deletions, setDeletions] = useState<Set<number>>(new Set());
  const [changes, setChanges] = useState<Record<number, string>>({});
  const [filterCat, setFilterCat] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/gallery/photos");
    const data = await res.json();
    setPhotos(data.photos || []);
    setOriginal(data.photos || []);
    setDeletions(new Set());
    setChanges({});
    setSaveMsg("");
    setLoading(false);
  }, []);

  useEffect(() => { fetchPhotos(); }, [fetchPhotos]);

  const changeCategory = (id: number, newCategory: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category: newCategory } : p))
    );
    const orig = original.find((p) => p.id === id);
    if (orig && orig.category !== newCategory) {
      setChanges((prev) => ({ ...prev, [id]: newCategory }));
    } else {
      setChanges((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
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
  const changedCount = Object.keys(changes).filter((id) => !deletions.has(Number(id))).length;
  const deletedCount = deletions.size;
  const hasChanges = changedCount > 0 || deletedCount > 0;

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");

    const updates = Object.entries(changes)
      .filter(([id]) => !deletions.has(Number(id)))
      .map(([id, category]) => ({ id: Number(id), category }));

    const res = await fetch("/api/gallery/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updates,
        deletions: [...deletions],
      }),
    });

    if (res.ok) {
      setSaveMsg(`Saved! ${updates.length} updated, ${deletions.size} deleted.`);
      await fetchPhotos();
    } else {
      const data = await res.json();
      setSaveMsg(`Error: ${data.error || "Save failed"}`);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <>
        <section className="relative pt-32 pb-8 px-4 bg-pine-950">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="font-display text-4xl font-bold text-cream-50">Gallery Manager</h1>
          </div>
        </section>
        <section className="aged-paper py-20 text-center">
          <p className="text-bark-400">Loading photos...</p>
        </section>
      </>
    );
  }

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
            Change categories and delete photos directly. Hit Save when done.
          </p>
        </div>
      </section>

      {/* Sticky action bar */}
      {hasChanges && (
        <div className="sticky top-20 z-40 bg-earth-100 border-b border-earth-300 py-3 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-bark-700 text-sm font-medium">
              {changedCount > 0 && `${changedCount} recategorized`}
              {changedCount > 0 && deletedCount > 0 && " · "}
              {deletedCount > 0 && <span className="text-red-600">{deletedCount} marked for deletion</span>}
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "💾 Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* Save confirmation */}
      {saveMsg && (
        <div className={`py-3 px-4 text-center text-sm font-medium ${saveMsg.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800"}`}>
          {saveMsg}
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
