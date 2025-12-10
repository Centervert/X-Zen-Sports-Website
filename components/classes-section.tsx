"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Target, ArrowRight, Shield, Zap, Heart, User, Dumbbell, Trophy } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ConsultationModal } from "./consultation-modal"

const classes = [
  {
    id: "bjj",
    title: "Brazilian Jiu-Jitsu",
    subtitle: "The Gentle Art",
    description: "Master ground fighting and self-defense through technique, leverage, and timing.",
    image: "/images/brazilian-20jiu-jitsu.jpg",
    icon: Shield,
    color: "from-blue-500/20 to-cyan-500/20",
    badge: "Most Popular",
    schedule: {
      Monday: [
        "6:30A – No Gi",
        "11:30A – Gi Level 1",
        "5:30P – Youth 6–13yrs",
        "6:30P – Gi Level 1",
        "7:30P – No Gi Level 1",
      ],
      Tuesday: [
        "5:30A – No Gi",
        "10:30A – No Gi",
        "5:30P – Teen 13–17yrs",
        "6:30P – Competition",
        "7:30P – Competition",
      ],
      Wednesday: [
        "6:30A – No Gi",
        "11:30A – Gi Level 1",
        "12:30P – Judo",
        "5:30P – Youth 6–13yrs",
        "6:30P – Gi Level 1",
        "7:30P – No Gi Level 1",
      ],
      Thursday: [
        "5:30A – No Gi",
        "10:30A – No Gi",
        "5:30P – Teen 13–17yrs",
        "6:30P – No Gi Live Roll",
        "7:30P – No Gi Live Roll",
      ],
      Friday: ["6:30A – No Gi Live Roll", "11:30A – Gi Situational Live"],
      Saturday: ["9:00A – Gi", "10:00A – Open Mat"],
    },
  },
  {
    id: "boxing",
    title: "Boxing",
    subtitle: "The Sweet Science",
    description: "Build power, speed, and precision with fundamental boxing techniques.",
    image: "/images/boxing.jpg",
    icon: Target,
    color: "from-orange-500/20 to-red-500/20",
    badge: "Cardio Focused",
    schedule: {
      Monday: ["5:30P – COMPETITION", "6:30P – BAG WORK/ CONDITIONING ALL LEVELS", "7:30P – COMPETITION"],
      Tuesday: [
        "4:30P – YOUTH BOXING 6-13YRS",
        "5:30P – BAG WORK/ CONDITIONING ALL LEVELS",
        "6:30P – COMPETITION",
        "7:30P – COMPETITION",
      ],
      Wednesday: ["5:30P – COMPETITION", "6:30P – BAG WORK/ CONDITIONING ALL LEVELS", "7:30P – COMPETITION"],
      Thursday: [
        "4:30P – YOUTH BOXING 6-13YRS",
        "5:30P – BAG WORK/ CONDITIONING ALL LEVELS",
        "6:30P – COMPETITION",
        "7:30P – COMPETITION",
      ],
      Friday: ["4:30P – BAG WORK/ CONDITIONING ALL LEVELS"],
      Saturday: ["11:00A – BAG WORK/ CONDITIONING ALL LEVELS", "12:00P – COMPETITION"],
    },
  },
  {
    id: "fitness",
    title: "Fitness Classes",
    subtitle: "Total Body Conditioning",
    description: "High-intensity workouts combining martial arts conditioning with functional fitness.",
    image: "/images/fitness-20classes.jpg",
    icon: Dumbbell,
    color: "from-green-500/20 to-emerald-500/20",
    badge: "High Intensity",
    schedule: {
      Monday: [
        "5:30A – Group Fitness",
        "11:30A – Group Fitness",
        "4:30P – Group Fitness",
        "5:30P – Boxing Conditioning",
        "6:30P – Group Fitness",
      ],
      Tuesday: [
        "5:30A – Boxing Conditioning",
        "9:00A – Group Fitness",
        "11:00A – Boxing Conditioning",
        "4:30P – Group Fitness",
        "5:30P – Boxing Conditioning",
        "5:30P – Group Fitness",
      ],
      Wednesday: [
        "5:30A – High Octane",
        "11:30A – Group Fitness",
        "4:30P – Group Fitness",
        "5:30P – Boxing Conditioning",
        "6:30P – Group Fitness",
      ],
      Thursday: [
        "5:30A – Group Fitness",
        "9:00A – Group Fitness",
        "11:00A – Boxing Conditioning",
        "4:30P – Restorative Yoga",
        "5:30P – Boxing Conditioning",
        "5:30P – Group Fitness",
      ],
      Friday: [
        "5:30A – Group Fitness",
        "11:30A – Restorative Yoga",
        "4:30P – Boxing Conditioning",
        "5:30P – Group Fitness",
      ],
      Saturday: [
        "10:00A – Group Fitness",
        "11:00A – Boxing Conditioning",
        "9:00A – Empowering Fathers (1st Sat, dads & kids only)",
      ],
    },
  },
  {
    id: "mma",
    title: "Mixed Martial Arts",
    subtitle: "Complete Fighting System",
    description: "Combine striking, grappling, and ground fighting in the ultimate martial art.",
    image: "/mma-training-octagon-modern-gym.jpg",
    icon: Trophy,
    color: "from-purple-500/20 to-pink-500/20",
    badge: "All Levels",
    schedule: {
      Monday: ["11:30A – HS/Youth Martial Arts", "4:30P – Youth 6–12yrs", "6:30P – All Levels"],
      Tuesday: ["4:00P – Little Dragons 3–5yrs", "4:30P – Youth 6–12yrs", "6:30P – Muay Thai for MMA"],
      Wednesday: ["11:30A – HS/Youth Martial Arts", "4:30P – Youth 6–12yrs", "6:30P – All Levels"],
      Thursday: ["4:00P – Little Dragons 3–5yrs", "4:30P – Youth 6–12yrs", "6:30P – BJJ for MMA"],
      Friday: ["11:30A – HS/Youth Fun Friday"],
      Saturday: ["No Classes"],
    },
  },
  {
    id: "muay-thai",
    title: "Muay Thai",
    subtitle: "The Art of Eight Limbs",
    description: "Develop devastating striking power with punches, kicks, elbows, and knees.",
    image: "/images/muay-20thai.jpg",
    icon: Zap,
    color: "from-red-500/20 to-orange-500/20",
    badge: "Competition Ready",
    schedule: {
      Monday: ["4:30P – Youth 6–13yrs", "5:30P – Competition", "6:30P – All Levels"],
      Tuesday: ["11:30A – All Levels", "5:30P – Competition", "6:30P – All Levels"],
      Wednesday: ["4:30P – Youth 6–13yrs", "5:30P – Competition", "6:30P – All Levels"],
      Thursday: ["11:30A – All Levels", "5:30P – Competition", "6:30P – All Levels"],
      Friday: ["No Classes"],
      Saturday: ["No Classes"],
    },
  },
  {
    id: "wrestling",
    title: "Wrestling",
    subtitle: "Foundation of Grappling",
    description: "Build incredible strength and grappling skills with wrestling fundamentals.",
    image: "/images/wrestling.jpg",
    icon: Users,
    color: "from-indigo-500/20 to-blue-500/20",
    badge: "Strength Building",
    schedule: {
      Monday: ["No Classes"],
      Tuesday: ["4:30P – Youth 8–14yrs", "5:30P – Adult 15+"],
      Wednesday: ["No Classes"],
      Thursday: ["4:30P – Youth 8–14yrs", "5:30P – Adult 15+"],
      Friday: ["No Classes"],
      Saturday: ["10:00A – Youth 6–12yrs", "12:00P – Adult 13+"],
    },
  },
  {
    id: "youth",
    title: "Youth Programs",
    subtitle: "Building Future Champions",
    description: "Character development and martial arts skills in a fun, safe environment for all ages.",
    image: "/images/youth-20programs.jpg",
    icon: Heart,
    color: "from-yellow-500/20 to-orange-500/20",
    badge: "Ages 3-17",
    schedule: {
      Monday: [
        "11:30A – HS Martial Arts 6–13yrs",
        "4:30P – Martial Arts 6–13yrs",
        "4:30P – Muay Thai 6–13yrs",
        "5:30P – BJJ 6–12yrs",
      ],
      Tuesday: [
        "4:00P – Little Dragons 3–5yrs",
        "4:30P – Martial Arts 6–13yrs",
        "4:30P – Boxing 6–13yrs",
        "4:30P – Wrestling 8–14yrs",
        "5:30P – Teen BJJ 13–17yrs",
      ],
      Wednesday: [
        "11:30A – HS Martial Arts 6–13yrs",
        "4:30P – Martial Arts 6–13yrs",
        "4:30P – Muay Thai 6–13yrs",
        "5:30P – BJJ 6–12yrs",
      ],
      Thursday: [
        "4:00P – Little Dragons 3–5yrs",
        "4:30P – Martial Arts 6–13yrs",
        "4:30P – Boxing 6–13yrs",
        "4:30P – Wrestling 8–14yrs",
        "5:30P – Teen BJJ 13–17yrs",
      ],
      Friday: ["11:30A – HS/Youth Fun Friday"],
      Saturday: ["9:00A – All Ages BJJ", "9:00A – Empowering Fathers (1st Sat, dads & kids only)"],
    },
  },
  {
    id: "private-coaching",
    title: "Private Coaching",
    subtitle: "Elite 1-on-1 Training",
    description: "Accelerate your progress with personalized coaching tailored to your specific goals and skill level.",
    image: "/images/private-20coaching.jpg",
    icon: User,
    color: "from-primary/20 to-accent/20",
    badge: "1-on-1",
    schedule: {
      Available: ["By Appointment", "7 Days a Week", "Flexible Scheduling", "All Skill Levels Welcome"],
    },
    hasButton: true,
  },
]

