"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

const departments = {
  martialArts: {
    title: "MARTIAL ARTS",
    coaches: [
      {
        name: "CODY FREELAND",
        title: "MMA & YOUTH BJJ COACH",
        image: "/images/cody-freeland.jpg",
        specialties: ["MMA", "Youth Martial Arts", "Youth & Teen BJJ"],
      },
      {
        name: "CONNOR CAFFREY",
        title: "WRESTLING COACH",
        image: "/images/connor-caffrey.jpg",
        specialties: ["Wrestling", "Takedowns", "Ground Control"],
      },
      {
        name: "DAMIAN HERNANDEZ",
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
        name: "JASON TOLBERT",
        title: "WRESTLING COACH",
        image: "/images/jason-tolbert.jpg",
        specialties: ["Wrestling", "Takedowns", "Conditioning"],
      },
      {
        name: "MARK KLEMM",
        title: "MUAY THAI COACH",
        image: "/images/mark-klemm.jpg",
        specialties: ["Muay Thai", "Youth Muay Thai", "Kickboxing"],
      },
      {
        name: "SCOTT SMITH",
        title: "BJJ COACH",
        image: "/images/scott-smith.jpg",
        specialties: ["Brazilian Jiu-Jitsu", "Submissions", "Technique"],
      },
      {
        name: "TAYLOR RODRIGUEZ",
        title: "MUAY THAI COACH",
        image: "/images/taylor-rodriguez.jpg",
        specialties: ["Muay Thai", "Striking", "Clinch Work"],
      },
    ],
  },
  fitnessAndTraining: {
    title: "GROUP FITNESS & PERSONAL TRAINING",
    coaches: [
      {
        name: "ALICE GEIGER",
        title: "FITNESS COACH",
        image: "/images/alice-geiger.jpeg",
        specialties: ["Fitness Training", "Conditioning", "Group Classes"],
      },
      {
        name: "AMANDA SHERMAN",
        title: "FITNESS COACH",
        image: "/images/amanda-sherman.jpeg",
        specialties: ["Fitness Training", "Conditioning", "Wellness"],
      },
      {
        name: "AMY DICKERSON",
        title: "FITNESS COACH",
        image: "/images/amy-dickerson.jpeg",
        specialties: ["Fitness Training", "Conditioning", "Wellness"],
      },
      {
        name: "ANDREA LOFGREN",
        title: "HEAVENLY COACH",
        image: "/images/andrea-lofgren.jpeg",
        specialties: ["Holistic Training", "Wellness", "Mind-Body Connection"],
      },
      {
        name: "BOBBY STEPHENS",
        title: "FITNESS COACH",
        image: "/images/bobby-stephens.jpeg",
        specialties: ["Strength Training", "Conditioning", "Athletic Performance"],
      },
      {
        name: "JORDAN BOUNDS",
        title: "FITNESS COACH",
        image: "/images/jordan-bounds.jpeg",
        specialties: ["Fitness Training", "Conditioning", "Athletic Performance"],
      },
      {
        name: "JULIA VOYLES",
        title: "FITNESS COACH",
        image: "/images/julia-voyles.jpeg",
        specialties: ["Fitness Training", "Conditioning", "Wellness"],
      },
      {
        name: "MEREDITH ROSENDAHL",
        title: "RESTORATIVE YOGA",
        image: "/images/meredith-rosendahl.jpeg",
        specialties: ["Yoga", "Flexibility", "Recovery"],
      },
      {
        name: "RACHEL BROWN",
        title: "FITNESS COACH",
        image: "/images/rachel-brown.jpeg",
        specialties: ["Fitness Training", "Conditioning", "Wellness"],
      },
    ],
  },
}

export function CoachesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: martialArtsRef, isVisible: martialArtsVisible } = useScrollAnimation(0.1)
  const { ref: fitnessRef, isVisible: fitnessVisible } = useScrollAnimation(0.1)

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

        <div className="mb-24">
          <h4 className="text-xl font-bold tracking-[0.2em] text-red-600 text-center mb-12">
            {departments.martialArts.title}
          </h4>
          <div ref={martialArtsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {departments.martialArts.coaches.map((coach, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  martialArtsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: martialArtsVisible ? `${index * 150}ms` : "0ms",
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

        <div className="mb-24">
          <h4 className="text-xl font-bold tracking-[0.2em] text-red-600 text-center mb-12">
            {departments.fitnessAndTraining.title}
          </h4>
          <div ref={fitnessRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {departments.fitnessAndTraining.coaches.map((coach, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  fitnessVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: fitnessVisible ? `${index * 150}ms` : "0ms",
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
    </div>
  )
}
