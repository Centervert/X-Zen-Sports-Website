"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const localAuth = localStorage.getItem("admin_authenticated")

      if (!localAuth) {
        router.push("/auth/login")
        return
      }

      // Verify Supabase session is still valid
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        // Session expired, clear localStorage and redirect
        localStorage.removeItem("admin_authenticated")
        localStorage.removeItem("admin_user")
        router.push("/auth/login")
        return
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [router, supabase])

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return <>{children}</>
}
