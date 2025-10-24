import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Target, Zap, Users, Trophy } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "X-Zen Kids Zone | Youth Martial Arts Programs",
  description:
    "Youth martial arts programs for ages 3 to adults at X-Zen Sports. BJJ, Boxing, MMA, Muay Thai, and Wrestling classes for kids in Greenville.",
}

export default function YouthPage() {
  const programs = [
    {
      title: "Little Dragons",
      ages: "3 - 5 years",
      icon: Shield,
      color: "from-primary/30 to-red-600/30",
      borderColor: "border-primary/30",
      description:
        "Introduction to martial arts through fun games and activities that build coordination and confidence.",
    },
    {
      title: "Youth Martial Arts",
      ages: "6 - 13 years",
      icon: Target,
      color: "from-accent/30 to-orange-500/30",
      borderColor: "border-accent/30",
      description: "Comprehensive martial arts training including MMA, BJJ, Boxing, Muay Thai, and Wrestling.",
    },
    {
      title: "Teen Programs",
      ages: "13 - 17 years",
      icon: Zap,
      color: "from-primary/30 to-accent/30",
      borderColor: "border-primary/30",
      description: "Advanced training for teenagers with competition opportunities and leadership development.",
    },
    {
      title: "Family Training",
      ages: "All Ages",
      icon: Users,
      color: "from-red-600/30 to-accent/30",
      borderColor: "border-accent/30",
      description: "Train together as a family and build bonds while learning martial arts skills.",
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 text-lg px-6 py-2">
                Ages 3 to 16
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
                X-ZEN KIDS ZONE
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto">Building Future Champions Through Martial Arts</p>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8 text-center">Our Youth Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programs.map((program, index) => {
                  const IconComponent = program.icon
                  return (
                    <Card
                      key={index}
                      className={`glass border-2 ${program.borderColor} overflow-hidden group hover:scale-105 transition-all duration-500`}
                    >
                      <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 rounded-full bg-gradient-to-br ${program.color}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1 text-white">{program.title}</h3>
                            <p className="text-primary font-semibold">{program.ages}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{program.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8 text-center">Disciplines We Offer</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {["Muay Thai", "MMA", "BJJ", "Wrestling", "Boxing"].map((discipline) => (
                  <div
                    key={discipline}
                    className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300"
                  >
                    <Trophy className="h-8 w-8 text-primary mx-auto mb-3" />
                    <p className="font-bold text-lg">{discipline}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Kids' Weekly Schedule</h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-white/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">Monday & Wednesday</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      11:30A – HS Martial Arts (6–13yrs)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      4:30P – Martial Arts (6–13yrs)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      4:30P – Muay Thai (6–13yrs)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      5:30P – BJJ (6–12yrs)
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-white/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-accent mb-4">Tuesday & Thursday</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      4:00P – Little Dragons (3–5yrs)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      4:30P – Martial Arts (6–13yrs)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      4:30P – Boxing (6–13yrs)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      4:30P – Wrestling (8–14yrs)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      5:30P – Teen BJJ (13–17yrs)
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-white/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">Friday & Saturday</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      Friday 11:30A – HS/Youth Fun Friday
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      Saturday 9:00A – All Ages BJJ
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      Saturday 9:00A – Empowering Fathers (1st Sat, dads & kids only)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-6">
                Give your child the gift of confidence, discipline, and physical fitness through martial arts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18642143174"
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 inline-block"
                >
                  Call (864) 214-3174
                </a>
                <a
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 inline-block border border-white/20"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
