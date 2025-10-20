import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ClassesSection } from "@/components/classes-section"
import { JoinFormSection } from "@/components/join-form-section"
import { CtaSection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ClassesSection />
      <JoinFormSection />
      <CtaSection />
    </main>
  )
}
