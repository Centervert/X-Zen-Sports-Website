"use client"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LogOut, Plus, FileText } from "lucide-react"

export default async function AdminDashboard() {
  console.log("[v0] Admin page: Loading dashboard")

  // Get blog post stats
  const supabase = await createClient()
  const { data: posts, count: totalPosts } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  const publishedCount = posts?.filter((p) => p.published).length || 0
  const draftCount = (totalPosts || 0) - publishedCount

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
            onClick={() => {
              localStorage.removeItem("admin_authenticated")
              window.location.href = "/auth/login"
            }}
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
          <h2 className="text-3xl font-bold mb-2">Welcome back, Admin</h2>
          <p className="text-zinc-400">Manage your blog posts and content</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          <Link href="/admin">
            <Button variant="ghost" className="text-white border-b-2 border-red-600 rounded-none">
              Posts
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="text-zinc-400 hover:text-white rounded-none">
              Users
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-white">Total Posts</CardTitle>
              <CardDescription className="text-zinc-400">All blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-600">{totalPosts || 0}</p>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-white">Published</CardTitle>
              <CardDescription className="text-zinc-400">Live on the site</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">{publishedCount}</p>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-white">Drafts</CardTitle>
              <CardDescription className="text-zinc-400">Unpublished posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-600">{draftCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Recent Posts</h3>
          <Link href="/admin/posts/new">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {posts && posts.length > 0 ? (
            posts.slice(0, 5).map((post) => (
              <Link key={post.id} href={`/admin/posts/${post.id}`}>
                <Card className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">{post.title}</h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              post.published ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <FileText className="h-5 w-5 text-zinc-600" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="border-zinc-800 bg-zinc-950">
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">No posts yet</h4>
                <p className="text-zinc-400 mb-4">Get started by creating your first blog post</p>
                <Link href="/admin/posts/new">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
