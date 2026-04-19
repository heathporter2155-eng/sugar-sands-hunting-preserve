import { createClient } from "@/lib/supabase/server";
import { createAdminServerClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminSupabase = createAdminServerClient();
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = (formData.get("category") as string) || "property";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const safeName = `${timestamp}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    
    // Admin uploads go straight to approved, members go to pending
    const isAdmin = profile?.role === "admin";
    const prefix = isAdmin ? `approved/${category}` : "pending";
    const path = `${prefix}/${safeName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await adminSupabase.storage
      .from("gallery-photos")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = adminSupabase.storage
      .from("gallery-photos")
      .getPublicUrl(path);

    return NextResponse.json({
      success: true,
      path,
      url: urlData.publicUrl,
      status: isAdmin ? "approved" : "pending",
      uploadedBy: profile?.full_name || user.email,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
