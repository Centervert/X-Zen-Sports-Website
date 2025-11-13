"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

const coaches = [
  {
    name: "ALICE",
    title: "FITNESS COACH",
    image: "/images/alice-geiger.jpeg",
    specialties: ["Fitness Training", "Conditioning", "Group Classes"],
  },
  {
    name: "AMANDA",
    title: "FITNESS COACH",
    image: "/images/amanda-sherman.jpeg",
    specialties: ["Fitness Training", "Conditioning", "Wellness"],
  },
  {
    name: "ANDREA",
    title: "HEAVENLY COACH",
    image: "/images/andrea-lofgren.jpeg",
    specialties: ["Holistic Training", "Wellness", "Mind-Body Connection"],
  },
  {
    name: "AMY",
    title: "FITNESS COACH",
    image: "/images/amy-dickerson.jpeg",
    specialties: ["Fitness Training", "Conditioning", "Wellness"],
  },
  {
    name: "BOBBY",
    title: "FITNESS COACH",
    image: "/images/bobby-stephens.jpeg",
    specialties: ["Strength Training", "Conditioning", "Athletic Performance"],
  },
  {
    name: "CODY",
    title: "MMA & YOUTH BJJ COACH",
    image: "/images/cody-freeland.jpg",
    specialties: ["MMA", "Youth Martial Arts", "Youth & Teen BJJ"],
  },
  {
    name: "CONNOR",
    title: "WRESTLING COACH",
    image: "/images/connor-caffrey.jpg",
    specialties: ["Wrestling", "Takedowns", "Ground Control"],
  },
  {
    name: "DAMIAN",
    title: "YOUTH MARTIAL ARTS COACH",
    image: "/images/damian-hernandez.jpg",
    specialties: ["Youth Martial Arts", "Youth BJJ", "Kids Training"],
  },
  {
    name: "DAVID ACOSTA",
    title: "WRESTLING COACH",
    image: "/images/david-acosta-wrestling.jpg",
    specialties: ["Wrestling", "Takedowns", "Grappling"],
  },
  {
    name: "DAVID CLOSE",
    title: "BJJ COACH",
    image: "/images/david-close.jpg",
    specialties: ["Brazilian Jiu-Jitsu", "Submissions", "Ground Game"],
  },
  {
    name: "JASON",
    title: "WRESTLING COACH",
    image: "/images/jason-tolbert.jpg",
    specialties: ["Wrestling", "Takedowns", "Conditioning"],
  },
  {
    name: "JORDAN",
    title: "FITNESS COACH",
    image: "/images/jordan-bounds.jpeg",
    specialties: ["Fitness Training", "Conditioning", "Athletic Performance"],
  },
  {
    name: "JULIA",
    title: "FITNESS COACH",
    image: "/images/julia-voyles.jpeg",
    specialties: ["Fitness Training", "Conditioning", "Wellness"],
  },
  {
    name: "LAMAR",
    title: "BOXING COACH",
    image: "/images/lamar-parks.png",
    specialties: ["Boxing", "Youth Boxing", "Striking"],
  },
  {
    name: "MARK",
    title: "MUAY THAI COACH",
    image: "/images/mark-klemm.jpg",
    specialties: ["Muay Thai", "Youth Muay Thai", "Kickboxing"],
  },
  {
    name: "MEREDITH",
    title: "RESTORATIVE YOGA",
    image: "/images/meredith-rosendahl.jpeg",
    specialties: ["Yoga", "Flexibility", "Recovery"],
  },
  {
    name: "RACHEL",
    title: "FITNESS COACH",
    image: "/images/rachel-brown.jpeg",
    specialties: ["Fitness Training", "Conditioning", "Wellness"],
  },
  {
    name: "SCOTT",
    title: "BJJ COACH",
    image: "/images/scott-smith.jpg",
    specialties: ["Brazilian Jiu-Jitsu", "Submissions", "Technique"],
  },
  {
    name: "TAYLOR",
    title: "MUAY THAI COACH",
    image: "/images/taylor-rodriguez.jpg",
    specialties: ["Muay Thai", "Striking", "Clinch Work"],
  },
]

export function CoachesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden -mt-16 pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-red-600/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-8">
            <div className="text-center">
              <img
                src="/images/X-ZenLogo_OnDark_Horizontal_RGB.png"
                alt="X-ZEN SPORTS"
                className="mx-auto h-16 md:h-20 w-auto mb-2"
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold tracking-[0.2em] text-gray-300 mb-12">TRAINERS</h3>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: gridVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              {/* Coach Photo */}
              <div className="relative aspect-square overflow-hidden bg-gray-900 mb-4">
                <Image
                  src={coach.image || "/placeholder.svg"}
                  alt={coach.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
              </div>

              {/* Name Bar */}
              <div className="bg-red-600 text-white text-center py-4 font-bold tracking-wider text-lg">
                {coach.name}
              </div>

              {/* Title */}
              <div className="text-center text-gray-400 text-sm font-medium tracking-wide mt-2">{coach.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
