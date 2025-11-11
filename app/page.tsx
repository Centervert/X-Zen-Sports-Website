import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LazyClassesSection } from "@/components/lazy-components"
import { JoinFormSection } from "@/components/join-form-section"
import { GoogleReviewsSection } from "@/components/google-reviews-section"
import { CtaSection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <LazyClassesSection />
      <JoinFormSection />
      <GoogleReviewsSection />
      <CtaSection />
    </main>
  )
}
