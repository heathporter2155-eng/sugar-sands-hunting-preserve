"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "FL",
    huntingExperience: "",
    referredBy: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", email: "", phone: "", city: "", state: "FL", huntingExperience: "", referredBy: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Membership Inquiry
          </h1>
          <p className="mt-4 font-display text-xl text-cream-200/80 italic">
            Join our waiting list for future membership openings
          </p>
        </div>
      </section>

      <section className="aged-paper py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading">Join the Waiting List</h2>
            <p className="mt-4 text-bark-600 text-lg max-w-2xl mx-auto">
              Membership at Sugar Sands Hunting Preserve is limited to ensure quality
              experiences and responsible land management. Fill out the form below to be
              added to our waiting list, and we&apos;ll reach out when a spot becomes available.
            </p>
          </div>

          {status === "success" ? (
            <div className="bg-pine-50 border border-pine-300 rounded-sm p-8 text-center">
              <span className="text-5xl block mb-4">🌲</span>
              <h3 className="font-display text-2xl font-semibold text-pine-800 mb-2">
                Thank You for Your Interest
              </h3>
              <p className="text-pine-700">
                We&apos;ve received your inquiry and added you to our waiting list.
                We&apos;ll be in touch when a membership opening becomes available.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-body font-medium text-bark-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-body font-medium text-bark-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-body font-medium text-bark-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-body font-medium text-bark-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-body font-medium text-bark-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-body font-medium text-bark-700 mb-1">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="huntingExperience" className="block text-sm font-body font-medium text-bark-700 mb-1">
                  Hunting Experience
                </label>
                <select
                  id="huntingExperience"
                  value={form.huntingExperience}
                  onChange={(e) => setForm({ ...form, huntingExperience: e.target.value })}
                  className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (3-10 years)</option>
                  <option value="experienced">Experienced (10+ years)</option>
                  <option value="lifelong">Lifelong Hunter</option>
                </select>
              </div>

              <div>
                <label htmlFor="referredBy" className="block text-sm font-body font-medium text-bark-700 mb-1">
                  Referred By (if applicable)
                </label>
                <input
                  id="referredBy"
                  type="text"
                  value={form.referredBy}
                  onChange={(e) => setForm({ ...form, referredBy: e.target.value })}
                  className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  placeholder="Current member name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-body font-medium text-bark-700 mb-1">
                  Tell Us About Yourself
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent resize-vertical"
                  placeholder="What draws you to Sugar Sands? What are you looking for in a hunting club?"
                />
              </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <p className="text-red-700 text-sm">Something went wrong. Please try again or email us directly.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Submitting..." : "Submit Membership Inquiry"}
              </button>

              <p className="text-bark-400 text-xs text-center">
                Your information is kept private and only shared with the preserve administrator.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
