import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, city, state, huntingExperience, referredBy, message } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store in Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("waiting_list").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        city,
        state,
        hunting_experience: huntingExperience,
        referred_by: referredBy,
        message,
        status: "pending",
      });

      if (error) {
        console.error("Supabase insert error:", error);
      }
    }

    // Send notification email via Formspree or similar
    // For now, log the submission
    console.log("New waiting list submission:", { firstName, lastName, email, phone });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waiting list error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
