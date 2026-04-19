import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import AdminActions from "./AdminActions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware handles redirect — safety fallback
  if (!user) return null;

  // Fetch all profiles
  const { data: members } = await supabase
    .from("profiles")
    .select("*")
    .order("role", { ascending: true })
    .order("full_name", { ascending: true });

  return (
    <>
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Administration
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Admin Panel
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link
              href="/members"
              className="text-cream-300/60 hover:text-cream-100 text-sm font-body transition-colors"
            >
              ← Harvest Log
            </Link>
            <LogoutButton />
          </div>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <AdminActions members={members || []} />
        </div>
      </section>
    </>
  );
}
