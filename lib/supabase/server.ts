import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  console.log("[v0] Server client: Creating Supabase client", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlPrefix: supabaseUrl?.substring(0, 20),
  })

  const allCookies = cookieStore.getAll()
  console.log("[v0] Server client: Available cookies:", {
    count: allCookies.length,
    names: allCookies.map((c) => c.name),
    supabaseCookies: allCookies
      .filter((c) => c.name.includes("supabase") || c.name.includes("sb-"))
      .map((c) => ({
        name: c.name,
        valuePrefix: c.value.substring(0, 20) + "...",
      })),
  })

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Server client: Missing Supabase credentials!")
    throw new Error("Supabase credentials are required")
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
