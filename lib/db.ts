import { createClient, type SupabaseClient } from "@supabase/supabase-js";

declare global {
  var supabaseAdmin: SupabaseClient | undefined;
}

/**
 * Server-only Supabase client for database operations.
 *
 * Keep the service-role key out of NEXT_PUBLIC_* variables. It bypasses RLS
 * and must never be sent to the browser.
 */
export function getSupabaseAdmin() {
  if (global.supabaseAdmin) {
    return global.supabaseAdmin;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.",
    );
  }

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  if (process.env.NODE_ENV !== "production") {
    global.supabaseAdmin = client;
  }

  return client;
}
