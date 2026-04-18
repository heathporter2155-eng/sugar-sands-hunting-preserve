import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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

  // Fetch members
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .eq("status", "active")
    .order("role", { ascending: true })
    .order("last_name", { ascending: true });

  // Check if current user is admin
  const { data: currentMember } = await supabase
    .from("members")
    .select("role")
    .eq("user_id", user.id)
    .single();

  const isAdmin = currentMember?.role === "admin";

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
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </section>

      <section className="aged-paper py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {isAdmin && (
            <div className="mb-6 p-4 bg-earth-100 border border-earth-300 rounded-sm">
              <p className="text-earth-800 text-sm font-medium">
                🔑 You are logged in as Administrator
              </p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-earth-300">
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Name</th>
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Address</th>
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Phone</th>
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Email</th>
                  <th className="text-left py-3 px-4 font-display font-semibold text-bark-800">Role</th>
                </tr>
              </thead>
              <tbody>
                {members?.map((member) => (
                  <tr key={member.id} className="border-b border-earth-200 hover:bg-cream-100">
                    <td className="py-3 px-4 text-bark-700 font-medium">
                      {member.first_name} {member.last_name}
                    </td>
                    <td className="py-3 px-4 text-bark-600 text-sm">
                      {member.address && `${member.address}, `}{member.city}, {member.state} {member.zip}
                    </td>
                    <td className="py-3 px-4 text-bark-600 text-sm">
                      <a href={`tel:${member.phone}`} className="hover:text-pine-700">{member.phone}</a>
                    </td>
                    <td className="py-3 px-4 text-bark-600 text-sm">
                      <a href={`mailto:${member.email}`} className="hover:text-pine-700">{member.email}</a>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        member.role === "admin"
                          ? "bg-earth-600 text-cream-50"
                          : "bg-pine-100 text-pine-800"
                      }`}>
                        {member.role === "admin" ? "Administrator" : "Member"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(!members || members.length === 0) && (
            <div className="text-center py-12">
              <p className="text-bark-400">No members found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
