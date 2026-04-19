import { createAdminServerClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const adminSupabase = createAdminServerClient();
    const status = request.nextUrl.searchParams.get("status") || "approved";

    if (status === "approved") {
      const categories = ["property", "wildlife", "harvest"];
      const allPhotos = [];

      for (const cat of categories) {
        const { data: files } = await adminSupabase.storage
          .from("gallery-photos")
          .list(`approved/${cat}`, { limit: 200, sortBy: { column: "created_at", order: "desc" } });

        if (files) {
          for (const file of files) {
            if (file.name === ".emptyFolderPlaceholder") continue;
            const { data: urlData } = adminSupabase.storage
              .from("gallery-photos")
              .getPublicUrl(`approved/${cat}/${file.name}`);
            allPhotos.push({
              id: file.id,
              name: file.name,
              path: `approved/${cat}/${file.name}`,
              url: urlData.publicUrl,
              category: cat,
              createdAt: file.created_at,
            });
          }
        }
      }

      return NextResponse.json({ photos: allPhotos });
    } else {
      const { data: files } = await adminSupabase.storage
        .from("gallery-photos")
        .list("pending", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

      const photos = (files || [])
        .filter((f) => f.name !== ".emptyFolderPlaceholder")
        .map((file) => {
          const { data: urlData } = adminSupabase.storage
            .from("gallery-photos")
            .getPublicUrl(`pending/${file.name}`);
          return {
            id: file.id,
            name: file.name,
            path: `pending/${file.name}`,
            url: urlData.publicUrl,
            category: "pending",
            createdAt: file.created_at,
          };
        });

      return NextResponse.json({ photos });
    }
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
