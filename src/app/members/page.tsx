import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminServerClient } from "@/lib/supabase/admin";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

const gameTypeLabels: Record<string, string> = {
  whitetail_deer: "Whitetail Deer",
  turkey: "Turkey",
  other: "Other",
};

export default async function MembersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware handles redirect — this is a safety fallback
  if (!user) {
    return null;
  }

  // Use admin client to bypass RLS for profile/harvest queries
  const adminSupabase = createAdminServerClient();

  // Get current user's profile
  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // Fetch harvest log entries
  const { data: harvests } = await adminSupabase
    .from("harvest_log")
    .select("*")
    .order("harvest_date", { ascending: false });

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
          <p className="text-cream-300/60 mt-3 text-sm">
            Welcome, {profile?.full_name || user.email}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
            <LogoutButton />
            <Link
              href="/members/change-password"
              className="text-cream-300/60 hover:text-cream-100 text-sm font-body transition-colors"
            >
              Change Password
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-earth-400 hover:text-earth-300 text-sm font-body transition-colors font-medium"
              >
                🔑 Admin Panel
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Action bar */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-semibold text-bark-900">
              Recent Harvests
            </h2>
            <Link href="/members/log-harvest" className="btn-primary text-base">
              + Log Harvest
            </Link>
          </div>

          {/* Harvest log table */}
          {harvests && harvests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-earth-300">
                    <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                      Member
                    </th>
                    <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                      Game
                    </th>
                    <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                      Notes
                    </th>
                    <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">
                      Photo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {harvests.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-earth-200 hover:bg-cream-100"
                    >
                      <td className="py-3 px-4 text-bark-700 text-sm whitespace-nowrap">
                        {new Date(entry.harvest_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 text-bark-700 font-medium text-sm">
                        {entry.member_name}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            entry.game_type === "whitetail_deer"
                              ? "bg-earth-100 text-earth-800"
                              : entry.game_type === "turkey"
                              ? "bg-pine-100 text-pine-800"
                              : "bg-bark-100 text-bark-700"
                          }`}
                        >
                          {gameTypeLabels[entry.game_type] || entry.game_type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-bark-600 text-sm max-w-xs truncate">
                        {entry.notes || "—"}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {entry.photo_url ? (
                          <a
                            href={entry.photo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pine-700 hover:text-pine-800 font-medium"
                          >
                            View 📷
                          </a>
                        ) : (
                          <span className="text-bark-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 card-plantation p-12">
              <span className="text-5xl block mb-4">🦌</span>
              <h3 className="font-display text-xl font-semibold text-bark-900 mb-2">
                No Harvests Logged Yet
              </h3>
              <p className="text-bark-500 mb-6">
                Be the first to log a harvest this season!
              </p>
              <Link href="/members/log-harvest" className="btn-primary">
                Log Your First Harvest
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
