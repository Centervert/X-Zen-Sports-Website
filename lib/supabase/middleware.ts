import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  console.log("[v0] Middleware: Environment check", {
    hasNextPublicUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasNextPublicKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Middleware: Supabase credentials missing - URL:", !!supabaseUrl, "Key:", !!supabaseAnonKey)
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("[v0] Middleware: Checking auth for path:", request.nextUrl.pathname)
  console.log("[v0] Middleware: User authenticated:", !!user)
  if (user) {
    console.log("[v0] Middleware: User email:", user.email)
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    console.log("[v0] Middleware: Redirecting to login - no user found")
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname === "/auth/login" && user) {
    console.log("[v0] Middleware: User already logged in, redirecting to admin")
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
