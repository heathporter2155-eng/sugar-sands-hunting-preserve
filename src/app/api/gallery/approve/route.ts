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
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { path, category } = await request.json();
    if (!path || !category) {
      return NextResponse.json({ error: "path and category required" }, { status: 400 });
    }

    const fileName = path.split("/").pop();
    const newPath = `approved/${category}/${fileName}`;

    const { data: fileData, error: dlError } = await adminSupabase.storage
      .from("gallery-photos")
      .download(path);

    if (dlError || !fileData) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const buffer = Buffer.from(await fileData.arrayBuffer());

    const { error: upError } = await adminSupabase.storage
      .from("gallery-photos")
      .upload(newPath, buffer, { contentType: fileData.type, upsert: false });

    if (upError) {
      return NextResponse.json({ error: upError.message }, { status: 500 });
    }

    await adminSupabase.storage.from("gallery-photos").remove([path]);

    const { data: urlData } = adminSupabase.storage
      .from("gallery-photos")
      .getPublicUrl(newPath);

    // Insert into gallery_photos DB table so it shows on the public gallery
    const { error: dbError } = await adminSupabase
      .from("gallery_photos")
      .insert({
        src: urlData.publicUrl,
        alt: fileName?.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") || "Uploaded photo",
        category,
        sort_order: 0,
      });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: urlData.publicUrl, path: newPath });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
