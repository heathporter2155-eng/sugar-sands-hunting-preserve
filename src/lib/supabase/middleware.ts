import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = "https://umaochzwpldehqyfzbam.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtYW9jaHp3cGxkZWhxeWZ6YmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NTA2ODIsImV4cCI6MjA5MjEyNjY4Mn0.cbh-d2XYNnAxUlchLst-ZMooad40-BxfpdzQw4a3CJU";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protect /members/* and /admin/* routes
  if (!user && (pathname.startsWith("/members") || pathname.startsWith("/admin"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Protect /admin/* — only admins allowed
  if (user && pathname.startsWith("/admin")) {
    // Use service role to bypass RLS for admin check
    const profileRes = await fetch(
      `https://umaochzwpldehqyfzbam.supabase.co/rest/v1/profiles?id=eq.${user.id}&select=role`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtYW9jaHp3cGxkZWhxeWZ6YmFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU1MDY4MiwiZXhwIjoyMDkyMTI2NjgyfQ.xCAaQRRm90Qkwa6FEhzoPcSxznFPyJqcQPRaBcMifyU`,
        },
      }
    );
    const profiles = await profileRes.json();
    const profile = Array.isArray(profiles) ? profiles[0] : null;

    if (profile?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/members";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
