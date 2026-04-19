import { createClient } from "@/lib/supabase/server";
import { createAdminServerClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminSupabase = createAdminServerClient();
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { updates, deletions } = await request.json();

    // Process deletions
    if (deletions?.length > 0) {
      const { error: delError } = await adminSupabase
        .from("gallery_photos")
        .delete()
        .in("id", deletions);
      if (delError) {
        return NextResponse.json({ error: delError.message }, { status: 500 });
      }
    }

    // Process category updates
    if (updates?.length > 0) {
      for (const { id, category } of updates) {
        await adminSupabase
          .from("gallery_photos")
          .update({ category })
          .eq("id", id);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
