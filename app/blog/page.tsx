"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { BlogCard } from "@/components/blog-card"
import { createClient } from "@/lib/supabase/client"

const categories = ["All", "Training Tips", "BJJ", "Muay Thai", "Recovery", "Youth", "Nutrition"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient()
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (selectedCategory !== "All") {
        query = query.eq("category", selectedCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error("[v0] Error fetching posts:", error)
      } else {
        setBlogPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [selectedCategory])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribeStatus("loading")

    // Simulate API call - replace with actual newsletter service
    setTimeout(() => {
      setSubscribeStatus("success")
      setEmail("")
      setTimeout(() => setSubscribeStatus("idle"), 3000)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Training Tips & Insights</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Expert advice from our coaches on martial arts techniques, training methods, and the mindset needed to
              excel.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  category === selectedCategory
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-400">Loading posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts && blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={{
                      id: post.slug || post.id,
                      title: post.title,
                      excerpt: post.excerpt || "",
                      category: post.category,
                      author: post.author_name,
                      date: new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }),
                      readTime: `${post.read_time} min read`,
                      image: post.image_url || "/martial-arts-training-gym-with-red-equipment.jpg",
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-400">
                    {selectedCategory === "All"
                      ? "No blog posts available yet. Check back soon!"
                      : `No posts in ${selectedCategory} category yet.`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss a Post</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get weekly training tips and insights delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={subscribeStatus === "loading"}
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={subscribeStatus === "loading"}
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {subscribeStatus === "loading"
                  ? "Subscribing..."
                  : subscribeStatus === "success"
                    ? "Subscribed!"
                    : "Subscribe"}
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="mt-4 text-green-400">Thanks for subscribing! Check your email for confirmation.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
