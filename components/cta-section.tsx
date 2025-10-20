"use client"

import { Button } from "@/components/ui/button"
import { FreeClassModal } from "@/components/free-class-modal"
import { useState } from "react"

export function CtaSection() {
  const [isFreeClassModalOpen, setIsFreeClassModalOpen] = useState(false)

  return (
    <>
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join X-Zen Sports today and transform your life through martial arts. Start with a free class and discover
            your potential.
          </p>
          <Button
            onClick={() => setIsFreeClassModalOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg"
          >
            Start Your Free Class
          </Button>
        </div>
      </section>

      <FreeClassModal isOpen={isFreeClassModalOpen} onClose={() => setIsFreeClassModalOpen(false)} />
    </>
  )
}
