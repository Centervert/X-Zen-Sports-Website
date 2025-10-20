import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Zap, Shield, Heart, User } from "lucide-react"

const programs = [
  {
    title: "Brazilian Jiu-Jitsu",
    description: "Master the gentle art with our world-class BJJ program. Perfect for all skill levels.",
    image: "/brazilian-jiu-jitsu-training-modern-gym.jpg",
    badge: "Most Popular",
    icon: Shield,
    features: ["Gi & No-Gi Training", "Competition Prep", "Self-Defense"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Muay Thai",
    description: "Learn the art of eight limbs with authentic Muay Thai techniques and conditioning.",
    image: "/muay-thai-kickboxing-training-modern-gym.jpg",
    badge: "High Intensity",
    icon: Zap,
    features: ["Striking Fundamentals", "Pad Work", "Conditioning"],
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Boxing",
    description: "Develop power, speed, and technique in our comprehensive boxing program.",
    image: "/boxing-training-heavy-bag-modern-gym.jpg",
    badge: "Cardio Focused",
    icon: Target,
    features: ["Technical Boxing", "Fitness Boxing", "Sparring"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Wrestling",
    description: "Build strength and grappling skills with our wrestling fundamentals program.",
    image: "/wrestling-training-mat-modern-gym.jpg",
    badge: "Strength Building",
    icon: Users,
    features: ["Takedowns", "Ground Control", "Conditioning"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Kids Programs",
    description: "Age-appropriate martial arts training that builds confidence and discipline.",
    image: "/images/kids-martial-arts-training.jpg",
    badge: "Ages 4-17",
    icon: Heart,
    features: ["Character Building", "Anti-Bullying", "Fitness"],
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "Personal Training",
    description: "One-on-one coaching tailored to your specific goals and fitness level.",
    image: "/personal-training-martial-arts-modern-gym.jpg",
    badge: "1-on-1",
    icon: User,
    features: ["Custom Programs", "Flexible Schedule", "Rapid Progress"],
    color: "from-indigo-500/20 to-purple-500/20",
  },
]

export function ProgramsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-primary text-sm font-semibold tracking-wider uppercase mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Our Programs
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Elite Training Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Discover world-class martial arts programs designed by champions, for champions. Every discipline, every
            level, every goal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const IconComponent = program.icon
            return (
              <Card
                key={index}
                className="group glass border-white/10 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-white backdrop-blur-sm border-0">
                    {program.badge}
                  </Badge>
                  <div className="absolute top-4 right-4 p-2 glass rounded-full">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm font-medium">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:animate-pulse" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-semibold tracking-wide transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="glass border-primary/20 text-primary hover:bg-primary/10 px-12 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 bg-transparent"
          >
            View All Programs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
