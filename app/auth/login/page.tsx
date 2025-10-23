"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        localStorage.setItem("admin_authenticated", "true")
        localStorage.setItem("admin_user", JSON.stringify(data.user))

        // Force a full page reload to ensure session is properly set
        window.location.href = "/admin"
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-black">
      <div className="w-full max-w-sm">
        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your credentials to access the blog management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                {error && (
                  <div className="rounded-md bg-red-950/50 border border-red-900 p-3">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm text-zinc-400">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-red-500 hover:text-red-400 underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-zinc-400">
                <Link href="/" className="underline underline-offset-4 hover:text-white">
                  Back to home
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
