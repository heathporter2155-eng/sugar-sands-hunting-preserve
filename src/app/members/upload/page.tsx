"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const CATEGORIES = ["property", "wildlife", "harvest"];

export default function MemberUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState("property");
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus("idle");
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Upload failed");
        setStatus("error");
        return;
      }

      if (data.status === "pending") {
        setMessage("Photo submitted for admin approval. Thanks!");
      } else {
        setMessage("Photo uploaded and live in the gallery!");
      }
      setStatus("success");
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      setMessage("Something went wrong. Try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-12 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Members
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            Upload Photo
          </h1>
          <p className="text-cream-300/60 mt-3 text-sm">
            Share your photos from the preserve. Admin will review before they go live.
          </p>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-xl mx-auto">
          <div className="card-plantation p-8">
            {/* File picker */}
            <div className="mb-6">
              <label className="block text-sm font-body font-medium text-bark-700 mb-2">
                Select Photo
              </label>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="w-full text-sm text-bark-600 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-pine-700 file:text-cream-50 hover:file:bg-pine-800"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="mb-6 relative aspect-video rounded-sm overflow-hidden bg-pine-100">
                <Image src={preview} alt="Preview" fill className="object-contain" />
              </div>
            )}

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-body font-medium text-bark-700 mb-2">
                Category
              </label>
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex-1 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                      category === cat
                        ? "bg-pine-700 text-cream-50"
                        : "bg-cream-100 text-bark-600 hover:bg-earth-200 border border-earth-200"
                    }`}
                  >
                    {cat === "property" ? "🌲" : cat === "wildlife" ? "🦌" : "🎯"}{" "}
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Status messages */}
            {status === "success" && (
              <div className="mb-6 bg-pine-50 border border-pine-200 rounded-sm p-3">
                <p className="text-pine-800 text-sm font-medium">✅ {message}</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-sm p-3">
                <p className="text-red-700 text-sm">{message}</p>
              </div>
            )}

            {/* Upload button */}
            <button
              onClick={handleUpload}
              disabled={!file || status === "uploading"}
              className="btn-primary w-full disabled:opacity-50"
            >
              {status === "uploading" ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
