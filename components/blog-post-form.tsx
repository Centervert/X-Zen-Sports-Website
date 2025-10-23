"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url: string
  author_name: string
  read_time: number
  published: boolean
}

interface BlogPostFormProps {
  post?: BlogPost
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "Training Tips",
    image_url: post?.image_url || "",
    author_name: post?.author_name || "X-Zen Sports",
    read_time: post?.read_time || 5,
    published: post?.published || false,
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: post ? prev.slug : generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      if (post) {
        // Update existing post
        const { error } = await supabase.from("blog_posts").update(formData).eq("id", post.id)

        if (error) throw error
      } else {
        // Create new post
        const { error } = await supabase.from("blog_posts").insert([formData])

        if (error) throw error
      }

      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm("Are you sure you want to delete this post?")) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", post.id)

      if (error) throw error

      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin">
            <Button variant="ghost" className="text-white hover:bg-zinc-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post ? "Edit Post" : "Create New Post"}</h1>
          <p className="text-zinc-400">
            {post ? "Update your blog post details" : "Fill in the details for your new blog post"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-zinc-800 bg-zinc-950 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title"
                  required
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-white">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="post-url-slug"
                  required
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-white">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the post"
                  rows={3}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-white">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your post content here (supports markdown)"
                  rows={15}
                  required
                  className="bg-zinc-900 border-zinc-800 text-white font-mono"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="Training Tips">Training Tips</SelectItem>
                      <SelectItem value="BJJ">BJJ</SelectItem>
                      <SelectItem value="Muay Thai">Muay Thai</SelectItem>
                      <SelectItem value="Recovery">Recovery</SelectItem>
                      <SelectItem value="Youth">Youth</SelectItem>
                      <SelectItem value="Nutrition">Nutrition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="read_time" className="text-white">
                    Read Time (minutes)
                  </Label>
                  <Input
                    id="read_time"
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: Number.parseInt(e.target.value) })}
                    min="1"
                    required
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url" className="text-white">
                  Image URL
                </Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="/path/to/image.jpg"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author_name" className="text-white">
                  Author Name
                </Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="Author name"
                  required
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <Label htmlFor="published" className="text-white font-semibold">
                    Publish Post
                  </Label>
                  <p className="text-sm text-zinc-400">Make this post visible on the blog</p>
                </div>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              {post && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Post
                </Button>
              )}
            </div>
            <div className="flex gap-4">
              <Link href="/admin">
                <Button
                  type="button"
                  variant="outline"
                  className="border-zinc-800 text-white hover:bg-zinc-900 bg-transparent"
                >
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
