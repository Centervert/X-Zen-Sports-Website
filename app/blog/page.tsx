import { Navigation } from "@/components/navigation"
import { BlogCard } from "@/components/blog-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Training Tips & Insights | X-Zen Sports Blog",
  description:
    "Expert martial arts and fitness advice from our coaches. Weekly training tips, techniques, and insights on BJJ, Muay Thai, Boxing, Wrestling, and MMA.",
}

const blogPosts = [
  {
    id: 1,
    title: "5 Essential BJJ Techniques Every Beginner Should Master",
    excerpt:
      "Starting your Brazilian Jiu-Jitsu journey? These fundamental techniques will build a solid foundation for your grappling game.",
    category: "BJJ",
    author: "Coach David Close",
    date: "October 15, 2025",
    readTime: "5 min read",
    image: "/bjj-training-mat.png",
  },
  {
    id: 2,
    title: "Building Power in Your Muay Thai Kicks",
    excerpt:
      "Learn the biomechanics and training methods to develop devastating kicks that will elevate your striking game.",
    category: "Muay Thai",
    author: "Coach Cody Freeland",
    date: "October 12, 2025",
    readTime: "6 min read",
    image: "/muay-thai-kickboxing-training.jpg",
  },
  {
    id: 3,
    title: "The Mental Game: Preparing for Your First Competition",
    excerpt:
      "Competition nerves are normal. Discover strategies to manage anxiety and perform at your best when it matters most.",
    category: "MMA",
    author: "Coach Mark Klemm",
    date: "October 8, 2025",
    readTime: "7 min read",
    image: "/martial-arts-training-gym-with-red-equipment.jpg",
  },
  {
    id: 4,
    title: "Strength Training for Combat Sports Athletes",
    excerpt:
      "Not all strength training is created equal. Learn how to build functional strength that translates to the mat and ring.",
    category: "Fitness",
    author: "Coach Chris Johnstone",
    date: "October 5, 2025",
    readTime: "8 min read",
    image: "/martial-arts-training-gym-with-red-equipment.jpg",
  },
  {
    id: 5,
    title: "Wrestling Fundamentals: Takedowns That Work",
    excerpt: "Master the essential takedowns that form the backbone of effective wrestling and MMA ground control.",
    category: "Wrestling",
    author: "Coach Jason Tolbert",
    date: "October 1, 2025",
    readTime: "6 min read",
    image: "/bjj-training-mat.png",
  },
  {
    id: 6,
    title: "Recovery and Injury Prevention for Martial Artists",
    excerpt:
      "Train smarter, not just harder. Essential recovery techniques to keep you healthy and performing at your peak.",
    category: "Fitness",
    author: "Coach David Close",
    date: "September 28, 2025",
    readTime: "5 min read",
    image: "/muay-thai-kickboxing-training.jpg",
  },
]

const categories = ["All", "BJJ", "Muay Thai", "Boxing", "Wrestling", "MMA", "Fitness"]

export default function BlogPage() {
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
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  category === "All"
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss a Post</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get weekly training tips and insights delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
