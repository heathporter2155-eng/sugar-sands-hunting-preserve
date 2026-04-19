import { createClient } from "@/lib/supabase/server";
import { createAdminServerClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Verify the calling user is logged in
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use admin client to check role (bypasses RLS)
    const adminSupabase = createAdminServerClient();
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { email, fullName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Invite user via Supabase Auth (sends an email)
    const { data, error } = await adminSupabase.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName || "" },
      redirectTo: "https://sugarsandshuntingpreserve.com/auth/callback",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
