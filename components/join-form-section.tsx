"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, X, Check, Gift } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  smsConsent: boolean
}

export function JoinFormSection() {
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.3)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    smsConsent: false,
  })
  const [showPricingModal, setShowPricingModal] = useState(false)

  const normalizeName = (name: string) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace(/[^a-zA-Z\s'-]/g, "")
  }

  const normalizePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "")
    if (digits.length >= 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
    return phone
  }

  const normalizeEmail = (email: string) => {
    return email.toLowerCase().trim()
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    let normalizedValue = value

    switch (field) {
      case "firstName":
      case "lastName":
        normalizedValue = normalizeName(value)
        break
      case "phone":
        normalizedValue = normalizePhone(value)
        break
      case "email":
        normalizedValue = normalizeEmail(value)
        break
    }

    setFormData((prev) => ({
      ...prev,
      [field]: normalizedValue,
    }))
  }

  const handleScheduleTour = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!isFormValid) {
      return
    }

    try {
      const estTimestamp = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })

      const webhookData = {
        ...formData,
        timestamp: estTimestamp,
        formType: "Tour Request",
      }

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      console.log("Tour request submitted:", webhookData)
    } catch (error) {
      console.error("Error submitting to webhook:", error)
    }

    // Show pricing modal after submission
    setShowPricingModal(true)
  }

  const closePricingModal = () => {
    setShowPricingModal(false)
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      smsConsent: false,
    })
  }

  const isFormValid = formData.firstName && formData.lastName && formData.phone && formData.email

  const pricingTiers = [
    {
      name: "Gym Only Access",
      price: "$69",
      features: ["Access to gym equipment", "Open gym hours", "Locker room access"],
    },
    {
      name: "Group Fitness",
      price: "$99",
      features: ["All gym access", "Unlimited group fitness classes", "Community support"],
    },
    {
      name: "All Access",
      price: "$149",
      features: ["Full gym access", "All group fitness classes", "All martial arts programs", "Priority booking"],
      popular: true,
    },
    {
      name: "Family Plan",
      price: "$349",
      features: [
        "All Access benefits",
        "Up to 7 immediate family members",
        "Family training sessions",
        "Best value for families",
      ],
    },
    {
      name: "Service Member",
      price: "$99",
      features: [
        "Full access to all programs",
        "Military, First Responders, Teachers",
        "All martial arts & fitness classes",
        "Thank you for your service",
      ],
      special: true,
    },
  ]

  return (
    <>
      <section id="pricing-section" className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            ref={formRef}
            className={`max-w-2xl mx-auto transition-all duration-1000 ${
              formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-primary text-sm font-semibold tracking-wider uppercase mb-8">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Learn More
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                LEARN MORE
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ABOUT THE GYM
                </span>
              </h2>
              <p className="text-xl text-gray-300 text-balance leading-relaxed">
                Share your information with us, so we can share our pricing with you. Your fitness and martial arts
                journey is an investment - we want to make sure you make the right one.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10">
              <form onSubmit={handleScheduleTour} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="smsConsent"
                      checked={formData.smsConsent}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, smsConsent: checked as boolean }))
                      }
                      className="mt-1 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="smsConsent" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                      I agree to receive SMS messages from X-Zen Sports
                    </Label>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed pl-7">
                    I understand that I will receive 2 messages or more a month, data rates may apply. Text HELP to
                    864-351-6559 for assistance, reply STOP to opt out.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-12 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  See if we are the right fit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-sm text-gray-400 text-center">
                  By scheduling, you agree to our terms of service and privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showPricingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 md:p-8 max-w-6xl w-full mx-4 relative animate-in fade-in-0 zoom-in-95 duration-300 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={closePricingModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-8">
              <p className="text-primary font-semibold mb-4">A team member will reach out shortly</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Pricing</h3>
              <p className="text-gray-300 text-lg">Choose the plan that fits your goals</p>
              <p className="text-sm text-gray-400 mt-2 italic">Pricing shown for informational purposes only</p>
            </div>

            <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-6 mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Gift className="h-8 w-8 text-primary" />
                <h4 className="text-2xl font-bold text-white">Welcome Bonus</h4>
              </div>
              <p className="text-lg text-white mb-2">
                <span className="font-bold text-primary">$100 Signup Fee</span> includes your choice of:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-200">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">Free Pair of Boxing Gloves</span>
                </div>
                <span className="hidden sm:inline text-gray-400">or</span>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">Free Jiu-Jitsu Gi</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                    tier.popular
                      ? "border-primary shadow-lg shadow-primary/20"
                      : tier.special
                        ? "border-accent shadow-lg shadow-accent/20"
                        : "border-white/10"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  {tier.special && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                      SPECIAL OFFER
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                    <div className="text-4xl font-bold text-primary mb-1">{tier.price}</div>
                    <div className="text-sm text-gray-400">per month</div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={closePricingModal}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-semibold tracking-wide transition-all duration-300"
              >
                See Class Schedule
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
