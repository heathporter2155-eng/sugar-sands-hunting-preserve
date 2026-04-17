"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// This will be replaced with Supabase auth check
function useAuth() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder - will check Supabase session
    setLoading(false);
  }, []);

  return { user, loading };
}

// Placeholder member data - will come from Supabase
const PLACEHOLDER_MEMBERS = [
  { id: 1, name: "Heath Porter", role: "Administrator", joinDate: "2024" },
];

export default function MembersPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
        <div className="animate-pulse text-bark-400 font-display text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <section className="relative pt-32 pb-20 px-4 bg-pine-950">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
              Members Only
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
              Member Directory
            </h1>
          </div>
        </section>

        <section className="aged-paper py-20 px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="card-plantation p-12">
              <span className="text-5xl block mb-6">🔒</span>
              <h2 className="font-display text-2xl font-semibold text-bark-900 mb-4">
                Members Only Area
              </h2>
              <p className="text-bark-600 mb-8">
                The member directory is only accessible to registered members of
                Sugar Sands Hunting Preserve. Please log in to view.
              </p>
              <Link href="/auth/login" className="btn-primary">
                Member Login
              </Link>
              <p className="mt-6 text-bark-400 text-sm">
                Not a member?{" "}
                <Link href="/contact" className="text-pine-700 hover:text-pine-800 font-medium">
                  Join the waiting list
                </Link>
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Members Only
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Member Directory
          </h1>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-earth-300">
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Name</th>
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Role</th>
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Member Since</th>
                </tr>
              </thead>
              <tbody>
                {PLACEHOLDER_MEMBERS.map((member) => (
                  <tr key={member.id} className="border-b border-earth-200 hover:bg-cream-100">
                    <td className="py-3 px-4 text-bark-700">{member.name}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        member.role === "Administrator"
                          ? "bg-earth-600 text-cream-50"
                          : "bg-pine-100 text-pine-800"
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-bark-500">{member.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
