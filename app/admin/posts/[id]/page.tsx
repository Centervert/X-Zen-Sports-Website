import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BlogPostForm } from "@/components/blog-post-form"

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

  if (!post) {
    notFound()
  }

  return <BlogPostForm post={post} />
}
