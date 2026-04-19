"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "reset-sent">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showReset, setShowReset] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/members";
  const authError = searchParams.get("error");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (!email) {
      setErrorMsg("Please enter your email address.");
      setStatus("error");
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
        return;
      }

      setStatus("reset-sent");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
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
            Access the harvest log, photo uploads, and more
          </p>
        </div>

        <div className="bg-cream-50 rounded-sm p-8 shadow-xl">
          {authError && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-sm p-3">
              <p className="text-red-700 text-sm">
                Authentication failed. Please try again.
              </p>
            </div>
          )}

          {status === "reset-sent" ? (
            <div className="text-center py-4">
              <span className="text-4xl block mb-4">📧</span>
              <h2 className="font-display text-xl font-semibold text-bark-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-bark-600 text-sm mb-6">
                We&apos;ve sent a password reset link to <strong>{email}</strong>.
                Click the link in the email to reset your password.
              </p>
              <button
                onClick={() => { setStatus("idle"); setShowReset(false); }}
                className="text-pine-700 hover:text-pine-800 text-sm font-medium"
              >
                ← Back to login
              </button>
            </div>
          ) : showReset ? (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <h2 className="font-display text-xl font-semibold text-bark-900 mb-2">
                Reset Password
              </h2>
              <p className="text-bark-500 text-sm mb-4">
                Enter your email and we&apos;ll send you a reset link.
              </p>
              <div>
                <label htmlFor="reset-email" className="block text-sm font-body font-medium text-bark-700 mb-1">
                  Email Address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-100 border border-earth-300 rounded-sm text-bark-900 focus:outline-none focus:ring-2 focus:ring-pine-500 focus:border-transparent"
                  placeholder="your@email.com"
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
                {status === "loading" ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => { setShowReset(false); setStatus("idle"); setErrorMsg(""); }}
                className="w-full text-center text-pine-700 hover:text-pine-800 text-sm font-medium"
              >
                ← Back to login
              </button>
            </form>
          ) : (
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

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-pine-700 hover:text-pine-800 text-sm font-medium"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          )}

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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-pine-950 flex items-center justify-center">
        <p className="text-cream-300">Loading...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
