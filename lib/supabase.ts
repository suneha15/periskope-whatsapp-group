import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Create a Supabase client for data fetching.
 * Use in Server Components or in API routes.
 * For client-side use, same factory works with public env vars.
 */
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}
