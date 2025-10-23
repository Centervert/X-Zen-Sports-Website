"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewUserPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    try {
      console.log("[v0] Creating new user:", email)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      })

      console.log("[v0] Sign up response:", { data, error })

      if (error) throw error

      setSuccess(true)
      setEmail("")
      setPassword("")
      setConfirmPassword("")

      setTimeout(() => {
        router.push("/admin/users")
      }, 2000)
    } catch (error: unknown) {
      console.error("[v0] Error creating user:", error)
      setError(error instanceof Error ? error.message : "Failed to create user")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <img src="/images/x-zen-logo-white.png" alt="X-Zen Sports" className="h-12" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/admin/users">
          <Button variant="ghost" className="mb-6 text-zinc-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>

        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Add New Admin User</CardTitle>
            <CardDescription className="text-zinc-400">Create a new admin account to manage blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@xzensports.com"
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
                    placeholder="Minimum 6 characters"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-600/20 border border-red-600/50">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-3 rounded-lg bg-green-600/20 border border-green-600/50">
                    <p className="text-sm text-green-400">
                      User created successfully! They will receive a confirmation email.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create User"}
                  </Button>
                  <Link href="/admin/users" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-zinc-800 text-white hover:bg-zinc-900 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
