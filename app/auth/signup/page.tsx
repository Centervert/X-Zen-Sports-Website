"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        console.error("[v0] Sign up error:", signUpError)
        setError(signUpError.message)
        setLoading(false)
        return
      }

      if (data.user) {
        console.log("[v0] Sign up successful:", data.user.email)

        setSuccess(true)
        setError("Account created! You can now log in with your credentials.")

        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      }
    } catch (err) {
      console.error("[v0] Sign up exception:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-zinc-900 p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Create Admin Account</h1>
          <p className="text-zinc-400">Sign up to access the blog management system</p>
        </div>

        {success ? (
          <div className="space-y-4 text-center">
            <div className="rounded-lg bg-green-500/10 p-4 text-green-500">{error}</div>
            <Link href="/auth/login">
              <Button className="w-full bg-red-600 hover:bg-red-700">Go to Login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-800 text-white border-zinc-700"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-zinc-800 text-white border-zinc-700"
                placeholder="At least 6 characters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="bg-zinc-800 text-white border-zinc-700"
                placeholder="Re-enter password"
              />
            </div>

            {error && <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">{error}</div>}

            <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center">
              <Link href="/auth/login" className="text-sm text-zinc-400 hover:text-white">
                Already have an account? Login
              </Link>
            </div>
          </form>
        )}

        <div className="text-center">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
