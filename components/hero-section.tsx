"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FreeClassModal } from "@/components/free-class-modal"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFreeClassModalOpen, setIsFreeClassModalOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax-bg")

      parallaxElements.forEach((element) => {
        const speed = 0.5
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 parallax-bg">
          <Image
            src="/images/hero-boxing-background.png"
            alt="X-Zen Sports Boxing Training"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-0 opacity-50 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute inset-0 opacity-25 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.6'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-parallax-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-parallax-float"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(8,145,178,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className={`flex justify-center ${isLoaded ? "animate-logo-scale" : ""}`}>
            <Image
              src="/images/x-zen-logo-white-full.png"
              alt="X-Zen Sports - Fight | Flow | Grow"
              width={800}
              height={600}
              className="w-auto h-48 md:h-64 lg:h-80 xl:h-96 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              priority
            />
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

        <div
          className={`absolute top-32 left-16 w-24 h-24 border border-primary/20 rotate-45 ${isLoaded ? "animate-slide-in-left" : ""}`}
        />
        <div
          className={`absolute bottom-32 right-16 w-20 h-20 border border-accent/20 rotate-12 ${isLoaded ? "animate-slide-in-right" : ""}`}
        />
        <div
          className={`absolute top-1/2 left-8 w-1 h-32 bg-gradient-to-b from-primary/40 to-transparent ${isLoaded ? "animate-slide-in-left" : ""}`}
        />
        <div
          className={`absolute top-1/2 right-8 w-1 h-32 bg-gradient-to-b from-accent/40 to-transparent ${isLoaded ? "animate-slide-in-right" : ""}`}
        />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/80 z-20" />
      </section>

      <section className="relative bg-black py-8 overflow-hidden border-y border-primary/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-pulse" />

        {/* Marquee container */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              <span className="text-gray-400">Greenville's Best Gym for</span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent animate-gradient">
                Muay Thai • Boxing • Brazilian Jiu-Jitsu • Wrestling • Fitness Conditioning
              </span>
            </h2>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-1/2 right-0 w-32 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </section>

      <FreeClassModal isOpen={isFreeClassModalOpen} onClose={() => setIsFreeClassModalOpen(false)} />
    </>
  )
}
