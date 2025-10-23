import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If credentials aren't available, skip authentication but still allow access
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Middleware: Supabase credentials not available, allowing all requests")
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

  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    const redirectResponse = NextResponse.redirect(url)
    redirectResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    return redirectResponse
  }

  if (request.nextUrl.pathname === "/auth/login" && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    const redirectResponse = NextResponse.redirect(url)
    redirectResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    return redirectResponse
  }

  return supabaseResponse
}
