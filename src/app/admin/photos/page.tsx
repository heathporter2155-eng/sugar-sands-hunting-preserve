"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface StoragePhoto {
  id: string;
  name: string;
  path: string;
  url: string;
  category: string;
  createdAt: string;
}

const CATEGORIES = ["property", "wildlife", "harvest"];

export default function AdminGalleryManagePage() {
  const [pending, setPending] = useState<StoragePhoto[]>([]);
  const [approved, setApproved] = useState<StoragePhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [approveCategory, setApproveCategory] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<"pending" | "approved">("pending");

  const fetchPhotos = async () => {
    setLoading(true);
    const [pendingRes, approvedRes] = await Promise.all([
      fetch("/api/gallery/list?status=pending"),
      fetch("/api/gallery/list?status=approved"),
    ]);
    const pendingData = await pendingRes.json();
    const approvedData = await approvedRes.json();
    setPending(pendingData.photos || []);
    setApproved(approvedData.photos || []);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleApprove = async (photo: StoragePhoto) => {
    const cat = approveCategory[photo.path] || "property";
    setActionLoading(photo.path);
    const res = await fetch("/api/gallery/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: photo.path, category: cat }),
    });
    if (res.ok) {
      await fetchPhotos();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to approve");
    }
    setActionLoading(null);
  };

  const handleReject = async (photo: StoragePhoto) => {
    if (!confirm("Delete this pending photo?")) return;
    setActionLoading(photo.path);
    await fetch("/api/gallery/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: photo.path }),
    });
    await fetchPhotos();
    setActionLoading(null);
  };

  const handleDelete = async (photo: StoragePhoto) => {
    if (!confirm(`Delete "${photo.name}" from the gallery? This can't be undone.`)) return;
    setActionLoading(photo.path);
    await fetch("/api/gallery/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: photo.path }),
    });
    await fetchPhotos();
    setActionLoading(null);
  };

  return (
    <>
      <section className="relative pt-32 pb-8 px-4 bg-pine-950">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            Photo Management
          </h1>
          <p className="text-cream-300/60 mt-3 text-sm">
            Approve member uploads and manage gallery photos
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-earth-100 border-b border-earth-200 py-3 px-4">
        <div className="max-w-6xl mx-auto flex gap-4 justify-center">
          <button
            onClick={() => setTab("pending")}
            className={`px-5 py-2 rounded-sm text-sm font-medium transition-colors ${
              tab === "pending"
                ? "bg-earth-600 text-cream-50"
                : "bg-cream-50 text-bark-600 hover:bg-earth-200"
            }`}
          >
            ⏳ Pending ({pending.length})
          </button>
          <button
            onClick={() => setTab("approved")}
            className={`px-5 py-2 rounded-sm text-sm font-medium transition-colors ${
              tab === "approved"
                ? "bg-pine-700 text-cream-50"
                : "bg-cream-50 text-bark-600 hover:bg-earth-200"
            }`}
          >
            ✅ Approved ({approved.length})
          </button>
        </div>
      </section>

      <section className="aged-paper py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-bark-400">Loading photos...</p>
            </div>
          ) : tab === "pending" ? (
            pending.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">📭</span>
                <p className="text-bark-400 text-lg">No pending uploads to review</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pending.map((photo) => (
                  <div key={photo.path} className="bg-white rounded-sm shadow-sm border border-earth-200 overflow-hidden">
                    <div className="relative aspect-square">
                      <Image src={photo.url} alt={photo.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <p className="text-bark-500 text-xs mb-3 truncate">{photo.name}</p>
                      {/* Category selector */}
                      <div className="flex gap-1 mb-3">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setApproveCategory((prev) => ({ ...prev, [photo.path]: cat }))}
                            className={`flex-1 px-1 py-1.5 rounded text-xs font-medium transition-all ${
                              (approveCategory[photo.path] || "property") === cat
                                ? "bg-pine-700 text-cream-50"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            }`}
                          >
                            {cat === "property" ? "🌲" : cat === "wildlife" ? "🦌" : "🎯"} {cat}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(photo)}
                          disabled={actionLoading === photo.path}
                          className="flex-1 bg-pine-700 text-cream-50 py-2 rounded-sm text-sm font-medium hover:bg-pine-800 disabled:opacity-50"
                        >
                          {actionLoading === photo.path ? "..." : "✅ Approve"}
                        </button>
                        <button
                          onClick={() => handleReject(photo)}
                          disabled={actionLoading === photo.path}
                          className="px-4 bg-red-100 text-red-700 py-2 rounded-sm text-sm font-medium hover:bg-red-200 disabled:opacity-50"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            approved.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">📷</span>
                <p className="text-bark-400 text-lg">No uploaded photos yet</p>
                <p className="text-bark-300 text-sm mt-2">Static gallery photos are managed in the Gallery Manager</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {approved.map((photo) => (
                  <div key={photo.path} className="bg-white rounded-sm shadow-sm border border-earth-200 overflow-hidden group">
                    <div className="relative aspect-square">
                      <Image src={photo.url} alt={photo.name} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                      <div className="absolute top-2 left-2">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          photo.category === "property" ? "bg-blue-100 text-blue-800" :
                          photo.category === "wildlife" ? "bg-green-100 text-green-800" :
                          "bg-amber-100 text-amber-800"
                        }`}>
                          {photo.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => handleDelete(photo)}
                        disabled={actionLoading === photo.path}
                        className="w-full text-red-600 hover:text-red-800 text-xs font-medium py-1 disabled:opacity-50"
                      >
                        {actionLoading === photo.path ? "Deleting..." : "🗑 Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
