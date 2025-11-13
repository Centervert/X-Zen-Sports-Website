import { Navigation } from "@/components/navigation"
import { CoachesSection } from "@/components/coaches-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meet Your Coaches | X-Zen Sports",
  description:
    "Meet the world-class coaching team at X-Zen Sports. Expert instruction in MMA, BJJ, Boxing, Muay Thai, Wrestling, and Fitness.",
}

export default function CoachingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center">Meet Your Coaches</h1>

            <div className="space-y-8 mb-12">
              <p className="text-xl text-gray-300 leading-relaxed">
                At X-Zen Sports, our coaches are more than instructors—they're mentors, motivators, and champions who
                are dedicated to your success. Each member of our coaching staff brings years of competitive experience,
                technical expertise, and a passion for helping students reach their full potential.
              </p>

              <p className="text-xl text-gray-300 leading-relaxed">
                Whether you're stepping onto the mat for the first time or training for competition, our coaches will
                meet you where you are and guide you to where you want to be. They understand that every student's
                journey is unique, and they're committed to providing personalized attention, expert technique
                instruction, and the encouragement you need to push past your limits.
              </p>

              <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-8 my-12">
                <blockquote className="text-2xl text-gray-200 italic leading-relaxed mb-4">
                  "A great coach can change a game. A legendary coach can change a life."
                </blockquote>
                <p className="text-lg text-gray-400">— John Wooden</p>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
                Our coaching philosophy is simple: we believe in the power of martial arts to transform lives. Through
                discipline, dedication, and expert guidance, we help our students build not just physical strength, but
                mental toughness, confidence, and character that extends far beyond the gym.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8 my-12">
                <blockquote className="text-2xl text-gray-200 italic leading-relaxed mb-4">
                  "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great
                  teacher inspires."
                </blockquote>
                <p className="text-lg text-gray-400">— William Arthur Ward</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CoachesSection />

      <div className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Train with the Best?</h2>
              <p className="text-xl text-gray-300 mb-6">
                Contact us today to learn more about our coaching programs and start your journey with X-Zen Sports.
              </p>
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="font-semibold text-primary">Phone:</span>{" "}
                  <a href="tel:+18645284024" className="hover:text-primary transition-colors">
                    (864) 528-4024
                  </a>
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-primary">Email:</span> connect@xzensports.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
