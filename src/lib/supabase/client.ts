"use client";

import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = "https://umaochzwpldehqyfzbam.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtYW9jaHp3cGxkZWhxeWZ6YmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NTA2ODIsImV4cCI6MjA5MjEyNjY4Mn0.cbh-d2XYNnAxUlchLst-ZMooad40-BxfpdzQw4a3CJU";

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

