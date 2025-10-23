"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { BlogPostForm } from "@/components/blog-post-form"

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

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient()
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

      if (error) {
        setError("Post not found")
        setLoading(false)
        return
      }

      setPost(data)
      setLoading(false)
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading post...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Post not found"}</p>
          <button onClick={() => router.push("/admin")} className="text-red-600 hover:text-red-500">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return <BlogPostForm post={post} />
}
