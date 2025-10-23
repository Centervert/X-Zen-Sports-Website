import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request)

  supabaseResponse.headers.set("X-Frame-Options", "DENY")
  supabaseResponse.headers.set("X-Content-Type-Options", "nosniff")
  supabaseResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  supabaseResponse.headers.set("X-XSS-Protection", "1; mode=block")
  supabaseResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin")
  supabaseResponse.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none")

  supabaseResponse.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.callrail.com https://tags.tiqcdn.com https://googleads.g.doubleclick.net https://tags.srv.stackadapt.com",
      "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com https://tags.srv.stackadapt.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https: https://fonts.gstatic.com",
      "connect-src 'self' https://hooks.zapier.com https://services.leadconnectorhq.com https://rest.gohighlevel.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://cdn.callrail.com https://*.supabase.co https://www.google.com https://tags.srv.stackadapt.com",
      "frame-src https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  )

  if (process.env.NODE_ENV === "production") {
    supabaseResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
