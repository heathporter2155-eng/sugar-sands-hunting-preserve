"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LogHarvestPage() {
  const router = useRouter();
  const [memberName, setMemberName] = useState("");
  const [gameType, setGameType] = useState<string>("whitetail_deer");
  const [harvestDate, setHarvestDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUserId(user.id);
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      if (profile?.full_name) {
        setMemberName(profile.full_name);
      }
    };
    loadProfile();
  }, [router]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = createClient();
      let photoUrl: string | null = null;

      // Upload photo if provided
      if (photo) {
        const fileExt = photo.name.split(".").pop();
        const fileName = `${userId}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("harvest-photos")
          .upload(fileName, photo);

        if (uploadError) {
          setErrorMsg(`Photo upload failed: ${uploadError.message}`);
          setStatus("error");
          return;
        }

        const { data: urlData } = supabase.storage
          .from("harvest-photos")
          .getPublicUrl(fileName);

        photoUrl = urlData.publicUrl;
      }

      // Insert harvest log entry
      const { error: insertError } = await supabase.from("harvest_log").insert({
        member_id: userId,
        member_name: memberName,
        game_type: gameType,
        harvest_date: harvestDate,
        notes: notes || null,
        photo_url: photoUrl,
      });

      if (insertError) {
        setErrorMsg(insertError.message);
        setStatus("error");
        return;
      }

      setStatus("success");
      setTimeout(() => {
        router.push("/members");
        router.refresh();
      }, 1500);
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Members Only
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            Log a Harvest
          </h1>
          <p className="text-cream-300/60 mt-3 text-sm">
            Record your harvest for the season log
          </p>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/members"
            className="inline-flex items-center text-pine-700 hover:text-pine-800 text-sm font-medium mb-6"
          >
            ← Back to Harvest Log
          </Link>

          {status === "success" ? (
            <div className="card-plantation p-12 text-center">
              <span className="text-5xl block mb-4">🎉</span>
              <h2 className="font-display text-2xl font-semibold text-bark-900 mb-2">
                Harvest Logged!
              </h2>
              <p className="text-bark-600">
                Your harvest has been recorded. Redirecting...
              </p>
            </div>
          ) : (
            <div className="card-plantation p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Member Name */}
                <div>
                  <label
                    htmlFor="memberName"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Member Name
                  </label>
                  <input
                    id="memberName"
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                {/* Game Type */}
                <div>
                  <label
                    htmlFor="gameType"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Game Type
                  </label>
                  <select
                    id="gameType"
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  >
                    <option value="whitetail_deer">Whitetail Deer</option>
                    <option value="turkey">Turkey</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Harvest Date */}
                <div>
                  <label
                    htmlFor="harvestDate"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Harvest Date
                  </label>
                  <input
                    id="harvestDate"
                    type="date"
                    required
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Notes{" "}
                    <span className="text-bark-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent resize-none"
                    placeholder="Weight, points, location on property, etc."
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label
                    htmlFor="photo"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Photo{" "}
                    <span className="text-bark-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-pine-100 file:text-pine-800 hover:file:bg-pine-200"
                  />
                  <p className="text-bark-400 text-xs mt-1">
                    JPEG, PNG, or WebP. Max 5MB.
                  </p>
                  {photoPreview && (
                    <div className="mt-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="max-w-xs rounded-sm border border-earth-200"
                      />
                    </div>
                  )}
                </div>

                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-3">
                    <p className="text-red-700 text-sm">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting..." : "Log Harvest"}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