export function ClassesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="classes-section py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-primary text-sm font-semibold tracking-wider uppercase mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Our Classes
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            WORLD-CLASS
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TRAINING</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-balance leading-relaxed">
            Choose from our comprehensive range of martial arts disciplines. Each program is designed by champions to
            develop technical skills, physical fitness, and mental toughness.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {classes.map((classItem, index) => {
            const IconComponent = classItem.icon
            return (
              <Card
                key={classItem.id}
                className={`glass border-white/10 overflow-hidden group hover:scale-105 transition-all duration-700 ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: gridVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="relative">
                  <div className="aspect-video relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${classItem.color} opacity-20`} />
                    <img
                      src={classItem.image || "/placeholder.svg"}
                      alt={classItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-white backdrop-blur-sm border-0">{classItem.badge}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="glass p-2 rounded-full">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{classItem.title}</h3>
                      <p className="text-accent text-sm font-semibold">{classItem.subtitle}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{classItem.description}</p>

                  <div className="space-y-4 mb-6">
                    <div className="text-sm font-medium text-foreground mb-3">Weekly Schedule:</div>
                    <div className="max-h-48 overflow-y-auto space-y-3">
                      {Object.entries(classItem.schedule).map(([day, times]) => (
                        <div key={day} className="space-y-1">
                          <div className="text-xs font-semibold text-primary uppercase tracking-wide">{day}</div>
                          {times.map((time: string, idx: number) => (
                            <div
                              key={idx}
                              className="text-xs text-muted-foreground font-mono pl-2 border-l-2 border-muted/20"
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {classItem.hasButton && (
                    <Button
                      onClick={() => setIsConsultationModalOpen(true)}
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group"
                    >
                      Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={scrollToPricing}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg shadow-xl hover:scale-105 transition-all duration-300"
          >
            See Our Pricing
          </Button>
        </div>
      </div>

      <ConsultationModal isOpen={isConsultationModalOpen} onClose={() => setIsConsultationModalOpen(false)} />
    </section>
  )
}
