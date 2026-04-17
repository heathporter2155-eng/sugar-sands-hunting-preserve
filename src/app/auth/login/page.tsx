"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // Will integrate with Supabase auth
      // const { createClient } = await import("@/lib/supabase-browser");
      // const supabase = createClient();
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      // window.location.href = "/members";

      // Placeholder
      setErrorMsg("Authentication will be configured once Supabase is set up.");
      setStatus("error");
    } catch {
      setErrorMsg("Invalid email or password. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-pine-950 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex text-cream-100">
            <Logo size="md" />
          </Link>
          <h1 className="font-display text-3xl font-bold text-cream-50 mt-6">
            Member Login
          </h1>
          <p className="text-cream-300/60 mt-2 text-sm">
            Access the member directory, photo uploads, and more
          </p>
        </div>

        <div className="bg-cream-50 rounded-sm p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-body font-medium text-bark-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-body font-medium text-bark-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
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
              {status === "loading" ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-bark-400 text-sm">
              Not a member?{" "}
              <Link href="/contact" className="text-pine-700 hover:text-pine-800 font-medium">
                Join the waiting list
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
