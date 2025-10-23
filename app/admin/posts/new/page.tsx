import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BlogPostForm } from "@/components/blog-post-form"

export default async function NewPostPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <BlogPostForm />
}
