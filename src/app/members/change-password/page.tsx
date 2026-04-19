"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordPage() {
  const searchParams = useSearchParams();
  const isNewMember = typeof window !== "undefined" && document.referrer.includes("callback");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const heading = isNewMember ? "Welcome to Sugar Sands" : "Change Password";
  const subtext = isNewMember ? "Set your password to complete your account setup." : "Account Settings";
  const buttonText = isNewMember ? "Set Password" : "Update Password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setStatus("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setStatus("error");
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
        return;
      }

      setStatus("success");
      setNewPassword("");
      setConfirmPassword("");
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
            {subtext}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
            {heading}
          </h1>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-md mx-auto">
          <Link
            href="/members"
            className="inline-flex items-center text-pine-700 hover:text-pine-800 text-sm font-medium mb-6"
          >
            ← Back to Harvest Log
          </Link>

          <div className="card-plantation p-8">
            {status === "success" ? (
              <div className="text-center py-4">
                <span className="text-4xl block mb-4">✅</span>
                <h2 className="font-display text-xl font-semibold text-bark-900 mb-2">
                  Password Updated
                </h2>
                <p className="text-bark-600 text-sm mb-6">
                  Your password has been changed successfully.
                </p>
                <Link
                  href="/members"
                  className="text-pine-700 hover:text-pine-800 text-sm font-medium"
                >
                  ← Return to Harvest Log
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                    placeholder="At least 6 characters"
                    minLength={6}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-body font-medium text-bark-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                    placeholder="Re-enter your new password"
                    minLength={6}
                  />
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
                  {status === "loading" ? "Updating..." : buttonText}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
