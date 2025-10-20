import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recovery & Day Spa | X-Zen Sports",
  description:
    "Restore your body with cryotherapy, red light therapy, compression therapy, HydroMassage chairs, and more at X-Zen Sports Recovery.",
}

export default function RecoveryPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-12">Recovery</h1>

            <div className="space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                X-Zen Sports Recovery specializes in restoring your body to its full potential. Our pre and post-workout
                treatments were created to support our hard working athletes. Recovery services vary by location.
                Contact your local club to confirm availability.
              </p>

              <div className="flex justify-center py-8">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6"
                  asChild
                >
                  <a href="#find-recovery">FIND RECOVERY NEAR ME</a>
                </Button>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
                Our pre and post-workout treatments were created to further support the success of our hard working
                athletes.
              </p>

              <div id="find-recovery" className="pt-12 border-t border-white/10">
                <h2 className="text-3xl font-bold mb-6">Contact Us for Recovery Services</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                  <p className="text-gray-300 mb-4">
                    Ready to restore your body? Contact us to learn more about our recovery services.
                  </p>
                  <div className="space-y-3">
                    <p className="text-lg">
                      <span className="font-semibold text-primary">Phone:</span>{" "}
                      <a href="tel:+18642143174" className="hover:text-primary transition-colors">
                        (864) 214-3174
                      </a>
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold text-primary">Email:</span>{" "}
                      <a href="mailto:connect@xzensports.com" className="hover:text-primary transition-colors">
                        connect@xzensports.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
