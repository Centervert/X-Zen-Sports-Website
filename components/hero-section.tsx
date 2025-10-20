"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FreeClassModal } from "@/components/free-class-modal"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFreeClassModalOpen, setIsFreeClassModalOpen] = useState(false)
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax-bg")

      parallaxElements.forEach((element) => {
        const speed = 0.2
        const yPos = -(scrolled * speed)
        // Limit the parallax movement to prevent white space
        const maxMovement = 100
        const limitedYPos = Math.max(yPos, -maxMovement)
        ;(element as HTMLElement).style.transform = `translateY(${limitedYPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden bg-black">
          <div className="absolute inset-0 parallax-bg">
            <Image
              src="/images/hero-boxing-background.png"
              alt="X-Zen Sports Boxing Training"
              fill
              className="object-cover scale-110"
              priority
            />
          </div>

        {/* Static dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-parallax-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-parallax-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />


        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className={`${isLoaded ? "animate-hero-fade-in" : ""}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Greenville's Premier Martial Arts & Fitness Gym
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto drop-shadow-lg">
              Fight • Flow • Grow with expert training in Muay Thai, Boxing, Brazilian Jiu-Jitsu, Wrestling, and Fitness Conditioning
            </p>
          </div>

          <div className="mt-8">
            <Button
              onClick={() => setIsFreeClassModalOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Your Free Class
            </Button>
          </div>
        </div>


        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/80 z-20" />
      </section>

      <section className="relative bg-black py-8 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-pulse" />

        {/* Marquee container */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              <span className="text-gray-400">Greenville's Best Gym for</span>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span 
                  className={`bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent ${
                    isAnimationPaused ? '' : 'animate-gradient'
                  }`}
                  style={{
                    animationPlayState: isAnimationPaused ? 'paused' : 'running'
                  }}
                >
                  Muay Thai • Boxing • Brazilian Jiu-Jitsu • Wrestling • Fitness Conditioning
                </span>
                <button
                  onClick={() => setIsAnimationPaused(!isAnimationPaused)}
                  className="ml-2 text-white/60 hover:text-white transition-colors text-sm"
                  aria-label={isAnimationPaused ? "Resume animation" : "Pause animation"}
                  title={isAnimationPaused ? "Resume animation" : "Pause animation"}
                >
                  {isAnimationPaused ? "▶" : "⏸"}
                </button>
              </div>
            </h2>
          </div>
        </div>

      </section>

      <FreeClassModal isOpen={isFreeClassModalOpen} onClose={() => setIsFreeClassModalOpen(false)} />
    </>
  )
}
