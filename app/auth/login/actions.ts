"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("[v0] Server action: Attempting login for:", email)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log("[v0] Server action: Login result:", {
    hasUser: !!data.user,
    hasSession: !!data.session,
    error: error?.message,
  })

  if (error) {
    console.error("[v0] Server action: Login error:", error)
    return { error: error.message }
  }

  console.log("[v0] Server action: Login successful, revalidating and redirecting")

  revalidatePath("/", "layout")
  redirect("/admin")
}
