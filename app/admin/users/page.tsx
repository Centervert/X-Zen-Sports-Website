"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { LogOut, Plus, Users, Mail, Calendar, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function UsersPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setCurrentUser(user)
      setLoading(false)
    }

    async function fetchUsers() {
      const supabase = createClient()

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          const response = await fetch("/api/admin/users", {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setUsers(data.users || [])
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    loadUser()
    fetchUsers()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return

    setDeleting(true)
    const supabase = createClient()

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })

        if (response.ok) {
          setUsers(users.filter((u) => u.id !== userToDelete.id))
          setDeleteDialogOpen(false)
          setUserToDelete(null)
        } else {
          const error = await response.json()
          alert(error.error || "Failed to delete user")
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("Failed to delete user")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    )
  }

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
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-zinc-800 text-white hover:bg-zinc-900 bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
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
          {users.length > 0 ? (
            users.map((user) => (
              <Card key={user.id} className="border-zinc-800 bg-zinc-950">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-5 w-5 text-red-600" />
                        <h4 className="text-lg font-semibold text-white">{user.email}</h4>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                          {user.email_confirmed_at ? "Verified" : "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-400 mt-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Created {new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(user)}
                      className="border-red-600/50 text-red-600 hover:bg-red-600/10 hover:border-red-600"
                      disabled={currentUser?.id === user.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-zinc-800 bg-zinc-950">
              <CardContent className="p-6 text-center text-zinc-400">
                No users found. Add your first user to get started.
              </CardContent>
            </Card>
          )}

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-white">About User Management</CardTitle>
              <CardDescription className="text-zinc-400">User management with Supabase Authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">
                Users are managed through Supabase Authentication. You can add new users, and they'll receive an email
                to verify their account.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-950 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete User</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete <span className="font-semibold text-white">{userToDelete?.email}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-800 text-white hover:bg-zinc-900">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
