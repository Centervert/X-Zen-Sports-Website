import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  console.log("[v0] Client: Creating browser client", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "MISSING",
    keyValue: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : "MISSING",
  })

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Client: Missing Supabase credentials!")
    throw new Error("Supabase URL and Anon Key are required")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
