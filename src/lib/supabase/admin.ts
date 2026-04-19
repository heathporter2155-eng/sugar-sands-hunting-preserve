import { createClient as createAdminClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://umaochzwpldehqyfzbam.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtYW9jaHp3cGxkZWhxeWZ6YmFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU1MDY4MiwiZXhwIjoyMDkyMTI2NjgyfQ.xCAaQRRm90Qkwa6FEhzoPcSxznFPyJqcQPRaBcMifyU";

export function createAdminServerClient() {
  return createAdminClient(SUPABASE_URL, SERVICE_ROLE_KEY);
}
