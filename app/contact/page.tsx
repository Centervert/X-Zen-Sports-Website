"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { checkRateLimit, recordSubmission } from "@/lib/client-rate-limit"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    location: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "rate-limited">("idle")
  const [rateLimitMessage, setRateLimitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const rateCheck = checkRateLimit()
    if (!rateCheck.allowed) {
      setSubmitStatus("rate-limited")
      setRateLimitMessage(`Too many submissions. Please wait ${rateCheck.remainingTime} seconds before trying again.`)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
          timestamp: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
        }),
      })

      if (response.ok) {
        recordSubmission()
        setSubmitStatus("success")
        setFormData({
          location: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          comment: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300 mb-12">Gym & Fitness | MMA Training | X-Zen Sports</p>

            <h2 className="text-4xl font-bold mb-8 text-primary">CONTACT US</h2>

            <div className="space-y-8 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-lg mb-2">
                  <span className="font-semibold text-primary">Phone:</span>{" "}
                  <a href="tel:877-2-XZENS" className="hover:text-primary transition-colors">
                    877-2-XZENS
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

            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-4">Message Us</h3>
              <p className="text-gray-300 mb-6">
                If you've got a question, a comment, or just want to talk more about your fitness goals, leave us a
                message and we'll be sure to get in touch.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="location" className="text-white">
                    Select Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Greenville"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="comment" className="text-white">
                    Comment *
                  </Label>
                  <Textarea
                    id="comment"
                    required
                    rows={6}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-6"
                >
                  {isSubmitting ? "Sending..." : "send message"}
                </Button>

                {submitStatus === "success" && (
                  <p className="text-green-500 text-center">Message sent successfully! We'll be in touch soon.</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-500 text-center">There was an error sending your message. Please try again.</p>
                )}
                {submitStatus === "rate-limited" && (
                  <p className="text-yellow-500 text-center font-semibold">{rateLimitMessage}</p>
                )}
              </form>

              <p className="text-gray-400 text-sm mt-6">
                If you have got a question, a comment, or just want to talk more about your fitness goals, leave us a
                message and we will be sure to get in touch.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-4">Freeze/Cancellations</h3>
              <div className="space-y-6">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-accent mb-3">Freeze Your Membership</h4>
                  <p className="text-gray-300">
                    Need a break? Freeze your membership to keep your current locked-in rate. When you're ready to
                    return, you'll maintain the same great pricing. To freeze your membership, email us at{" "}
                    <a href="mailto:members@xzensports.com" className="text-accent hover:underline font-semibold">
                      members@xzensports.com
                    </a>{" "}
                    or visit us in person.
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-primary mb-3">Cancellation Policy</h4>
                  <p className="text-gray-300">
                    To cancel your membership, please email{" "}
                    <a href="mailto:members@xzensports.com" className="text-primary hover:underline font-semibold">
                      members@xzensports.com
                    </a>{" "}
                    or visit us in person to speak with a team member. We're here to help make the process as smooth as
                    possible.
                  </p>
                </div>

                <p className="text-sm text-gray-400">
                  All freeze and cancellation requests are subject to the terms of your membership agreement. Contact us
                  today to discuss your options.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Location & Hours</h3>
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="font-semibold text-primary">Address:</span> 2435 East North S 1101, Greenville, SC
                  29615
                </p>
                <div>
                  <p className="font-semibold text-primary mb-2">Hours:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>SUN: CLOSED</li>
                    <li>MON–THU: 5 am – 10 pm</li>
                    <li>FRI: 5 am – 8 pm</li>
                    <li>SAT: 7 am – 2 pm</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
