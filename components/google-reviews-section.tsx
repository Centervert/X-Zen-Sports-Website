"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface Review {
  name: string
  text: string
  rating: number
}

const reviews: Review[] = [
  {
    name: "Nikki Luther",
    text: "My boys have been taking karate classes at X-Zen for almost a year, and I've seen incredible growth in them—not just in strength and skill, but also in responsibility and confidence. We love it so much that we've even signed up to work out there while our kids are in class because we realize it's important to prioritize our own health too. The instructors are supportive, professional, and genuinely care about each student's progress. I also love that they offer Muay Thai, Boxing, BJJ, wrestling, and more—such a well-rounded gym with amazing coaches! Highly recommend checking them out if you're looking for a positive and structured martial arts experience for your kids or yourself.",
    rating: 5,
  },
  {
    name: "Miles Mitchell",
    text: "Absolutely love this place. The flexibility they offer with class times helps you choose classes that fit your schedule. Great instructors, supportive atmosphere, and a community that motivates you to keep going.",
    rating: 5,
  },
  {
    name: "Kelly Meus",
    text: "Amazing gym, amazing staff, and outstanding coaching. You can't get much better than this—this gym has everything you need to be successful. The only thing they don't provide is willpower—but that's on you! I've only been going a short while and already notice big improvements.",
    rating: 5,
  },
  {
    name: "Q Yearbs",
    text: "Hands down the best gym around! Great facility, great coaches, and great staff. No matter what your fitness or martial arts goals are, there's something for everybody here.",
    rating: 5,
  },
  {
    name: "Josh Piepmeier",
    text: "Muay Thai classes here are legit, and they have some of the best fighters in the area. When my previous kickboxing gym closed, my coach recommended X-Zen if I wanted to train to fight—and it's been awesome ever since.",
    rating: 5,
  },
  {
    name: "Monika Scott",
    text: "It's not just a gym—it's family. A space that provides support and holds you accountable. Love my gymmates and coaches—the support in and out of the gym is amazing.",
    rating: 5,
  },
  {
    name: "Patrick Hall",
    text: "Amazing gym, good coaches, great class schedule, solid weight room, and friendly people. It's a great community—and worth every bit of the $150/month.",
    rating: 5,
  },
  {
    name: "Alex Caruso",
    text: "Great gym, very welcoming people, and the Muay Thai class was awesome. Highly recommend!",
    rating: 5,
  },
  {
    name: 'Gianna "G" Grimaldi',
    text: "I've been going to this gym for 2 years and love all the coaches I've worked with! Coaches Chris, Mark, Taylor, Rachel, Cody, Damien, Lamar, David Close, and David Acosta are all fantastic. The front desk team—JT, Priscilla, Destiny, and D—are so sweet. The gym is clean, and the classes are amazing from youth to adults.",
    rating: 5,
  },
  {
    name: "Angela",
    text: "Great gym and trainers! We were referred to X-Zen for sports training for my son and worked with Britton—he was incredible. He listened to our goals, created a personalized workout and nutrition plan, and gave 110% every session. We had the best experience!",
    rating: 5,
  },
]

export function GoogleReviewsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    const scrollSpeed = 0.5

    const scroll = () => {
      if (!isPaused) {
        scrollPositionRef.current += scrollSpeed

        // Reset scroll position when reaching the end of first set of reviews
        if (scrollPositionRef.current >= scrollContainer.scrollWidth / 2) {
          scrollPositionRef.current = 0
        }

        scrollContainer.scrollLeft = scrollPositionRef.current
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-primary text-sm font-semibold tracking-wider uppercase mb-8">
            <Star className="w-4 h-4 fill-primary" />
            Google Reviews
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            What Our Members Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-balance">
            Real reviews from real members who have transformed their lives at X-Zen Sports
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ scrollBehavior: "auto" }}
        >
          <div className="flex gap-6 w-max">
            {duplicatedReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-[400px] flex-shrink-0 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-6">{review.text}</p>
                <p className="text-white font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://share.google/IIF4qPtjdq3ZEZHQM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <Star className="w-5 h-5 fill-primary" />
            Leave us a review on Google
          </a>
        </div>
      </div>
    </section>
  )
}
