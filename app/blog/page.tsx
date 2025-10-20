import { Navigation } from "@/components/navigation"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog Coming Soon | X-Zen Sports",
  description:
    "Our blog featuring expert martial arts and fitness advice from our coaches is launching soon. Check back for weekly training tips and insights.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-6 py-2 rounded-full text-sm font-semibold mb-8">
                Coming Soon
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Training Tips & Insights</h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              Our blog is launching soon with expert advice from our coaches on martial arts techniques, training
              methods, and the mindset needed to excel.
            </p>

            <p className="text-lg text-gray-400 mb-12">
              Check back soon for weekly posts covering BJJ, Muay Thai, Boxing, Wrestling, MMA, and fitness training.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
