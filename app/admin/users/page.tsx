import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LogOut, Plus, Users, Mail, Calendar } from "lucide-react"

export default async function UsersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get all users from auth.users (requires service role key in production)
  // For now, we'll show the current user and provide a form to add new users
  const currentUser = user

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src="/images/x-zen-logo-white.png" alt="X-Zen Sports" className="h-12" />
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <form
            action={async () => {
              "use server"
              const supabase = await createClient()
              await supabase.auth.signOut()
              redirect("/auth/login")
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="border-zinc-800 text-white hover:bg-zinc-900 bg-transparent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">User Management</h2>
          <p className="text-zinc-400">Manage admin users and access</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          <Link href="/admin">
            <Button variant="ghost" className="text-zinc-400 hover:text-white rounded-none">
              Posts
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="text-white border-b-2 border-red-600 rounded-none">
              Users
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Admin Users</h3>
          <Link href="/admin/users/new">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          <Card className="border-zinc-800 bg-zinc-950">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-red-600" />
                    <h4 className="text-lg font-semibold text-white">{currentUser.email}</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">Active</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-400 mt-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{currentUser.email}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(currentUser.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-white">About User Management</CardTitle>
              <CardDescription className="text-zinc-400">
                Add new admin users to give them access to the blog management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">
                New users will receive an email to confirm their account and set their password. They will then be able
                to log in and manage blog posts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
