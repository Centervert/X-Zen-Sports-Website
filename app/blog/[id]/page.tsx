import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | X-Zen Sports Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .eq("published", true)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <article className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time} min read</span>
              </div>
            </div>
          </div>

          {post.image_url && (
            <div className="relative h-96 rounded-lg overflow-hidden mb-12">
              <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-xl text-gray-300 mb-8 leading-relaxed">{post.excerpt}</div>
            <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <Link href="/blog">
              <button className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors">
                Read More Articles
              </button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
