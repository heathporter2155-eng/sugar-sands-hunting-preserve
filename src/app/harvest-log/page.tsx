"use client";

import { useState } from "react";

export default function HarvestLogPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    date: "",
    memberName: "",
    gameType: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = `New Harvest Log Entry

Date: ${form.date}
Member: ${form.memberName}
Game Type: ${form.gameType}
Notes: ${form.notes || "None"}`;

    try {
      const res = await fetch("/api/send-harvest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "heathporter2155@gmail.com",
          subject: `Harvest Log — ${form.memberName} (${form.date})`,
          body,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Members Only
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Harvest Log
          </h1>
          <p className="mt-4 font-display text-xl text-cream-200/80 italic">
            Record your hunt — share the story
          </p>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <span className="text-5xl block mb-4">🦌</span>
              <h2 className="font-display text-2xl font-semibold text-bark-900 mb-2">
                Entry Submitted!
              </h2>
              <p className="text-bark-500 mb-6">
                Your harvest has been sent to Heath. Thank you for logging your hunt!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ date: "", memberName: "", gameType: "", notes: "" });
                }}
                className="btn-primary"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <>
              <div className="card-plantation p-8 mb-8">
                <p className="text-bark-600 text-sm font-body mb-6">
                  Fill out the form below to log a harvest. If you have a photo to share, email it
                  directly to{" "}
                  <a
                    href="mailto:heathporter2155@gmail.com"
                    className="text-pine-700 hover:text-pine-800 font-medium"
                  >
                    heathporter2155@gmail.com
                  </a>{" "}
                  and include your name and the harvest date.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-bark-800 text-sm font-body font-medium mb-1">
                      Date of Harvest <span className="text-rust-600">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-earth-300 font-body text-bark-800 focus:outline-none focus:ring-2 focus:ring-pine-500"
                    />
                  </div>

                  <div>
                    <label className="block text-bark-800 text-sm font-body font-medium mb-1">
                      Member Name <span className="text-rust-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.memberName}
                      onChange={(e) => setForm({ ...form, memberName: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-earth-300 font-body text-bark-800 placeholder-bark-400 focus:outline-none focus:ring-2 focus:ring-pine-500"
                    />
                  </div>

                  <div>
                    <label className="block text-bark-800 text-sm font-body font-medium mb-1">
                      Game Type <span className="text-rust-600">*</span>
                    </label>
                    <select
                      required
                      value={form.gameType}
                      onChange={(e) => setForm({ ...form, gameType: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-earth-300 font-body text-bark-800 focus:outline-none focus:ring-2 focus:ring-pine-500"
                    >
                      <option value="">Select game type</option>
                      <option value="Whitetail Deer">Whitetail Deer</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-bark-800 text-sm font-body font-medium mb-1">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell the story — stand location, weather, rack score, etc."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-earth-300 font-body text-bark-800 placeholder-bark-400 focus:outline-none focus:ring-2 focus:ring-pine-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Harvest Entry"}
                  </button>
                </form>
              </div>

              <p className="text-center text-bark-400 text-xs font-body italic">
                Photos may be emailed directly to{" "}
                <a
                  href="mailto:heathporter2155@gmail.com"
                  className="text-pine-700 hover:text-pine-800"
                >
                  heathporter2155@gmail.com
                </a>{" "}
                with your name and harvest date.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}