import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, published")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const postsWithInfo = posts?.map((post) => ({
    ...post,
    slugLength: post.slug?.length || 0,
    fullSlug: post.slug,
  }))

  return NextResponse.json({ posts: postsWithInfo }, null, 2)
}
