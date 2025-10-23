import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string | number
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300">
      <Link href={`/blog/${post.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{post.author}</span>
            <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
